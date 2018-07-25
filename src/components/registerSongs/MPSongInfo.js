import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {MPText} from '../general/MPText';
import {MPValidatedFilledRedIcon} from '../../assets/svg';


class MPSongInfo extends Component {

  render() {
    let {title, info, placeholder, selected, invalid, onPress, style} = this.props;
    let borderStyle = {};
    let iconStyle = {};

    if(selected || invalid){
      borderStyle = {
        borderColor: "#e13223",
        borderWidth: 2
      };
    }

    if (selected ) {
      iconStyle = {
        position: 'absolute',
        right: 0,
        top: 10
      };
    }

    style = style || {};

    return (
      <View style={[styles.container, style ]}>
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.parent, borderStyle]}>
            <MPText style={styles.titleText}>{ title }</MPText>
            <MPText style={styles.infoText}>{ info || placeholder }</MPText>
          </View>
        </TouchableOpacity>
        { selected && <MPValidatedFilledRedIcon style={ iconStyle }/> }
      </View>
    );
  }
}

MPSongInfo.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  info: PropTypes.string,
  selected: PropTypes.bool,
  style: PropTypes.any,
  placeholder: PropTypes.string,
  invalid: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '2%',
    marginBottom: 10,
    height: 93,
    width: '96%'
  },
  parent: {
    backgroundColor: '#fff',
    marginTop: 18,
    height: 78,
    borderRadius: 4,
    padding: 10,
    marginRight: 7,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
  titleText: {
    color: "#000",
    paddingStart: 10,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    fontWeight: '500'
  },
  infoText: {
    color: '#9b9b9b',
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    paddingStart: 10,
  }
});

export {MPSongInfo};
