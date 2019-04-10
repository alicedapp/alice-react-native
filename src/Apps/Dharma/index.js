import {createBottomTabNavigator} from "react-navigation";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

class HomeScreen2 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(248, 249, 252)', }}>
        <View style={{backgroundColor: 'white'}}>
          <View style={{backgroundColor: '#f6b556'}}>
            <Text>Borrow</Text>
          </View>
          <Text>Select an asset to borrow</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.shadowContainer}>
              <Image/>
              <Text>ETH</Text>
            </View>
            <View style={styles.shadowContainer}>
              <Image/>
              <Text>DAI</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text>Interest Rate</Text>
              <Text>0.10% APR</Text>
            </View>
            <View>
              <Text>Term</Text>
              <Text>90 Days</Text>
            </View>
            <View>
              <Text>Borrow Limit</Text>
              <Text>750 ETH</Text>
            </View>
          </View>
          <Text>You are requesting to borrow {'ETH'} by collateralizing your loan with {'DAI'}</Text>
          <TouchableOpacity>
            <Text>Start Borrowing</Text>
          </TouchableOpacity>
        </View>
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
  Borrow: HomeScreen2,
  Lend: SettingsScreen2,
});

const styles = StyleSheet.create({
  shadowContainer: {
    padding: 20,
    margin: 20,
    backgroundColor: 'white',
    shadowColor: '#cecece',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
  },
})
