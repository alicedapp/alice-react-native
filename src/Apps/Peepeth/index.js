import React from "react";
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import {createBottomTabNavigator} from "react-navigation";

class HomeScreen extends React.Component {
  componentDidMount() {
    this.getPeeps();
  }
  state = {
    peeps: null
  };
  getPeeps = async () => {
    const peeps = await fetch('https://peepeth.com/get_peeps?oldest=0');
    console.log('PEEPS: ', peeps._bodyText);
    console.log('PEEPSinit: ', peeps._bodyInit);
    this.setState({peeps: JSON.parse(peeps._bodyText)});
  }
  render() {
    if (this.state.peeps === null) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white'
        }}>
          <Image source={require('../../../Assets/peepeth.png')} style={{
            width: 80,
            height: 80,
            resizeMode: 'contain'
          }}/>
        </View>
      );
    } else {
      return (
        <ScrollView style={{
          flex: 1,
        }}>
          {this.state.peeps.map((peep, i) => {
            return (
              <View key={i} style={styles.peepContainer}>
                <Text>{peep.content}</Text>
              </View>
            )
          })}
        </ScrollView>
      );
    }
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
  Profile: SettingsScreen,
});

const styles = StyleSheet.create({
  peepContainer: {
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
