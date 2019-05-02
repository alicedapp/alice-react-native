import React, {Component} from 'react';
import Camera from 'react-native-camera';

export default class CameraComponent extends Component {

  render() {
    return (
      <Camera style={{flex: 1}} onBarCodeRead={() => this.props.navigation.navigate('Menu')}>

      </Camera>
    )
  }

}
