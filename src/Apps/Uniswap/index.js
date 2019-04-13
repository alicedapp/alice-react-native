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
import TradeScreen from './Screens/TradeScreen'
import MyKitties from './Screens/MyKitties'

let { height, width } = Dimensions.get('window');

class HomeScreen extends React.Component {

  componentDidMount() {
    this.getKitties();
  }

  state = {
    kitties: null,
    borderColor: '#e1e1e1'
  };

  getKitties = async () => {
    try {
      this.setTimeout(this.setState({kitties: true}), 2000)
    } catch (e) {
      console.log('error', e);
    }
  };

  render() {
    const { navigation } = this.props;
    if (this.state.kitties === null) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#faa8ff',
        }}>
          <Image source={require('../../../Assets/uniswap.png')} style={{
            width: 80,
            height: 80,
            resizeMode: 'contain',
          }}/>
        </View>
      );
    }
    console.log('Kitties: ', this.state.kitties);
    const randomColor = [
      '#faf4d1',
      '#cef5d6',
      '#d4e7fe',
      '#dfdff9',
      '#f9e0f3',
      '#fee0e5',
      '#f9e1cb',
      '#eee9e8',
      '#c6eef9',
      '#eee1da',
      '#c6eef9',
    ];
    const breedTime = ['Snappy', 'Swift', 'Prodding', 'Slow'];
    return (
      <View style={{flex: 1}}>
        <View style={{margin: 20, marginTop: 50, marginBottom: 0, backgroundColor: 'transparent'}}>
          <TouchableOpacity style={{}} onPress={() => navigation.navigate('Apps')}>
            <Image source={require('../../../Assets/back-button.png')} style={{ resizeMode: 'contain', width: 20, height: 20 }}/>
          </TouchableOpacity>
        </View>
        <View style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: 40
        }}>
          <View style={{ width: width - 100, backgroundColor: '#fafafa', borderRadius: 15, alignItems: 'center',}}>
            <View style={[{borderColor: this.state.borderColor}, styles.inputContainer]}>
              <View>
                <Text>Input</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput placeholder='0.0' style={{flex: 4}}/>
                <TouchableOpacity style={{flexDirection: 'row', flex: 2, height: 40, borderRadius: 25, alignItems: 'center', backgroundColor: '#fafafa', borderColor: '#cccccc', borderWidth: 1, justifyContent: 'center' }}>
                  <Image source={require('../../../Assets/ethereum.png')} style={{ resizeMode: 'contain', width: 20, height: 20,  }}/>
                  <Text>ETH</Text>
                  <Image source={require('../../../Assets/uniswap-dropdown.png')} style={{ resizeMode: 'contain', width: 15, height: 15,  }}/>
                </TouchableOpacity>
              </View>
            </View>
            <Image source={require('../../../Assets/uniswap-down-arrow.png')} style={{ resizeMode: 'contain', width: 20, height: 20, margin: 20 }}/>
            <View style={[{borderColor: this.state.borderColor}, styles.inputContainer]}>
              <View>
                <Text>Output</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput placeholder='0.0' style={{flex: 4}}/>
                <TouchableOpacity style={{flexDirection: 'row', flex: 3, height: 40, borderRadius: 25, alignItems: 'center', backgroundColor: '#ebf4ff', borderColor: '#2f80ed', borderWidth: 1, justifyContent: 'center' }}>
                  <Text style={{color: '#2f80ed', fontSize: 15}}>Select a token</Text>
                  <Image source={require('../../../Assets/uniswap-dropdown.png')} style={{ resizeMode: 'contain', width: 15, height: 15,  }}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{width: width - 100}}>
              <Text style={{color: '#aaa', padding: 20}}>Exchange Rate</Text>
            </View>
          </View>
          <TouchableOpacity style={{backgroundColor: '#2f80ed', width: 250, height: 60, borderRadius: 40, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'white', fontSize: 20}}>Swap</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

class Menu extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarIcon: ({ tintColor }) => <Icon icon={require('../../../Assets/uniswap-pool.png')} size={30}/>,
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
    screen: TradeScreen,
  },
},
{
  headerMode: 'none',
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => <Icon icon={require('../../../Assets/uniswap-swap.png')} size={25}/>,
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
        backgroundColor: 'transparent'
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
