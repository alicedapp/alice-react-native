import React from 'react';
import {
  Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import OrderModal from '../Components/OrderModal';
import TokenSelectModal from '../Components/TokenSelectModal';
import { loadAddress } from '../../../model/wallet';

export default class OrderBook extends React.Component {
  state = {
    orders: null,
    restaurants: ['japanese', 'american', 'mexican', 'italian', 'french'],
    buyToken: 'ZRX',
    sellToken: 'WETH',
    topPrice: 0.004155,
    bottomPrice: 0.004023,
    buyTokenBalance: 0.0237523,
    sellTokenBalance: 0.9723792,
    spreadNumber: 0.0223982398,
    orderModalOpen: false,
    tokenModalOpen: false,
    tokenInfo: {},
    asks: null,
    bids: []
  };

  componentDidMount() {
    this.getOrderBook();
    this.getBalances();
  }

  setTokens = (buyToken, sellToken) => {
    this.setState({buyToken, sellToken}, this.getOrderBook);
  };

  setBalances = () => {
    console.log('tokens: ',  this.state.tokenInfo.tokens)
    console.log('tokenInfo: ',  this.state.tokenInfo)
    this.setState({buyTokenBalance: this.state.tokenInfo.tokens.find(token => token.tokenInfo.symbol === this.state.buyToken).balance})
    this.setState({sellTokenBalance: this.state.tokenInfo.tokens.find(token => token.tokenInfo.symbol === this.state.sellToken).balance})
  }

  getBalances = async () => {
    const data = null;
    const pubKey = await loadAddress();

    const xhr = new XMLHttpRequest();

    const onData = (data) => this.setState({ tokenInfo: data }, this.setBalances);

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        console.log('TOKENS: ', JSON.parse(this.responseText));
        onData(JSON.parse(this.responseText));
        console.log('TOKENS: ', JSON.parse(this.responseText));
      }
    });

    xhr.open('GET', 'https://api.ethplorer.io/getAddressInfo/' + pubKey + '?apiKey=freekey');

    xhr.send(data);

  }

  getOrderBook = async () => {
    const data = null;

    const xhr = new XMLHttpRequest();

    const onData = (data) => this.setState({ asks: data.asks, bids: data.bids, marketData: data });

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        onData(JSON.parse(this.responseText));
        console.log('MARKET: ', JSON.parse(this.responseText));
      }
    });
    xhr.open('GET', 'https://api.radarrelay.com/v2/markets/'+this.state.buyToken.toLowerCase()+'-'+this.state.sellToken.toLowerCase()+'/book');

    xhr.send(data);
  };

  render() {
    const { navigation } = this.props;

    if (!this.state.asks) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#43fd9c',
        }}>
          <Image source={require('../Assets/radar-black.png')} style={{
            width: 80,
            height: 80,
            resizeMode: 'contain',
          }}/>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={{
            margin: 20, marginTop: 50, marginBottom: 0, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <TouchableOpacity style={{ width: 25, height: 25 }} onPress={() => navigation.navigate('Apps')}>
              <Image source={require('../../../../Assets/back-button.png')} style={{ resizeMode: 'contain', width: 20, height: 20 }}/>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: '#DADADA', padding: 4}} onPress={() => this.setState({tokenModalOpen: true})}>
              <Text style={{
                color: 'black', fontFamily: 'Menlo-Regular', fontSize: 15,
              }}>{this.state.buyToken}/{this.state.sellToken}</Text>
            </TouchableOpacity>
          </View>
          <View style={[{ padding: 10 }, styles.orderContainer]}>
            <Text style={{
              color: 'black', fontFamily: 'Menlo-Regular', fontSize: 15, marginTop: 2,
            }}>Price {this.state.buyToken}</Text>
            <Text style={{
              color: 'black', fontFamily: 'Menlo-Regular', fontSize: 15, marginTop: 2,
            }}>Amount {this.state.sellToken}</Text>
            <Text style={{
              color: 'black', fontFamily: 'Menlo-Regular', fontSize: 15, marginTop: 2,
            }}>Total USD</Text>
          </View>
          <ScrollView style={{
            flex: 1,
          }}>
            <View style={{
              flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', flex: 1, width: '100%', paddingLeft: 25, paddingRight: 25,
            }}>
              {this.state.asks.map((order, count) => {
                console.log('ORDER TYPE '+ count + ' : ', order.type);
                if (order.type === 'ASK') {
                  return (
                    <TouchableOpacity key={count} onPress={() => this.setState({orderModalOpen: true})} style={styles.kittyContainer}>
                      <View style={[{ borderColor: this.state.borderColor }, styles.orderContainer]}>
                        <Text style={{
                          color: 'black', fontFamily: 'Menlo-Regular', fontSize: 15, marginTop: 2,
                        }}>{parseFloat(order.remainingBaseTokenAmount).toFixed(4)}</Text>
                        <Text style={{
                          color: 'black', fontFamily: 'Menlo-Regular', fontSize: 15, marginTop: 2,
                        }}>{parseFloat(order.price).toFixed(4)}</Text>
                        <Text style={{ backgroundColor: 'rgba(245,137,18, 0.5)',
                          color: 'black', fontFamily: 'Menlo-Regular', fontSize: 15, marginTop: 2,
                        }}>{parseFloat(order.remainingQuoteTokenAmount).toFixed(2)}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
          </ScrollView>
          <View style={[ styles.orderContainer, { padding: 10, backgroundColor: '#DADADA' }]}>
            <Text style={{
              color: 'black', fontFamily: 'Menlo-Regular', fontSize: 15, marginTop: 2,
            }}>{this.state.spreadNumber}</Text>
            <Text style={{
              color: 'black', fontFamily: 'Menlo-Regular', fontSize: 15, marginTop: 2,
            }}>Spread {parseFloat(this.state.topPrice - this.state.bottomPrice).toFixed(4)}</Text>
          </View>
          <ScrollView style={{
            flex: 1,
          }}>
            <View style={{
              flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', flex: 1, width: '100%', paddingLeft: 25, paddingRight: 25,
            }}>
              {this.state.bids.map((order, count) => {
                if (order.type === 'BID') {
                  return (
                    <TouchableOpacity key={count} onPress={() => this.setState({orderModalOpen: true})} style={styles.kittyContainer}>
                      <View style={[{ borderColor: this.state.borderColor }, styles.orderContainer]}>
                        <Text style={{
                          color: 'black', fontFamily: 'Menlo-Regular', fontSize: 15, marginTop: 2,
                        }}>{parseFloat(order.remainingBaseTokenAmount).toFixed(4)}</Text>
                        <Text style={{
                          color: 'black', fontFamily: 'Menlo-Regular', fontSize: 15, marginTop: 2,
                        }}>{parseFloat(order.price).toFixed(4)}</Text>
                        <Text style={{ backgroundColor: 'rgba(38,217,134, 0.5)',
                          color: 'black', fontFamily: 'Menlo-Regular', fontSize: 15, marginTop: 2,
                        }}>{parseFloat(order.remainingQuoteTokenAmount).toFixed(2)}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
          </ScrollView>
          <View style={styles.bottomView}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: width-30}}>
              <Text style={{
                color: 'rgba(0,0,0, 0.5)', fontFamily: 'Menlo-Regular', fontSize: 15, marginTop: 2,
              }}>Your Balances</Text>
              <Text style={{
                color: 'rgba(0,0,0, 0.5)', fontFamily: 'Menlo-Regular', fontSize: 15, marginTop: 2,
              }}>Enabled</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: width-30}}>
              <Text style={{
                color: 'black', fontFamily: 'Menlo-Regular', fontSize: 15, marginTop: 2,
              }}>{parseFloat(this.state.sellTokenBalance/10e17).toFixed(5)} {this.state.sellToken}</Text>
              <View style={{width: 15, height: 15, backgroundColor: '#43fd9c'}}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: width-30}}>
              <Text style={{
                color: 'black', fontFamily: 'Menlo-Regular', fontSize: 15, marginTop: 2,
              }}>{parseFloat(this.state.buyTokenBalance/10e17).toFixed(5)} {this.state.buyToken}</Text>
              <View style={{width: 15, height: 15, backgroundColor: '#43fd9c'}}/>
            </View>
          </View>
          <OrderModal isOpen={this.state.orderModalOpen} modalControl={() => this.setState({orderModalOpen: !this.state.orderModalOpen})}/>
          {/*<TokenSelectModal isOpen={this.state.tokenModalOpen} modalControl={() => this.setState({tokenModalOpen: !this.state.tokenModalOpen})} setTokens={this.setTokens}/>*/}
        </View>
      );
    }
    }

}

const styles = StyleSheet.create({
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'white',
    padding: 2,
  },
  restaurantImage: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    marginRight: 10,
  },
  kittyContainer: {
    margin: 10,
    backgroundColor: 'white',
  },
  bottomView:{
    margin:10,
    padding: 5,
    backgroundColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0
  },
});
