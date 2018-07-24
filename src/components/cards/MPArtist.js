import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {MPText} from '../general';
import { MPLessArtistIcon, MPPlusArtistIcon, MPPlusArtistAvatarIcon} from '../../assets/svg';

class MPArtist extends Component {

  render() {
    let {artist, imagePath, style, isFollowing} = this.props;

    return (
      <TouchableOpacity style={style || {}}>
        <View style={ styles.simpleArtistCardContainer }>
          <View>
            <View style={ styles.simpleArtistCardImage }>
              <Image source={ imagePath }/>
            </View>
            { isFollowing  ?
              <View style={{position: 'absolute'}}>
                <MPLessArtistIcon style={styles.iconArtist}/>
                <MPPlusArtistAvatarIcon style={styles.iconArtistAvatar}/>
              </View>
            :
              <View style={{position: 'absolute'}}>
                <MPPlusArtistIcon style={styles.iconArtist}/>
                <MPPlusArtistAvatarIcon style={styles.iconArtistAvatar}/>
              </View>
            }
          </View>
          <MPText style={ styles.simpleArtistCardText }>{ artist }</MPText>
        </View>
      </TouchableOpacity>
    );
  }
}

MPArtist.propTypes = {
  artist: PropTypes.string.isRequired,
  imagePath: PropTypes.any,
  onPress: PropTypes.func.isRequired,
  backgroundColor: PropTypes.any,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  simpleArtistCardContainer: {
    width: 100,
    height: 152,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 4,
    marginHorizontal: 5,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  simpleArtistCardImage: {
    width: 100,
    height: 100,
    borderRadius: 4,
    backgroundColor: '#f60',
    overflow: 'hidden'
  },
  simpleArtistCardText: {
    fontSize: 14,
    color: '#000',
    paddingTop: 10,
    paddingStart: 10,
    paddingEnd: 10,
    paddingBottom: 26,
    fontFamily: 'Montserrat-Regular'
  },
  iconArtist: {
    position: 'absolute',
    left: 8,
    top: 8
  },
  iconArtistAvatar: {
    position: 'absolute',
    left: 23,
    top: 8
  }
});

export {MPArtist};
