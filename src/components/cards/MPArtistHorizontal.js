import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import { Card } from 'react-native-elements';
import PropTypes from 'prop-types';
import {MPText} from '../general';
import {MPValidatedFilledRedIcon} from '../../assets/svg';


class MPArtistHorizontal extends Component {

  render() {
    let {artist, image, selected, style, onPress} = this.props;
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
        right: 5
      };
    }

    return (
      <TouchableOpacity style={[styles.paddingShadow, style || {}]} onPress={ onPress }>
        <Card containerStyle={[styles.stretchedArtistCardContainer, borderStyle]}>
          <View style={styles.content}>
            <Image style={styles.stretchedArtistImage} source={image ? {uri: image} : null}/>
            <MPText style={ styles.stretchedArtistText}>{ artist }</MPText>
          </View>
        </Card>
        {selected && <MPValidatedFilledRedIcon style={iconStyle}/>}
      </TouchableOpacity>
    );
  }
}

MPArtistHorizontal.propTypes = {
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
  stretchedArtistCardContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    margin: 0,
    padding: 0,
    height: 60,
    overflow: 'hidden'
  },
  stretchedArtistImage: {
    width: 58,
    height: 58,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  },
  stretchedArtistText: {
    color: "#000",
    fontSize: 20,
    paddingStart: 20,
    fontFamily: 'probaProRegular',
    alignSelf: 'center'
  },
});

export {MPArtistHorizontal};
