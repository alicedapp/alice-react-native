import {
  accountLoadState,
  commonStorage,
  settingsInitializeState,
  settingsUpdateAccountAddress,
} from 'balance-common';
import { get, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Piwik from 'react-native-matomo';
import { AlertIOS, AppRegistry, AppState } from 'react-native';
import { StackActions } from 'react-navigation';
import CodePush from 'react-native-code-push';
import firebase from 'react-native-firebase';
import { useScreens } from 'react-native-screens';
import OneSignal from 'react-native-onesignal';
import { connect, Provider } from 'react-redux';
import { compose, withProps } from 'recompact';
import { FlexItem } from './components/layout';
import OfflineBadge from './components/OfflineBadge';
import {
  withAccountRefresh,
  withHideSplashScreen,
  withTrackingDate,
  withWalletConnectConnections,
} from './hoc';
import {
  addTransactionToApprove,
  addTransactionsToApprove,
  transactionIfExists,
  transactionsToApproveInit,
} from './redux/transactionsToApprove';
import {
  walletConnectInitAllConnectors,
  walletConnectGetAllRequests,
  walletConnectGetRequest,
} from './model/walletconnect';
import store from './redux/store';
import { walletInit } from './model/wallet';
import Routes from './screens/Routes';
import Navigation from './navigation';

if (process.env.NODE_ENV === 'development') {
  console.log('process', process);
  console.disableYellowBox = true;
}

useScreens();

class App extends Component {
  constructor(properties) {
    super(properties);
    OneSignal.init("30676d11-1498-4613-8972-962af6c68fd5");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  static propTypes = {
    accountLoadState: PropTypes.func,
    addTransactionsToApprove: PropTypes.func,
    addTransactionToApprove: PropTypes.func,
    getValidWalletConnectors: PropTypes.func,
    onHideSplashScreen: PropTypes.func,
    refreshAccount: PropTypes.func,
    settingsInitializeState: PropTypes.func,
    settingsUpdateAccountAddress: PropTypes.func,
    setWalletConnectors: PropTypes.func,
    sortedWalletConnectors: PropTypes.arrayOf(PropTypes.object),
    trackingDateInit: PropTypes.func,
    transactionIfExists: PropTypes.func,
    transactionsToApproveInit: PropTypes.func,
  }

  state = { appState: AppState.currentState }

  navigatorRef = null

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  async componentDidMount() {
    await this.handleWalletConfig();
    this.props.onHideSplashScreen();
    await this.props.refreshAccount();
    Piwik.initTracker('https://matomo.balance.io/piwik.php', 2);
    AppState.addEventListener('change', this.handleAppStateChange);

  }

  handleWalletConfig = async (seedPhrase) => {
    try {
      this.props.trackingDateInit();
      const { isWalletBrandNew, walletAddress } = await walletInit(seedPhrase);
      this.props.settingsUpdateAccountAddress(walletAddress, 'BALANCEWALLET');
      if (isWalletBrandNew) {
        return walletAddress;
      }
      this.props.settingsInitializeState();
      this.props.accountLoadState();
      this.props.transactionsToApproveInit();
      try {
        const allConnectors = await walletConnectInitAllConnectors();
        if (allConnectors) {
          this.props.setWalletConnectors(allConnectors);
        }
      } catch (error) {
        console.log('Unable to init all WalletConnect sessions');
      }
      const notificationOpen = await firebase.notifications().getInitialNotification();
      if (!notificationOpen) {
        this.fetchAllRequestsFromWalletConnectSessions();
      }
      return walletAddress;
    } catch (error) {
      AlertIOS.alert('Error: Failed to initialize wallet.');
      return null;
    }
  };

  handleAppStateChange = async (nextAppState) => {
    if (this.state.appState.match(/unknown|background/) && nextAppState === 'active') {
      Piwik.trackEvent('screen', 'view', 'app');
      this.fetchAllRequestsFromWalletConnectSessions();
    }
    this.setState({ appState: nextAppState });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);

  }

  handleNavigatorRef = (navigatorRef) => { this.navigatorRef = navigatorRef; }

  handleOpenConfirmTransactionModal = (transactionDetails, autoOpened) => {
    if (!this.navigatorRef) return;
    const action = StackActions.push({
      params: { autoOpened, transactionDetails },
      routeName: 'ConfirmRequest',
    });
    Navigation.handleAction(this.navigatorRef, action);
  }

  fetchAllRequestsFromWalletConnectSessions = async () => {
    try {
      const allConnectors = this.props.getValidWalletConnectors();
      if (!isEmpty(allConnectors)) {
        const allRequests = await walletConnectGetAllRequests(allConnectors);
        if (!isEmpty(allRequests)) {
          this.props.addTransactionsToApprove(allRequests);
          await firebase.notifications().removeAllDeliveredNotifications();
        }
      }
    } catch (error) {
      console.log('error fetching all requests from wallet connect', error);
    }
  }

  onPushNotificationOpened = async (callId, sessionId, autoOpened) => {
    const existingTransaction = this.props.transactionIfExists(callId);
    if (existingTransaction) {
      this.handleOpenConfirmTransactionModal(existingTransaction, autoOpened);
    } else {
      const transaction = await this.fetchAndAddWalletConnectRequest(callId, sessionId);
      if (transaction) {
        this.handleOpenConfirmTransactionModal(transaction, autoOpened);
      } else {
        AlertIOS.alert('This request has expired.');
      }
    }
  }

  fetchAndAddWalletConnectRequest = async (callId, sessionId) => {
    try {
      const walletConnector = this.props.sortedWalletConnectors.find(({ _sessionId }) => (_sessionId === sessionId));
      const callData = await walletConnectGetRequest(callId, walletConnector);
      if (!callData) return null;

      const { dappName } = walletConnector;
      return this.props.addTransactionToApprove(sessionId, callId, callData, dappName);
    } catch (error) {
      console.log('error fetching wallet connect request');
      return null;
    }
  }

  render = () => (
    <Provider store={store}>
      <FlexItem>
        <OfflineBadge />
        <Routes
          ref={this.handleNavigatorRef}
          screenProps={{ handleWalletConfig: this.handleWalletConfig }}
        />
      </FlexItem>
    </Provider>
  )
}

const AppWithRedux = compose(
  withProps({ store }),
  withAccountRefresh,
  withHideSplashScreen,
  withTrackingDate,
  withWalletConnectConnections,
  connect(
    null,
    {
      accountLoadState,
      addTransactionsToApprove,
      addTransactionToApprove,
      settingsInitializeState,
      settingsUpdateAccountAddress,
      transactionIfExists,
      transactionsToApproveInit,
    },
  ),
)(App);

const AppWithCodePush = CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.ON_NEXT_RESUME,
})(AppWithRedux);

AppRegistry.registerComponent('BalanceWallet', () => AppWithCodePush);
