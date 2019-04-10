import {createBottomTabNavigator} from "react-navigation";
import React from "react";
import {Text, View} from "react-native";

class HomeScreen2 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cryptokitties</Text>
      </View>
    );
  }
}

class SettingsScreen2 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Games Coming Soon!</Text>
      </View>
    );
  }
}

export default createBottomTabNavigator({
  Home: HomeScreen2,
  Play: SettingsScreen2,
});
