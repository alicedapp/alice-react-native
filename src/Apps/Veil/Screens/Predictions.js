import React from 'react';
import {
  Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import OrderModal from '../Components/OrderModal';
import TokenSelectModal from '../Components/TokenSelectModal';
import { loadAddress } from '../../../model/wallet';

export default class Predictions extends React.Component {
  state = {
    predictions: null,
  };

  componentDidMount() {
    this.getMarket();
  }

  setTokens = (buyToken, sellToken) => {
    this.setState({buyToken, sellToken}, this.getOrderBook);
  };

  getMarket = async () => {
    const data = null;

    const xhr = new XMLHttpRequest();

    const onData = (data) => this.setState({ predictions: data.data }, console.log);

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        console.log('VEIL MARKET: ', JSON.parse(this.responseText));
        onData(JSON.parse(this.responseText));
      }
    });

    xhr.open('GET', 'https://api.kovan.veil.market/api/v1/markets');

    xhr.send(data);

  }

  render() {
    const { navigation } = this.props;

    if (!this.state.predictions) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
        }}>
          <Image source={require('../../../../Assets/veil.png')} style={{
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
          <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>

            <View style={{ borderColor: '#aaaaaa', borderWidth: 1, borderRadius: 25, alignItems: 'center', justifyContent: 'center', margin: 2, padding: 4 }}>
              <Text>All</Text>
            </View>
            <View style={{ borderColor: '#aaaaaa', borderWidth: 1, borderRadius: 25, alignItems: 'center', justifyContent: 'center', margin: 2, padding: 4 }}>
              <Text>User Created</Text>
            </View>
            <View style={{ borderColor: '#aaaaaa', borderWidth: 1, borderRadius: 25, alignItems: 'center', justifyContent: 'center', margin: 2, padding: 4 }}>
              <Text>Ethereum</Text>
            </View>
            <View style={{ borderColor: '#aaaaaa', borderWidth: 1, borderRadius: 25, alignItems: 'center', justifyContent: 'center', margin: 2, padding: 4 }}>
              <Text>Crypto</Text>
            </View>
          </View>
          <ScrollView style={{
            flex: 1,
          }}>
            <View style={{
              flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', flex: 1, width: '100%', paddingLeft: 25, paddingRight: 25,
            }}>
              {this.state.predictions.results.map((result, i) => {
                return(
                  <View key={i} style={styles.predictionContainer}>
                    <Text style={{fontSize: 20, fontWeight: '600'}}>{result.name}</Text>



                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                      <View style={{flexDirection: 'row', alignItems: 'center', flex: 4, flexWrap: 'wrap'}}>
                        <Text>Market expires <Text style={{fontWeight: '600'}}>in {result.ends_at}</Text></Text>
                      </View>
                      <View style={{flexDirection: 'row', alignItems: 'center', flex: 4, flexWrap: 'wrap'}}>
                        <Text>Market expires <Text style={{fontWeight: '600'}}>in {result.ends_at}</Text></Text>
                      </View>
                      <View style={{flexDirection: 'row', alignItems: 'center', flex: 4, flexWrap: 'wrap'}}>
                        <Text>Market expires <Text style={{fontWeight: '600'}}>in {result.ends_at}</Text></Text>
                      </View>
                    </View>
                  </View>
                )
              })}
            </View>
          </ScrollView>
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
  predictionContainer: {
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#cecece',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
  },
});
