import { withAccountAssets } from 'balance-common';
import { get, isEmpty, map } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Animated,
  Clipboard, Dimensions,
  Image,
  InteractionManager,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import TouchID from 'react-native-touch-id';
import { compose, withHandlers } from 'recompact';
import styled from 'styled-components/primitives';
import ethers from 'ethers';
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

let { width, height } = Dimensions.get('window')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo_RR5oANpfvognyz-4AAwS5z-8BiaL4E",
  authDomain: "fork-1506600187773.firebaseapp.com",
  databaseURL: "https://fork-1506600187773.firebaseio.com",
  projectId: "fork-1506600187773",
  storageBucket: "fork-1506600187773.appspot.com",
  messagingSenderId: "1065429347396",
  appId: "1:1065429347396:web:f8860b64869a01ae"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

import { AssetList } from '../components/asset-list';
import { UniqueTokenRow } from '../components/unique-token';
import { Button, BlockButton, LongPressButton } from '../components/buttons';
import { SendCoinRow } from '../components/coin-row';
import { AddressField, UnderlineField } from '../components/fields';
import { Icon } from '../components/icons';
import { PillLabel } from '../components/labels';
import {
  Column,
  Flex,
  FlyInView,
  Row,
} from '../components/layout';
import { ShadowStack } from '../components/shadow-stack';
import { Monospace } from '../components/text';
import {
  withAccountRefresh,
  withAccountSettings,
} from '../hoc';
import {
  colors,
  fonts,
  padding,
  shadow,
} from '../styles';
import { deviceUtils, directionPropType } from '../utils';
import { showActionSheetWithOptions } from '../utils/actionsheet';
import { removeLeadingZeros, uppercase } from '../utils/formatters';
import { loadWallet } from '../model/wallet';

const DoubleArrowIconItem = ({ direction }) => (
  <Icon
    color={colors.dark}
    direction={direction}
    name="caret"
    size={5}
  />
);

DoubleArrowIconItem.propTypes = {
  direction: directionPropType,
};

const AddressInput = styled(AddressField)`
  padding-right: 20px;
`;

const AddressInputLabel = styled(Text)`
  color: ${colors.blueGreyDark};
  font-size: ${fonts.size.h5}
  font-family: ${fonts.family.SFProText};
  font-weight: ${fonts.weight.semibold};
  margin-right: 6px;
  opacity: 0.6;
`;

const AddressInputContainer = styled(Flex)`
  ${padding(20, 20)}
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

const AddressInputBottomBorder = styled(View)`
  background-color: ${colors.blueGreyLight};
  opacity: 0.05;
  width: 100%;
  height: 2px;
`;

const BackgroundImage = styled(Image)`
  height: 88px;
  width: 91px;
`;

const BackgroundImageContainer = styled(Row)`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const BottomButton = styled(Button).attrs({
  type: 'pill',
})`
  ${padding(0, 10)}
  background-color: ${colors.sendScreen.brightBlue};
  align-items: center;
  justify-content: center;
  height: 30px;
  margin-left: 10px;
`;

const BottomButtonContainer = styled(Flex)`
  ${padding(20, 20)}
  padding-top: 0px;
  justify-content: flex-end;
  width: 100%;
`;

const CameraIcon = styled(Icon).attrs({
  color: colors.white,
  height: 14,
  name: 'camera',
  width: 17,
})`
  margin-top: -5px;
`;

const Container = styled(Column)`
  background-color: ${colors.white};
  align-items: center;
  height: 100%;
`;

const EmptyStateContainer = styled(Column)`
  background-color: ${colors.white};
  padding-bottom: ${isIphoneX() ? '50px' : '20px'};
  justify-content: space-between;
  flex: 1;
`;

const HandleIcon = styled(Icon).attrs({
  color: colors.sendScreen.grey,
  name: 'handle',
})`
  margin-top: 16px;
`;

const NumberInput = styled(UnderlineField).attrs({
  keyboardType: 'decimal-pad',
})`
  margin-bottom: 10px;
  margin-right: 26px;
`;

const SendButton = styled(BlockButton).attrs({ component: LongPressButton })`
  ${padding(18, 0)}
`;

const TransactionContainer = styled(View)`
  ${padding(20, 20)}
  padding-bottom: 50px;
  flex-grow: 2;
  background-color: ${colors.white};
`;

