import React from "react";
import {Text, View} from "react-native";
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from "react-navigation";
import AppScreen from "../App";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: AppScreen
  }
});

const TabNav1 = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
});


