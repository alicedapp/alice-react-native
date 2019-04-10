import {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import Icon from "../../components/IconComponent";

type Props = {};
export default class PersonalScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarIcon: ({tintColor}) => <Icon icon="AvatarGrey" size={30}/>,
      headerStyle:
        {
          position: 'absolute',
          marginTop: -100,
          backgroundColor: 'transparent',
          zIndex: 100,
          top: 0,
          left: 0,
          right: 0,
          borderBottomWidth: 0,
        },
    }
  };

  navigate = () => console.log('hello');

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white', fontSize: 25}}>Profile</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appSquare: {
    height: 65,
    width: 65,
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'blue'
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#222222',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