class SendSheet extends Component {
  static propTypes = {
    allAssets: PropTypes.array,
    fetchData: PropTypes.func,
    isSufficientBalance: PropTypes.bool,
    isSufficientGas: PropTypes.bool,
    isValidAddress: PropTypes.bool,
    selected: PropTypes.object,
    sendClearFields: PropTypes.func,
    sendMaxBalance: PropTypes.func,
    sendUpdateAssetAmount: PropTypes.func,
    sendUpdateGasPrice: PropTypes.func,
    sendUpdateNativeAmount: PropTypes.func,
    sendUpdateRecipient: PropTypes.func,
    sendUpdateSelected: PropTypes.func,
  };

  static defaultProps = {
    fetchData() {},
    isSufficientBalance: false,
    isSufficientGas: false,
    isValidAddress: false,
    sendClearFields() {},
    sendMaxBalance() {},
    sendUpdateAssetAmount() {},
    sendUpdateGasPrice() {},
    sendUpdateNativeAmount() {},
    sendUpdateRecipient() {},
    sendUpdateSelected() {},
  };

  constructor(props) {
    super(props);

    this.state = {
      biometryType: null,
      sendLongPressProgress: new Animated.Value(0),
      assetAmount: 0,
    };
  }

  componentDidMount() {
    const { navigation, sendUpdateRecipient } = this.props;
    const address = get(navigation, 'state.params.address');
    // setTimeout(() => this.onChangeAssetAmount('0.044'), 500)
    // if (this.props.navigation.state.params.assetAmount !== this.props.assetAmount) {
    //   this.onChangeAssetAmount(this.props.navigation.state.params.assetAmount);
    // }

    if (address) {
      sendUpdateRecipient(address);
    }

    TouchID.isSupported()
      .then(biometryType => {
        this.setState({ biometryType });
      })
      .catch(() => {
        this.setState({ biometryType: 'FaceID' });
      });
  }

  componentDidUpdate(prevProps) {
    const {
      isValidAddress,
      navigation,
      selected,
      sendUpdateSelected,
    } = this.props;

    const asset = get(navigation, 'state.params.asset');

    if (isValidAddress && !prevProps.isValidAddress) {
      if (asset) {
        sendUpdateSelected(asset);
      }

      Keyboard.dismiss();
    }

    if (prevProps.isValidAddress !== isValidAddress
        || prevProps.selected !== selected) {
      let verticalGestureResponseDistance = 0;

      if (isValidAddress) {
        verticalGestureResponseDistance = isEmpty(selected) ? 150 : deviceUtils.dimensions.height;
      } else {
        verticalGestureResponseDistance = deviceUtils.dimensions.height;
      }

      navigation.setParams({ verticalGestureResponseDistance });
    }
  }

  componentWillUnmount() {
    this.props.sendClearFields();
    this.state.sendLongPressProgress.stopAnimation();
  }

  getTransactionSpeedOptions = () => {
    const { gasPrices } = this.props;

    const options = map(gasPrices, (value, key) => ({
      label: `${uppercase(key, 7)}: ${get(value, 'txFee.native.value.display')}  ~${get(value, 'estimatedTime.display')}`,
      value: key,
    }));

    options.unshift({ label: 'Cancel' });

    return options;
  };

  formatNativeInput = (value = '') => {
    const { nativeCurrency } = this.props;
    const nativeCurrencyDecimals = (nativeCurrency !== 'ETH') ? 2 : 18;
    const formattedValue = removeLeadingZeros(value);
    const parts = formattedValue.split('.');
    const decimals = parts[1] || '';

    if (decimals.length > nativeCurrencyDecimals) {
      return `${parts[0]}.${decimals.substring(0, nativeCurrencyDecimals)}`;
    }

    return formattedValue;
  };

  onChangeAddressInput = (value) => {
    const { sendUpdateRecipient } = this.props;

    sendUpdateRecipient(value);
  };

  onPressPaste = () => {
    const { sendUpdateRecipient } = this.props;

    Clipboard.getString()
      .then((string) => {
        sendUpdateRecipient(string);
      });
  };

  onChangeAssetAmount = (value) => {
    // this.setState({ assetAmount: value });
    const { sendUpdateAssetAmount } = this.props;
    sendUpdateAssetAmount(String(value));
  };

  onChangeNativeAmount = (value) => {
    const { sendUpdateNativeAmount } = this.props;

    sendUpdateNativeAmount(String(value));
  };

  onPressAssetHandler = (symbol) => {
    const { sendUpdateSelected } = this.props;

    return () => {
      sendUpdateSelected(symbol);
    };
  };

