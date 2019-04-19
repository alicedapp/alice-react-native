import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Icon from '../../components/IconComponent';
import KittyScreen from './Screens/KittyScreen'
import MyKitties from './Screens/MyKitties'

let { height, width } = Dimensions.get('window');

class HomeScreen extends React.Component {

  componentDidMount() {

  }

  state = {
    kitties: true,
  };

  initializeWallet = () => {
    console.log('called');
    const data = {"contract":"0x44F5027aAACd75aB89b40411FB119f8Ca82fE733", "nonce":0, "users":{"0xa303ddC620aa7d1390BACcc8A495508B183fab59":1,"0x3Abf4443F1Fd1Cc89fc129B44e71dd9c96e260aB":1, "0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB": 1}, "threshold":1};
    fetch('http://localhost:8080/api/contracts/', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then(response => response.json());
  }

  render() {
    const { navigation } = this.props;
    if (this.state.kitties === null) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
          <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
            <Image source={require('../../../Assets/new-chat-logo.png')} style={{
              width: 60,
              height: 60,
              resizeMode: 'contain',
            }}/>
          </View>
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <View style={{margin: 20, marginTop: 50, marginBottom: 0, backgroundColor: 'transparent'}}>
          <TouchableOpacity style={{}} onPress={() => navigation.navigate('Apps')}>
            <Image source={require('../../../Assets/back-button.png')} style={{ resizeMode: 'contain', width: 20, height: 20 }}/>
          </TouchableOpacity>
          <Text style={{ color: 'black', fontFamily: 'Avenir-Black', fontSize: 25, marginTop: 10 }}>MetaMultisig</Text>
        </View>
        <ScrollView style={{
          flex: 1
        }}>
          <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={this.initializeWallet} style={{width: 200, height: 50, borderColor: 'black', borderWidth: 2, alignItems: 'center', justifyContent: 'center'}}>
              <Text>Initialize Multisig</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

class Menu extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarIcon: ({ tintColor }) => <Icon icon={require('../../../Assets/hamburger.png')} size={20}/>,
    };
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Trading Coming Soon!</Text>
      </View>
    );
  }
}

const HomeScreen2 = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  KittyScreen: {
    screen: KittyScreen,
  },
},
{
  headerMode: 'none',
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => <Icon icon={require('../../../Assets/cryptokitties-cat.png')} size={25}/>,
  },
});

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
  Paw: MyKitties,
  Menu: Menu,
},
  {
    tabBarOptions: {
      style: {
        backgroundColor: 'transparent',
        borderTopColor: 'transparent',
      },
      showLabel: false,
    }
  });

const styles = StyleSheet.create({
  kittyContainer: {
    margin: 10,
    maxWidth: 150,
    backgroundColor: 'white',
    shadowColor: '#cecece',
  },
});
