import React from 'react';
import {
  Image, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions, View,
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import MapView, { Callout } from 'react-native-maps';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import App from './App';


import sheet from './styles/sheet';
import { onSortOptions } from './utils';

import BaseExamplePropTypes from './components/common/BaseExamplePropTypes';
import TabBarPage from './components/common/TabBarPage';

const { height, width } = Dimensions.get('window');

class HomeScreen extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    this._mapOptions = Object.keys(MapboxGL.StyleURL)
      .map(key => ({
        label: key,
        data: MapboxGL.StyleURL[key],
      }))
      .sort(onSortOptions);

    this.state = {
      styleURL: this._mapOptions[0].data,
    };

    this.onMapChange = this.onMapChange.bind(this);
  }

  onMapChange(index, styleURL) {
    this.setState({ styleURL });
  }

  render() {
    const {navigation} = this.props;
    return (
      <MapboxGL.MapView
        showUserLocation={true}
        zoomLevel={12}
        userTrackingMode={MapboxGL.UserTrackingModes.Follow}
        styleURL={this.state.styleURL}
        style={sheet.matchParent}
      >
        <View style={{flex: 1 }}>
          <View style={{
            margin: 20, marginTop: 50, marginBottom: 0, backgroundColor: 'transparent',
          }}>
            <TouchableOpacity style={{}} onPress={() => navigation.navigate('Apps')}>
              <Image source={require('../../../Assets/back-button.png')} style={{ resizeMode: 'contain', width: 20, height: 20 }}/>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={styles.blackHeaderModule}>
              <Text style={{color: 'white'}}>Main Ethereum Network</Text>
            </View>
            <View style={styles.blackHeaderModule}>
              <Text style={{color: 'white'}}>100.00</Text>
              <View>
                <Text style={{color: 'white', fontSize: 10}}>FOAM</Text>
              </View>
            </View>
          </View>
          <TextInput placeholder={'Search'} placeholderTextColor='#636363' style={styles.whiteSearch}/>
          <View style={styles.whiteBox}>
            <View style={{}}>
              <Text style={{fontSize: 20, color: 'black'}}>Add a POI or Signal for Location Services</Text>
              <Text style={{fontSize: 14}}>Click anywhere on the map to start.</Text>
            </View>
            <View style={{}}>
              <TouchableOpacity onPress={() => this.toggleBox(1)}>
                <Text style={{fontSize: 20}}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </MapboxGL.MapView>
    );
  }
}


class SettingsScreen extends React.Component {
  render() {
    return (
      <App/>
    );
  }
}

export default createBottomTabNavigator({
  Home: HomeScreen,
  Trade: SettingsScreen,
});

const styles = StyleSheet.create({
  blackHeaderModule: {
    flexDirection: 'row',
    padding: 10,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#636363',
    backgroundColor: '#212121',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
  },
  whiteSearch: {
    margin: 25,
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#636363',
    backgroundColor: 'white',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
  },
  whiteBox: {
    margin: 25,
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#636363',
    backgroundColor: 'white',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
  },
});
