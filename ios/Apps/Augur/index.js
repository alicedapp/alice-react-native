import React from 'react';
import {
  Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, ScrollView, StyleSheet,
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from '../../components/IconComponent';
import Modal from '../../components/Modal';

const { height, width } = Dimensions.get('window');

class Explore extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    // return {
    //   tabBarIcon: ({ tintColor }) => <Icon icon={require('../../../Assets/bounties-explorer.png')} size={25}/>,
    // };
  };

  state = {
    bountiesInfo: null,
  };

  componentDidMount() {
    this.getBounties();
  }

  getBounties = async () => {
    const data = null;

    var xhr = new XMLHttpRequest();

    // const onData = (data) => this.setState({bountiesInfo: data});
    // xhr.addEventListener("readystatechange",  function()  {
    //   if (this.readyState === this.DONE) {
    //     onData(JSON.parse(this.responseText));
    //     console.log(JSON.parse(this.responseText));
    //   }
    // });
    //
    // xhr.open("GET", "https://gitcoin.co/api/v0.1/bounties/");
    //
    // xhr.send(data);

    // const bountiesInfo = await fetch('https://gitcoin.co/api/v0.1/bounties/');

    // console.log('bounties info: ', bountiesInfo);
  };

  render() {
    const { navigation } = this.props;
    console.log('bounties info: ', this.state.bountiesInfo);
    if (this.state.bountiesInfo === null) {
      return (
        <View style={{
          flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#white',
        }}>
          <Image source={require('../../../Assets/augur-logo.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>

      </View>
    );
  }
}

class Dashboard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    // return {
    //   tabBarIcon: ({ tintColor }) => <Icon icon={require('../../../Assets/bounties-dashboard.png')} size={25}/>,
    // };
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Trading Coming Soon!</Text>
      </View>
    );
  }
}

class Leaderboard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarIcon: ({ tintColor }) => <Icon icon={require('../../../Assets/bounties-leaderboard.png')} size={25}/>,
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

class Profile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarIcon: ({ tintColor }) => <Icon icon={require('../../../Assets/bounties-avatar.png')} size={25}/>,
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

export default createBottomTabNavigator({
  Explore,
  Dashboard,
},
{
  tabBarOptions: {
    style: {
      backgroundColor: '#efefef',
      borderTopColor: 'transparent',
    },
    showLabel: false,
  },
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
});
