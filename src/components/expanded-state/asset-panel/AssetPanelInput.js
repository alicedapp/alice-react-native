import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { pure } from 'recompact';
import styled from 'styled-components/primitives';
import { colors, fonts, padding, position } from '../../../styles';
import { Icon } from '../../icons';
import { Centered, Flex, FlexItem, Row } from '../../layout';
import { TruncatedText } from '../../text';
import Input from '../../inputs/Input';

import FloatingPanel from '../FloatingPanel';
import { AddressField } from '../../fields';

const Container = styled(Row).attrs({
  align: 'center',
  justify: 'space-between',
})`
  ${padding(0, FloatingPanel.padding.x)};
  height: 60;
  width: 100%;
`;

const IconContainer = styled(Centered)`
  flex-grow: 0;
  flex-shrink: 0;
  height: 100%;
  width: 24;
`;

const AddressInput = styled(AddressField)`
  padding-right: 20px;
`;

const AddressInputLabel = styled(Text)`
  color: ${colors.blueGreyDark};
  font-size: ${fonts.size.h5}
  font-family: ${fonts.family.SFProText};
  font-weight: ${fonts.weight.semibold};
  margin-right: 6px;
  opacity: 0.6;
`;

const AddressInputContainer = styled(Flex)`
  ${padding(20, 0, 20, 20)}
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

// isValid={isValidAddress}
// onChange={this.onChangeAddressInput}
// value={recipient}
// inputRef={(addressInput) => { this.addressInput = addressInput; }}


const AssetPanelInput = ({
  color,
  icon,
  label,
  onPress,
  placeholder
}) => (
  <Container
    activeOpacity={0.5}
    component={TouchableOpacity}
    onPress={onPress}
  >
    <AddressInputContainer>
      <AddressInput
        autoFocus
        placeholder={placeholder}
      />
    </AddressInputContainer>
  </Container>
);

AssetPanelInput.propTypes = {
  color: PropTypes.string,
  icon: Icon.propTypes.name,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

AssetPanelInput.defaultProps = {
  color: colors.sendScreen.brightBlue,
};

export default pure(AssetPanelInput);
