import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import MapView, {Callout} from 'react-native-maps';
let {height, width} = Dimensions.get('window');
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import App from './App';


import sheet from './styles/sheet';
import {onSortOptions} from './utils';

import BaseExamplePropTypes from './components/common/BaseExamplePropTypes';
import TabBarPage from './components/common/TabBarPage';

class HomeScreen extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    this._mapOptions = Object.keys(MapboxGL.StyleURL)
      .map(key => {
        return {
          label: key,
          data: MapboxGL.StyleURL[key],
        };
      })
      .sort(onSortOptions);

    this.state = {
      styleURL: this._mapOptions[0].data,
    };

    this.onMapChange = this.onMapChange.bind(this);
  }

  onMapChange(index, styleURL) {
    this.setState({styleURL});
  }

  render() {
    return (
      <TabBarPage
        {...this.props}
        scrollable
        options={this._mapOptions}
        onOptionPress={this.onMapChange}
      >
        <MapboxGL.MapView
          showUserLocation={true}
          zoomLevel={12}
          userTrackingMode={MapboxGL.UserTrackingModes.Follow}
          styleURL={this.state.styleURL}
          style={sheet.matchParent}
        />
      </TabBarPage>
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
