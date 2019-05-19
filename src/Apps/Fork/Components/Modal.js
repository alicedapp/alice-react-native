import Modal from "react-native-modal";
import {Component} from "react";
import {View, Text, Dimensions, StyleSheet, Image, TouchableHighlight, TouchableOpacity, TextInput} from "react-native";
import React from "react";

let {height, width} = Dimensions.get('window');

export default class AppsScreen extends Component<Props> {
  state = {
    isVisible: false,
    pin: ''
  };

  navigate = () => console.log('hello');

  approve = () => {
    this.props.closeModal();
    this.props.navigation.navigate('Confirmation');
  }

  render() {
    return (
      <Modal isVisible={this.props.isVisible} onBackdropPress={this.props.onBackdropPress} style={styles.modal} animationIn={'slideInDown'} animationOut={'slideOutUp'}>
        <View style={styles.modalBox}>
          <View style={{width: '100%', height: 20, marginTop: 30, alignItems: 'flex-end', justifyContent: 'center'}}>
            <TouchableOpacity onPress={this.props.closeModal}>
              <Image source={require('../Assets/close.png')} style={{resizeMode: 'contain', height: 30, width: 30}}/>
            </TouchableOpacity>
          </View>
          <View style={{padding: 10}}>
            <View style={{width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 15}}>
              <Text style={{fontFamily: 'Avenir-Black', fontSize: 20}}>$5.00 ☕️</Text>
            </View>
          </View>
        </View>
        <View style={styles.modalBox2}>
          <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <TextInput secureTextEntry style={{width: 200, height: 50, backgroundColor: '#d6d6d6', padding: 10, fontSize: 20, borderRadius: 15, marginBottom: 10}} keyboardType={'numeric'} value={this.state.pin} onChangeText={(e) => this.setState({pin: e})}/>
            <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={this.approve} style={{ width: width - 40, height: 50, backgroundColor: '#0077eb', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 15}}>
                <Text style={{color: 'white', fontSize: 20, alignItems: 'center', justifyContent: 'center', fontFamily: 'Avenir-Black'}}>Approve</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

}
const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  modalBox: {
    width,
    marginBottom: 50,
    padding: 15,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 25,
    position: 'absolute',
    top: 0
  },
  modalBox2: {
    width,
    marginBottom: 50,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 25,
  }
});
