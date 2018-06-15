import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {MPText} from '../general/MPText';

class MPIconButton extends Component {

  render() {
    let {style, title, onPress, icon, iconStyle, titleStyle} = this.props;
    let Icon = icon;
    iconStyle = iconStyle || {};
    titleStyle = titleStyle || {};

    return (
      <TouchableOpacity style={[style || {}, styles.container]} onPress={onPress}>
        {icon && <Icon style={iconStyle}/>}
        <MPText style={[styles.text, titleStyle]}>
          {title.toUpperCase()}
        </MPText>
      </TouchableOpacity>
    );
  }
}

MPIconButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any,
  icon: PropTypes.any,
  iconStyle: PropTypes.any,
  titleStyle: PropTypes.any
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "500",
    fontFamily: 'montSerratMedium',
    color: '#fff',
    textAlign: 'center'
  }
});

export {MPIconButton};
