import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {Card} from 'react-native-elements';
import PropTypes from 'prop-types';
import {MPText} from '../general';
import {MPValidatedFilledRedIcon} from '../../assets/svg';


class MPUserHorizontal extends Component {

  render() {
    let {user, image, selected, style, onPress} = this.props;
    let borderStyle = {};
    let iconStyle = {};

    if (selected == true) {
      borderStyle = {
        borderColor: "#e13223",
        borderWidth: 2
      };
      iconStyle = {
        position: 'absolute',
        top: 4,
        right: 5,
        zIndex: 9999999
      };
    }

    return (
      <View style={[styles.paddingShadow, style || {}]}>
        <TouchableOpacity onPress={ onPress }>
          <Card containerStyle={[styles.stretchedUserCardContainer, borderStyle]}>
            <View style={styles.content}>
              <Image style={styles.stretchedUserImage} source={image ? {uri: image} : null}/>
              <MPText style={ styles.stretchedUserText}>{ user }</MPText>
            </View>
          </Card>
        </TouchableOpacity>
        {selected && <MPValidatedFilledRedIcon style={iconStyle}/>}
      </View>
    );
  }
}

MPUserHorizontal.propTypes = {
  artist: PropTypes.string.isRequired,
  image: PropTypes.any,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  paddingShadow: {
    padding: 10
  },
  content: {
    flexDirection: 'row'
  },
  stretchedUserCardContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    margin: 0,
    padding: 0,
    height: 60
  },
  stretchedUserImage: {
    width: 58,
    height: 58,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  },
  stretchedUserText: {
    color: "#000",
    fontSize: 20,
    paddingStart: 20,
    fontFamily: 'ProbaPro-Regular',
    alignSelf: 'center'
  },
});

export {MPUserHorizontal};