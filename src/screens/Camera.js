import React, {Component} from 'react';
import Camera from 'react-native-camera';
import Modal from '../Apps/Fork/Components/Modal';

export default class CameraComponent extends Component {

  state = {
    isVisible: false
  };

  closeModal = () => {
    console.log('closing');
    this.setState({ isVisible: false });
  };

  render() {
    return (
      <Camera style={{flex: 1}} onBarCodeRead={() => this.setState({isVisible: true})} type={'front'}>
        <Modal navigation={this.props.navigation} isVisible={this.state.isVisible} onBackdropPress={this.closeModal} closeModal={this.closeModal}/>
      </Camera>
    )
  }

}
