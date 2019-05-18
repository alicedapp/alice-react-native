import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  View,
} from 'react-native';
import Icon from '../../components/IconComponent';
import Deals from './Screens/Deals';
import BuyAndSell from './Screens/BuyAndSell';
import TakeAway from './Screens/TakeAway';
import OrderBook from './Screens/OrderBook';
import CameraComponent from '../../screens/Camera';

let { height, width } = Dimensions.get('window');

// 'Din Mono', sans-serif;

const HomeScreen2 = createStackNavigator({
    Home: {
      screen: OrderBook,
    },
    Camera: {
      screen: CameraComponent
    }
  },
  {
    headerMode: 'none',
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon icon={require('./Assets/list-white.png')} size={25}/>,
    },
  });

export default createBottomTabNavigator({
    Home: HomeScreen2,
    BuyAndSell: BuyAndSell,
    Deals: Deals,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#262525',
        borderTopColor: 'transparent',
      },
      showLabel: false,
    }
  });

const styles = StyleSheet.create({
  inputContainer: {
    width: width - 60,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    shadowColor: '#2f80ed',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  kittyContainer: {
    margin: 10,
    maxWidth: 150,
    backgroundColor: 'white',

  },
});
