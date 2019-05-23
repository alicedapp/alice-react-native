import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image, InteractionManager, Text, TouchableOpacity, View,
} from 'react-native';
import Piwik from 'react-native-matomo';
import {
  compose,
  onlyUpdateForKeys,
  withHandlers,
  withProps,
} from 'recompact';
import { withAccountSettings } from '../../hoc';
import {
  AssetPanel, AssetPanelAction, AssetPanelInput, AssetPanelHeader,
} from './asset-panel';
import FloatingPanels from './FloatingPanels';
import Input from '../inputs/Input';
import { contractInteraction } from '../../utils/transactions';
import WethABI from '../../AppABIs/wethAbi';

console.log(WethABI);


class TokenExpandedState extends Component {
  state = {
    amount: ''
  }

  sendTransaction = () => {
    contractInteraction('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', WethABI, 'deposit', this.state.amount);
    this.props.navigation.navigate('Profile');
  }

  render() {
    const {
      onPressSend,
      price,
      subtitle,
      title,
    } = this.props;
    return (
      <FloatingPanels>
        <AssetPanel>
          <AssetPanelHeader
            price={price}
            subtitle={subtitle}
            title={title}
          />
          <AssetPanelAction
            icon="send"
            label="Send to..."
            onPress={onPressSend}
          />
          { title === 'Ethereum' && <View style={{ flexDirection: 'column' }}>
            <AssetPanel>
              <AssetPanelInput
                placeholder="Enter Amount to Wrap"
                onChange={e => this.setState({amount: e})}
                value={this.state.amount}
                keyboardType={'numeric'}
              />
            </AssetPanel>
            <AssetPanelAction
              style={{ flex: 1 }}
              icon="send"
              label="Wrap"
              onPress={this.sendTransaction}
            />
          </View>
          }
          { title === 'Wrapped Ether' && <AssetPanelAction
            icon="send"
            label="Unwrap"
            onPress={onPressSend}
          /> }
          { title === '0x Protocol Token' && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.appIcon}>
              <TouchableOpacity style={styles.appSquare} onPress={() => this.props.navigation.navigate('RadarRelay')}>
                <Image source={require('../../../Assets/radar-black.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#1b1c22' }]} onPress={() => this.props.navigation.navigate('')}>
                <Image source={require('../../../Assets/dydx.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#0024ed' }]} onPress={() => this.props.navigation.navigate('')}>
                <Image source={require('../../../Assets/veil.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#181e2a' }]} onPress={() => this.props.navigation.navigate('')}>
                <Image source={require('../../../Assets/hummingbot.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
            </View>
          </View>

          }
        </AssetPanel>
      </FloatingPanels>
    );
  }
}


TokenExpandedState.propTypes = {
  onPressSend: PropTypes.func,
  price: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default compose(
  withAccountSettings,
  withProps(({
    asset: { name, symbol, ...asset },
    nativeCurrencySymbol,
  }) => ({
    price: get(asset, 'native.price.display', `${nativeCurrencySymbol}0.00`),
    subtitle: get(asset, 'balance.display', symbol),
    title: name,
  })),
  withHandlers({
    onPressSend: ({ navigation, asset: { symbol } }) => () => {
      navigation.goBack();

      InteractionManager.runAfterInteractions(() => {
        Piwik.trackEvent('Navigation', 'send-expanded', 'SendTokenExpandedNav');
        navigation.navigate('SendSheet', { asset: symbol });
      });
    },
  }),
  onlyUpdateForKeys(['price']),
)(TokenExpandedState);

const styles = {
  appIcon: {
    alignItems: 'center',
    height: 84,
    margin: 10,
    maxWidth: 84,
    justifyContent: 'space-between',
  },
  appSquare: {
    alignItems: 'center',
    backgroundColor: '#43fd9c',
    borderRadius: 32.5,
    height: 65,
    justifyContent: 'center',
    width: 65,
    shadowColor: '#7d7d7d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
};
