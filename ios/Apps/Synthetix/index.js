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
    return {
      tabBarIcon: ({ tintColor }) => <Icon icon={require('../../../Assets/synthetix-exchange.png')} size={35}/>,
    };
  };

  state = {
    bountiesInfo: null,
  };

  componentDidMount() {
    this.getBounties();
  }

  getBounties = async () => {
    const data = null;

    const xhr = new XMLHttpRequest();

    const onData = (data) => this.setState({ bountiesInfo: data });
  };

  render() {
    const { navigation } = this.props;
    if (this.state.bountiesInfo === null) {
      return (
        <View style={{
          flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0817',
        }}>
          <Image source={require('../../../Assets/synthetix.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <View style={{
          flex: 1, marginTop: -40, resizeMode: 'contain', paddingTop: 40,
        }}>
          <View style={{
            margin: 20, marginTop: 50, marginBottom: 0, backgroundColor: 'transparent',
          }}>
            <TouchableOpacity style={{}} onPress={() => navigation.navigate('Apps')}>
              <Image source={require('../../../Assets/back-button.png')} style={{ resizeMode: 'contain', width: 20, height: 20 }}/>
            </TouchableOpacity>
          </View>
          <View style={{
            marginBottom: 10, marginLeft: 15, flexDirection: 'row', justifyContent: 'space-around',
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 30, color: '#5A28C6' }}>{this.state.bountiesInfo.count}</Text>
              <Text style={{ fontSize: 17, color: 'grey' }}>bounties</Text>
            </View>
            <TouchableOpacity style={{
              width: 80, height: 30, borderRadius: 15, backgroundColor: '#5A28C6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
            }}>
              <Text style={{ color: 'white' }}>Filter</Text>
              <Image source={require('../../../Assets/settings.png')} style={{ resizeMode: 'contain', width: 10, height: 10 }}/>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ width, flex: 1 }}>
            {this.state.bountiesInfo.results.map((result) => (
              <View style={styles.bountyContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ flex: 4 }}>{result.title}</Text>
                  <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                    <Text style={{ color: '#5A28C6', fontSize: 18 }}>${result.usd_price.toFixed(2)}</Text>
                    <Text style={{ color: '#888', fontSize: 12 }}>{parseInt(result.calculated_balance).toFixed(2)}{result.current_market_token_data.symbol}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{
                    flexDirection: 'row', alignItems: 'center', flex: 4, flexWrap: 'wrap',
                  }}>
                    {result.categories.map(category => (
                      <View style={{
                        borderColor: '#aaaaaa', borderWidth: 1, borderRadius: 25, alignItems: 'center', justifyContent: 'center', margin: 2, padding: 4,
                      }}>
                        <Text>{ category.name }</Text>
                      </View>
                    ))}
                  </View>
                  <View style={{ flex: 1 }}/>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Image source={{ uri: result.user.small_profile_image_url }} style={{
                    resizeMode: 'contain', width: 40, height: 40, flex: 1,
                  }}/>
                  <Text numberOfLines={1} truncatePosition="middle" style={{ color: '#5388ff', fontWeight: '500', flex: 5 }}>{result.user.public_address}</Text>
                </View>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../../Assets/puzzle.png')} style={{
                      resizeMode: 'contain', width: 15, height: 15, marginRight: 5,
                    }}/>
                    <Text style={{ color: 'black', marginRight: 3 }}>{result.experienceLevel}</Text>
                    <Text style={{ color: 'grey' }}>difficulty</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../../Assets/clock-circular-outline.png')} style={{
                      resizeMode: 'contain', width: 15, height: 15, marginRight: 5,
                    }}/>
                    <Text style={{ color: 'black', marginRight: 3 }}>{result.deadline}</Text>
                    <Text style={{ color: 'grey' }}>remaining</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../../Assets/enter-arrow.png')} style={{
                      resizeMode: 'contain', width: 15, height: 15, marginRight: 5,
                    }}/>
                    <Text style={{ color: 'black', marginRight: 3 }}>{result.fulfillment_count}</Text>
                    <Text style={{ color: 'grey' }}>{result.fulfillment_count === 1 ? 'submission' : 'submissions'}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <Modal app={'ethereum'} isVisible={this.state.modalVisible} onBackdropPress={this.closeModal} closeModal={this.closeModal}/>
      </View>
    );
  }
}

class Dashboard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarIcon: ({ tintColor }) => <Icon icon={require('../../../Assets/synthetix-mintr.png')} size={35}/>,
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

class Leaderboard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarIcon: ({ tintColor }) => <Icon icon={require('../../../Assets/synthetix-swap.png')} size={35}/>,
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
      tabBarIcon: ({ tintColor }) => <Icon icon={require('../../../Assets/synthetix-dashboard.png')} size={35}/>,
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
  Leaderboard,
  Profile,
},
{
  tabBarOptions: {
    style: {
      backgroundColor: '#fff',
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
