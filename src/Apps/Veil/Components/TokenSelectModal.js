import Modal from 'react-native-modal';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  View,
} from 'react-native';

let { height, width } = Dimensions.get('window');


export default class OrderModal extends React.Component {


  componentDidMount() {
    this.getMarkets();
  }

  setNewMarket = (market) => {
    if (typeof market === 'string') {
      const tokens = market.split('-');
      this.props.setTokens(tokens[0], tokens[1]);
      this.props.modalControl();
    }
  }

  getMarkets = async () => {
    const data = null;

    const xhr = new XMLHttpRequest();

    const onData = (data) => this.setState({ markets: data });

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        onData(JSON.parse(this.responseText));
        console.log('ORDERS: ', JSON.parse(this.responseText));
      }
    });
    xhr.open('GET', 'https://api.radarrelay.com/v2/markets');

    xhr.send(data);
  };

  state = {
    market: true,
    limit: false,
    buy: true,
    sell: false,
    buyToken: 'ZRX',
    sellToken: 'WETH',
    topPrice: 0.004155,
    bottomPrice: 0.004023,
    buyTokenBalance: 0.0237523,
    sellTokenBalance: 0.9723792,
    spreadNumber: 0.0223982398,
    usdPrice: 100,
    expires: '1',
    markets: []
  };


  render() {
    return (
      <Modal isVisible={this.props.isOpen} style={{width: width - 40, height: height - 100}} onBackdropPress={this.props.modalControl}>
        <View style={{ padding: 5, backgroundColor: '#DADADA'}}>
          <View style={{backgroundColor: 'white', padding: 10, marginBottom: 2, height: 60}}>
            <TextInput placeholder={'Search...'} style={{flex: 8, fontFamily: 'Menlo-Regular', fontSize: 20, padding: 2,}}/>
          </View>
          <ScrollView contentContainerStyle={{height: height - 300}}>
            {this.state.markets.map((market, count) => {
              return (
                <TouchableOpacity key={count} onPress={() => this.setNewMarket(market.id)}>
                  <View style={{backgroundColor: 'white', padding: 5, marginBottom: 2 }}>
                    <View style={{alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'row', padding: 5}}>
                      <Text style={{ color: 'black', fontFamily: 'Menlo-Regular', fontSize: 17, margin: 5 }}>{market.displayName}</Text>
                      <View>
                        <Image source={require('../Assets/star-empty.png')} style={{
                          resizeMode: 'contain', width: 20, height: 20, marginRight: 5,
                        }}/>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F0',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#DADADA',
    height: 50,
    padding: 5
  },
  kittyContainer: {
    margin: 10,
    maxWidth: 150,
    backgroundColor: 'white',
    shadowColor: '#cecece',
  },
});
