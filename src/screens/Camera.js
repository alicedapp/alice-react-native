import React, {Component} from 'react';
import Camera from 'react-native-camera';
import Modal from '../Apps/Fork/Components/Modal';
import {Text} from 'react-native';

export default class CameraComponent extends Component {

  state = {
    isVisible: false
  };

  reader = (e) => {
    this.setState({isVisible: true, text: JSON.stringify(e)});

    console.log('Event: ', e)
  }

  closeModal = () => {
    console.log('closing');
    this.setState({ isVisible: false });
  };

  render() {
    return (
      <Camera style={{flex: 1}} onBarCodeRead={this.reader} type={'front'}>
        <Modal navigation={this.props.navigation} isVisible={this.state.isVisible} onBackdropPress={this.closeModal} closeModal={this.closeModal}/>
        {/*<Text style={{color: 'white', marginTop: 200}}>{this.state.text}</Text>*/}
      </Camera>
    )
  }

}
