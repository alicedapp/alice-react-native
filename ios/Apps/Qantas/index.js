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
        backgroundColor: '#F20000',
      }}>
        <Image source={require('../../../Assets/qnatas-logo.png')} style={{
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Trading Coming Soon!</Text>
      </View>
    );
  }
}

export default createBottomTabNavigator({
  Home: HomeScreen,
  Trade: SettingsScreen,
},
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#F20000'
      }
      ,
      showLabel: false,
    }
  });