  onPressSend = () => {
    const { sendLongPressProgress } = this.state;

    Animated.timing(sendLongPressProgress, {
      duration: 800,
      toValue: 100,
    }).start();
  };

  onReleaseSend = () => {
    const { sendLongPressProgress } = this.state;

    Animated.timing(sendLongPressProgress, {
      duration: (sendLongPressProgress._value / 100) * 800,
      toValue: 0,
    }).start();
  };

  onLongPressSend = () => {
    const { sendUpdateGasPrice } = this.props;
    const { sendLongPressProgress } = this.state;

    Animated.timing(sendLongPressProgress, {
      duration: (sendLongPressProgress._value / 100) * 800,
      toValue: 0,
    }).start();

    if (isIphoneX()) {
      this.sendTransaction();
    } else {
      const options = this.getTransactionSpeedOptions();

      showActionSheetWithOptions({
        cancelButtonIndex: 0,
        options: options.map(option => option.label),
      }, (buttonIndex) => {
        if (buttonIndex > 0) {
          sendUpdateGasPrice(options[buttonIndex].value);

          this.sendTransaction();
        }
      });
    }
  };

  sendOrder = () => {
    Keyboard.dismiss();
    const orderNo = `order${Math.floor((Math.random() * 99999999999) + 1)}`;
    db.collection('food-orders').doc(orderNo.toString()).set({
      name: 'Mark',
      food: 'Hamburger',
    })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  contractInteraction = async () => {
    const {
      navigation,
    } = this.props;

    console.log('ethers provider: ', ethers.providers.getDefaultProvider());
    // Connect to the network
    const provider = ethers.providers.getDefaultProvider();

    const ContractAddress = '0x89FFF8C75AE3f84B107e1C704c3147a8414Dd417';

    const abi = [
      {
        constant: false,
        inputs: [],
        name: 'cookingOrder',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [],
        name: 'finishOrder',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_foodItem',
            type: 'string',
          },
          {
            name: '_name',
            type: 'string',
          },
        ],
        name: 'setOrder',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_orderStatus',
            type: 'string',
          },
        ],
        name: 'setOrderStatus',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'foodItem',
            type: 'string',
          },
          {
            indexed: false,
            name: 'name',
            type: 'string',
          },
        ],
        name: 'FoodFinished',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'foodItem',
            type: 'string',
          },
          {
            indexed: false,
            name: 'name',
            type: 'string',
          },
        ],
        name: 'OrderReceived',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'orderStatus',
            type: 'string',
          },
        ],
        name: 'OrderStatus',
        type: 'event',
      },
      {
        constant: true,
        inputs: [],
        name: 'getOrder',
        outputs: [
          {
            name: '',
            type: 'string',
          },
          {
            name: '',
            type: 'string',
          },
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ];


    const contract = new ethers.Contract(ContractAddress, abi, provider);
    console.log(contract);

    const wallet = await loadWallet();

    const contractWithSigner = contract.connect(wallet);

    const tx = await contractWithSigner.finishOrder();

    console.log(tx.hash);
    if (tx.hash) {
      navigation.navigate('ProfileScreen');
      this.sendOrder();
    }

    const txConfirm = await tx.wait();
  }

  onLongPressSendContractInteraction = () => {
    const { sendUpdateGasPrice } = this.props;
    const { sendLongPressProgress } = this.state;

    Animated.timing(sendLongPressProgress, {
      duration: (sendLongPressProgress._value / 100) * 800,
      toValue: 0,
    }).start();

    if (isIphoneX()) {
      this.contractInteraction();
    } else {
      const options = this.getTransactionSpeedOptions();

      showActionSheetWithOptions({
        cancelButtonIndex: 0,
        options: options.map(option => option.label),
      }, (buttonIndex) => {
        if (buttonIndex > 0) {
          sendUpdateGasPrice(options[buttonIndex].value);

          this.contractInteraction();
        }
      });
    }
  };

  onPressTransactionSpeed = () => {
    const { sendUpdateGasPrice } = this.props;

    const options = this.getTransactionSpeedOptions();

    showActionSheetWithOptions({
      cancelButtonIndex: 0,
      options: options.map(option => option.label),
    }, (buttonIndex) => {
      if (buttonIndex > 0) {
        sendUpdateGasPrice(options[buttonIndex].value);
      }
    });
  };

  onBackQRScanner = () => {
    InteractionManager.runAfterInteractions(() => {
      this.addressInput.focus();
    });
  };

  onPressCamera = () => {
    const { navigation } = this.props;

    Keyboard.dismiss();

    InteractionManager.runAfterInteractions(() => {
      navigation.navigate('SendQRScannerScreen', {
        onBack: this.onBackQRScanner,
        onSuccess: this.onChangeAddressInput,
      });
    });
  };

  sendTransaction = () => {
    const {
      assetAmount,
      navigation,
      onSubmit,
      sendClearFields,
    } = this.props;

    if (Number(assetAmount) > 0) {
      onSubmit()
        .then(() => {
          sendClearFields();
          navigation.navigate('ProfileScreen');
        });
    }
  };

  renderAssetList() {
    const { allAssets, fetchData, uniqueTokens } = this.props;

    const sections = {
      balances: {
        data: allAssets,
        renderItem: (itemProps) => (
          <SendCoinRow
            {...itemProps}
            onPress={this.onPressAssetHandler(itemProps.item.symbol)}
          />
        ),
      },
      collectibles: {
        data: uniqueTokens,
        renderItem: UniqueTokenRow,
      },
    };

    return (
      <FlyInView style={{ flex: 1 }}>
        <AssetList
          fetchData={fetchData}
          hideHeader
          sections={[sections.balances]}
        />
      </FlyInView>
    );
  }

  renderDapplet() {
    return (
      <View>
        {this.props.navigation.state.params.dappletData.component()}
      </View>
    );
  }

  renderEmptyState() {
    return (
      <EmptyStateContainer>
        <BackgroundImageContainer>
          <BackgroundImage source={require('../assets/send-background.png')} />
        </BackgroundImageContainer>
        <BottomButtonContainer>
          <BottomButton onPress={this.onPressPaste}>Paste</BottomButton>
          <BottomButton onPress={this.onPressCamera}><CameraIcon /></BottomButton>
        </BottomButtonContainer>
      </EmptyStateContainer>
    );
  }

  renderSendButton() {
    const { assetAmount, isSufficientBalance, isSufficientGas } = this.props;
    const { biometryType, sendLongPressProgress } = this.state;

    const isZeroAssetAmount = Number(assetAmount) <= 0;
    const leftIconName = biometryType === 'FaceID' ? 'faceid' : 'touchid';

    let disabled = true;
    let label = 'Enter an Amount';

    if (!isZeroAssetAmount && !isSufficientGas) {
      disabled = true;
      label = 'Insufficient Gas';
    } else if (!isZeroAssetAmount && !isSufficientBalance) {
      disabled = true;
      label = 'Insufficient Funds';
    } else if (!isZeroAssetAmount) {
      disabled = false;
      label = 'Hold to Send';
    }

    return (
      <SendButton
        disabled={disabled}
        leftIconName={disabled ? null : leftIconName}
        onLongPress={this.onLongPressSend}
        onPress={this.onPressSend}
        onRelease={this.onReleaseSend}
        rightIconName={disabled ? null : 'progress'}
        rightIconProps={{
          color: colors.alpha(colors.sendScreen.grey, 0.3),
          progress: sendLongPressProgress,
          progressColor: colors.white,
        }}
      >
        {label}
      </SendButton>
    );
  }

  renderContractSendButton() {
    const { assetAmount, isSufficientBalance, isSufficientGas } = this.props;
    const { biometryType, sendLongPressProgress } = this.state;

    const isZeroAssetAmount = Number(assetAmount) <= 0;
    const leftIconName = biometryType === 'FaceID' ? 'faceid' : 'touchid';

    // let disabled = true;
    // let label = 'Enter an Amount';

    let disabled = false;
    let label = 'Hold to Purchase';

    if (!isZeroAssetAmount && !isSufficientGas) {
      disabled = true;
      label = 'Insufficient Gas';
    } else if (!isZeroAssetAmount && !isSufficientBalance) {
      disabled = true;
      label = 'Insufficient Funds';
    } else if (!isZeroAssetAmount) {
      disabled = false;
      label = 'Hold to Send';
    }

    return (
      <Column flex={1} >
        <TransactionContainer>
          <SendButton
            disabled={disabled}
            leftIconName={disabled ? null : leftIconName}
            onLongPress={this.onLongPressSendContractInteraction}
            onPress={this.onPressSend}
            onRelease={this.onReleaseSend}
            rightIconName={disabled ? null : 'progress'}
            rightIconProps={{
              color: colors.alpha(colors.sendScreen.grey, 0.3),
              progress: sendLongPressProgress,
              progressColor: colors.white,
            }}
          >
            {label}
          </SendButton>
          {isIphoneX() ? this.renderTransactionSpeed() : null}
        </TransactionContainer>
      </Column>

    );
  }


  renderTransactionSpeed() {
    const { gasPrice, nativeCurrencySymbol } = this.props;

    const fee = get(gasPrice, 'txFee.native.value.display', `${nativeCurrencySymbol}0.00`);
    const time = get(gasPrice, 'estimatedTime.display', '');

    return (
      <Row justify="space-between">
        <PillLabel>Fee: {fee}</PillLabel>
        <PillLabel
          color={colors.blueGreyDark}
          icon="clock"
          onPress={this.onPressTransactionSpeed}
        >
          Arrives in ~ {time}
        </PillLabel>
      </Row>
    );
  }

  renderTransaction() {
    const {
      allAssets,
      assetAmount,
      nativeAmount,
      nativeCurrency,
      selected,
      sendMaxBalance,
    } = this.props;
    const selectedAsset = allAssets.find(asset => asset.symbol === selected.symbol);

    const symbolMaxLength = 6;
    const selectedAssetSymbol = (selected.symbol.length > symbolMaxLength)
      ? selected.symbol.substring(0, symbolMaxLength)
      : selected.symbol;

    return (
      <Column flex={1} >
        <ShadowStack
          borderRadius={0}
          height={64}
          shadows={[
            [0, 4, 6, colors.purple, 0.12],
            [0, 6, 4, colors.purple, 0.24],
          ]}
          shouldRasterizeIOS={true}
          width={deviceUtils.dimensions.width}
        >
          <SendCoinRow
            item={selectedAsset}
            onPress={this.onPressAssetHandler('')}
            paddingRight={24}
          >
            <Column>
              <DoubleArrowIconItem direction="up" />
              <DoubleArrowIconItem direction="down" />
            </Column>
          </SendCoinRow>
        </ShadowStack>
        <TransactionContainer>
          <Column>
            <Row justify="space-between">
              <NumberInput
                autoFocus
                buttonText="Max"
                format={removeLeadingZeros}
                onChange={this.onChangeAssetAmount}
                onPressButton={sendMaxBalance}
                placeholder="0"
                value={this.props.assetAmount}
              />
              <Monospace color="blueGreyDark" size="h2">
                {selectedAssetSymbol}
              </Monospace>
            </Row>
            <Row justify="space-between">
              <NumberInput
                buttonText="Max"
                format={this.formatNativeInput}
                onChange={this.onChangeNativeAmount}
                onPressButton={sendMaxBalance}
                placeholder="0.00"
                value={nativeAmount}
              />
              <Monospace color="blueGreyDark" size="h2">
                {nativeCurrency}
              </Monospace>
            </Row>
          </Column>
          {this.renderSendButton()}
          {isIphoneX() ? this.renderTransactionSpeed() : null}
        </TransactionContainer>
      </Column>
    );
  }

  render() {
    const { isValidAddress, recipient, selected } = this.props;
    console.log('PROPS: ', this.props);
    const { dappletData, isContract } = this.props.navigation.state.params || false;

    return (
      <KeyboardAvoidingView behavior="padding">
        <Container>
          <HandleIcon />
          <AddressInputContainer>
            <AddressInputLabel>To:</AddressInputLabel>
            <AddressInput
              autoFocus
              isValid={isValidAddress}
              onChange={this.onChangeAddressInput}
              placeholder="Ethereum Address: (0x...)"
              value={recipient}
              inputRef={(addressInput) => { this.addressInput = addressInput; }}
            />
          </AddressInputContainer>
          <AddressInputBottomBorder />
          {dappletData && this.renderDapplet()}
          {!isValidAddress ? this.renderEmptyState() : null}
          {isContract && this.renderContractSendButton()}
          {isValidAddress && !isContract && isEmpty(selected) ? this.renderAssetList() : null}
          {isValidAddress && !isContract && !isEmpty(selected) ? this.renderTransaction() : null}
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

export default compose(
  withAccountAssets,
  withAccountSettings,
  withAccountRefresh,
  withHandlers({
    fetchData: ({ refreshAccount }) => async () => {
      await refreshAccount();
    },
  }),
)(SendSheet);

const styles = StyleSheet.create({
  kittyContainer: {
    margin: 10,
    maxWidth: 150,
    backgroundColor: 'white',
    shadowColor: '#cecece',
  },
});
