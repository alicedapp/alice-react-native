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
import Icon from '../../../components/IconComponent';


let { height, width } = Dimensions.get('window');

export default class OrderModal extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarIcon: ({ tintColor }) => <Icon icon={require('../Assets/bolt-white.png')} size={30}/>,
    };
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
    expires: '1'
  };


  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1}}>
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
        <View style={{ padding: 5, backgroundColor: '#DADADA'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <TouchableWithoutFeedback onPress={() => {this.setState({market: !this.state.market, limit: !this.state.limit}); console.log('STATE: ', this.state)}} >
              <View style={{marginTop: 5, marginLeft: 5, marginRight: 5,  padding: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.market ? 'white' : '#DADADA'}}>
                <Text style={{
                  color: 'black', fontFamily: 'Menlo-Regular', fontSize: 20,
                }}>MARKET</Text>

              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setState({market: !this.state.market, limit: !this.state.limit})} >
              <View style={{marginTop: 5, marginLeft: 5, marginRight: 5, width: 80, padding: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.limit ? 'white' : '#DADADA'}}>
                <Text style={{
                  color: 'black', fontFamily: 'Menlo-Regular', fontSize: 20,
                }}>LIMIT</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{backgroundColor: 'white', padding: 10, marginBottom: 2}}>
            <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', padding: 10}}>
              <TouchableWithoutFeedback onPress={() => this.setState({buy: !this.state.buy, sell: !this.state.sell})} style={{ padding: 20}}>
                <View>
                  <Text style={{
                    color: this.state.buy ? 'black' : 'grey', fontFamily: 'Menlo-Regular', fontSize: 20, margin: 5
                  }}>BUY</Text>
                  <View style={{height: 2, width: 60, backgroundColor: this.state.buy ? '#43fd9c' : 'grey'}}/>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.setState({buy: !this.state.buy, sell: !this.state.sell})} style={{ padding: 20}}>
                <View>
                  <Text style={{
                    color: this.state.sell ? 'black' : 'grey', fontFamily: 'Menlo-Regular', fontSize: 20, margin: 5
                  }}>SELL</Text>
                  <View style={{height: 2, width: 60, backgroundColor: this.state.sell ? '#FF9810' : 'grey'}}/>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View>
              <Text style={{ color: 'black', fontFamily: 'Menlo-Regular', fontSize: 20, margin: 5 }}>Amount {this.state.sellToken}</Text>
              <View style={styles.inputBox}>
                <TextInput placeholder={'0'} style={{flex: 8, fontFamily: 'Menlo-Regular', fontSize: 20, padding: 2, height: 60}}/>
                <TouchableOpacity style={{flex: 2, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F0F0F0', borderWidth: 2, borderRadius: 4, borderColor: '#DADADA'}}>
                  <Text style={{ color: 'black', fontFamily: 'Menlo-Regular', fontSize: 17, margin: 5 }}>MAX</Text>
                </TouchableOpacity>
              </View>
              <Text style={{
                color: 'black', fontFamily: 'Menlo-Regular', fontSize: 20, margin: 5
              }}>${this.state.sellTokenBalance*this.state.usdPrice} USD</Text>
            </View>
            {this.state.limit && <View>
              <View>
                <Text style={{ color: 'black', fontFamily: 'Menlo-Regular', fontSize: 20, margin: 5 }}>Price {this.state.buyToken}</Text>
                <View style={styles.inputBox}>
                  <TextInput placeholder={'0'} style={{flex: 8, fontFamily: 'Menlo-Regular', fontSize: 20, padding: 2, height: 60}}/>
                </View>
                <Text style={{
                  color: 'black', fontFamily: 'Menlo-Regular', fontSize: 20, margin: 5
                }}>${this.state.sellTokenBalance * this.state.usdPrice} USD</Text>
              </View>
              <View>
                <Text style={{ color: 'black', fontFamily: 'Menlo-Regular', fontSize: 20, margin: 5 }}>Expires</Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={[{flex: 3, marginRight: 3}, styles.inputBox]}>
                    <TextInput value={this.state.expires} style={{flex: 8, fontFamily: 'Menlo-Regular', fontSize: 20, padding: 2, height: 60}}/>
                  </View>
                  <View style={[{flex: 7}, styles.inputBox]}>
                    <TextInput placeholder={'days'} style={{flex: 8, fontFamily: 'Menlo-Regular', fontSize: 20, padding: 2, height: 60}}/>
                    <TouchableOpacity style={{flex: 2, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F0F0F0', borderWidth: 2, borderRadius: 4, borderColor: '#DADADA'}}>
                      <Text style={{ color: 'black', fontFamily: 'Menlo-Regular', fontSize: 17, margin: 5 }}>V</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>}
          </View>
          <View style={{backgroundColor: 'white', padding: 10, marginBottom: 2}}>
            <View style={{alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'row', padding: 10}}>
              <Text style={{ color: 'black', fontFamily: 'Menlo-Regular', fontSize: 17, margin: 5 }}>Total</Text>
              <View>
                <Text style={{ color: 'black', fontFamily: 'Menlo-Regular', fontSize: 17, margin: 5 }}>{0} {this.state.buyToken}</Text>
                <Text style={{ color: '#DADADA', fontFamily: 'Menlo-Regular', fontSize: 17, margin: 5 }}>${0} USD</Text>
              </View>
            </View>
            {
              this.state.limit && <TouchableOpacity style={{backgroundColor: this.state.buy ? '#43fd9c' : '#FF9810', borderRadius: 2, height:  60, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ color: 'black', fontFamily: 'Menlo-Regular', fontSize: 17, margin: 5 }}>PLACE {this.state.buy ? 'BUY' : 'SELL'} ORDER</Text>
              </TouchableOpacity>
            }
            {
              this.state.market && <TouchableOpacity style={{backgroundColor: this.state.buy ? '#43fd9c' : '#FF9810', borderRadius: 2, height:  60, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ color: 'black', fontFamily: 'Menlo-Regular', fontSize: 17, margin: 5 }}>{this.state.buy ? 'BUY' : 'SELL'} {this.state.buyToken}</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
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
