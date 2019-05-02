import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator} from "react-navigation";
let { height, width } = Dimensions.get('window');

class HomeScreen extends React.Component {
  componentDidMount() {
    this.getLand()
  }

  state = {
    land: false
  }

  getLand = async () => {
    var data = null;

    var xhr = new XMLHttpRequest();

    const onData = (land) => this.setState({land});
    xhr.addEventListener("readystatechange",  function()  {
      if (this.readyState === this.DONE) {
        onData(JSON.parse(this.responseText));
        console.log(JSON.parse(this.responseText));
      }
    });

    xhr.open("GET", 'https://api.decentraland.org/v1/parcels');

    xhr.send(data);
  }

  render() {
    console.log('LAND: ', this.state.land)
    if (this.state.land === false) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
          <Image source={require('../../../Assets/decentraland.png')} style={{
            width: 80,
            height: 80,
            resizeMode: 'contain',
          }}/>
        </View>
      );
    }
    return (
      <ScrollView style={{ width, flex: 1 }}>
        {this.state.land.data.parcels.map((result, i) => {
          return(
            <View style={styles.bountyContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Image source={{uri: `https://api.decentraland.org/v1/estates/${i+1}/map.png?height=500&width=500&size=10&publications=true`}} style={{
                  width: 200,
                  height: 200,
                  resizeMode: 'contain',
                }}/>
              </View>
            </View>
          )
        })}
      </ScrollView>

    )
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
  Land: HomeScreen,
  Home: SettingsScreen,
});

const styles = StyleSheet.create({
  bountyContainer: {
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
