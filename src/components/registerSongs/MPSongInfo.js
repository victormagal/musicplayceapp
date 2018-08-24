import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
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
        top: 0
      };
    }

    style = style || {};

    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity onPress={onPress}>
          <Card containerStyle={[styles.parent, borderStyle]}>
            <MPText style={styles.titleText}>
              { title }
            </MPText>
            <MPText numberOfLines={2} style={styles.infoText}>
              { info || placeholder }
            </MPText>
          </Card>
        </TouchableOpacity>
        { selected &&
          <MPValidatedFilledRedIcon style={ iconStyle }/>
        }
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
    height: 93,
    width: '100%'
  },
  parent: {
    backgroundColor: '#fff',
    height: 78,
    borderRadius: 4,
    padding: 0,
    marginTop: 7,
    marginRight: 7,
    marginLeft: 0,
    marginBottom: 0,
    justifyContent: 'center',
  },
  titleText: {
    color: "#000",
    paddingStart: 10,
    paddingEnd: 10,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    fontWeight: '500'
  },
  infoText: {
    color: '#9b9b9b',
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    paddingStart: 10,
    paddingEnd: 10
  }
});

export {MPSongInfo};
