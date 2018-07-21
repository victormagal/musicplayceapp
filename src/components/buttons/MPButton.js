import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {MPText} from '../general/MPText';

class MPButton extends Component {

  render() {
    let {style, title, onPress, icon, textStyle} = this.props;
    let Icon = icon;

    return (
      <TouchableOpacity style={[styles.container, style || {}]} onPress={onPress}>
        {icon && <Icon style={styles.icon}/>}
        <MPText style={[styles.text, textStyle || {}]}>
          {title}
        </MPText>
      </TouchableOpacity>
    );
  }
}

MPButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any,
  textStyle: PropTypes.any,
  icon: PropTypes.any
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: 'Montserrat-Medium',
    color: '#fff'
  },
  icon: {
    position: 'absolute',
    left: 6
  }
});

export {MPButton};
