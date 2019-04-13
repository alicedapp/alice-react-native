import {Component} from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
  View,
  TouchableOpacity
} from "react-native";
import React from "react";
import Icon from "../../../components/IconComponent";
import Modal from "../../../components/Modal";

let {height, width} = Dimensions.get('window');

type Props = {};
export default class ChatScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarIcon: ({tintColor}) => <Icon icon="ChatGrey" size={30}/>,
      headerStyle:
        {
          marginTop: -100,
          backgroundColor: 'transparent',
          zIndex: 100,
          borderBottomWidth: 0,
        },
    }
  };

  state = {
    modalVisible: false
  };

  placeOrder = () => this.setState({ modalVisible: true });
  closeModal = () => {
    console.log('closing');
    this.setState({ modalVisible: false })
  }

  navigate = () => console.log('hello');

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={{height: 30, width, flexDirection: 'row', marginTop: 30, marginBottom: 15, alignItems: 'center'}}>
              <TouchableOpacity style={{flex: 2}} onPress={() => navigation.goBack()}>
                <Image source={require('../../../../Assets/back-button.png')} style={{resizeMode: 'contain', width: 20, height: 20}}/>
              </TouchableOpacity>
              <Image source={require('../../../../Assets/anon-avatar.png')} style={{flex: 1, resizeMode: 'contain', height: 30}}/>
              <View style={{flex: 5, marginLeft: 5, justifyContent: 'center'}}>
                <Text style={{fontSize: 17, color: 'white'}}>ETHTRADER_SG</Text>
              </View>
            </View>
            <ScrollView style={{flex: 1, width, height,}}>
              <View style={{width: width - 50, padding: 8, marginRight: 20, backgroundColor: '#dedede', borderRadius: 5, marginBottom: 5, marginTop: 5}}>
                <Text>Hey, where are you at?</Text>
              </View>
              <View style={{width: width - 50, padding: 8, marginLeft: 20, marginRight: 5, backgroundColor: '#6024ce', borderRadius: 5, marginBottom: 5, marginTop: 5 }}>
                <Text style={{color: 'white'}}>One sec, I'll send a location</Text>
              </View>
              <Image source={require('../../../../Assets/maps.png')} style={{flex: 1, resizeMode: 'contain', height: 180, width: width - 50, padding: 8, marginRight: 20, marginBottom: 5, marginTop: 5}}/>
              <View style={{width: width - 50, padding: 8, marginRight: 20, backgroundColor: '#dedede', borderRadius: 5, marginBottom: 5, marginTop: 5}}>
                <Text>Cool, I'll send the request</Text>
              </View>
              <TouchableWithoutFeedback onPress={this.placeOrder}>
                <Image source={require('../../../../Assets/localethereum-modal.png')} style={{height: 190, resizeMode: 'contain', width: width - 50, padding: 8, marginRight: 20, marginBottom: 5, marginTop: 5}}/>
              </TouchableWithoutFeedback>
              <View style={{width: width - 50, padding: 8, marginLeft: 20, marginRight: 5, backgroundColor: '#6024ce', borderRadius: 5, marginBottom: 5, marginTop: 5 }}>
                <Text style={{color: 'white'}}>Thanks for meeting up, really appreciate it</Text>
              </View>
            </ScrollView>
            <View style={{flexDirection: 'row', width, height: 40, marginLeft: -20, marginBottom: -20, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-around'}}>
              <TouchableHighlight style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../../../../Assets/paperclip.png')} style={{flex: 1, resizeMode: 'contain', height: 18, width: 18}}/>
              </TouchableHighlight>
              <TextInput placeholder='Message' style={{flex: 8, backgroundColor: '#b4b4b4', borderRadius: 10, height: 30, paddingLeft: 10}}/>
              <TouchableHighlight style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../../../Assets/send-button.png')} style={{flex: 1, resizeMode: 'contain', height: 20, width: 20}}/>
              </TouchableHighlight>
            </View>
            <Modal app={'ethereum'} isVisible={this.state.modalVisible} onBackdropPress={this.closeModal} closeModal={this.closeModal}/>
          </View>
        </TouchableWithoutFeedback>
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
    flexDirection: 'column',
    justifyContent: 'space-between',
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
