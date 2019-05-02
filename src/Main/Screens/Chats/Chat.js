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
import Modal from "../../../components/Modal.js";

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


  renderChat() {
    return (
      <View>
        {this.props.navigation.state.params.chatData.component()}
      </View>
    );
  }

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
              <Image source={require('../../../../Assets/profpic1.png')} style={{flex: 1, resizeMode: 'contain', height: 30}}/>
              <View style={{flex: 5, marginLeft: 5, justifyContent: 'center'}}>
                <Text style={{fontSize: 17, color: 'white'}}>Cristina Sandberg</Text>
              </View>
            </View>
            <ScrollView style={{flex: 1, width, height,}}>
              {chatData && this.renderChat()}
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
            <Modal isVisible={this.state.modalVisible} onBackdropPress={this.closeModal} closeModal={this.closeModal}/>
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
