import React from "react";
import { Image, Text, View } from 'react-native';
import {createBottomTabNavigator} from "react-navigation";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#43fd9c',
      }}>
        <Image source={require('../../../Assets/radar-black.png')} style={{
          width: 80,
          height: 80,
          resizeMode: 'contain',
        }}/>
      </View>

    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#43fd9c',
      }}>
        <Image source={require('../../../Assets/radar-black.png')} style={{
          width: 80,
          height: 80,
          resizeMode: 'contain',
        }}/>
      </View>
    );
  }
}

export default createBottomTabNavigator({
  Home: HomeScreen,
  Trade: SettingsScreen,
});
