import React, {Component} from 'react';
import {Card} from 'react-native-elements';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {MPText} from '../general';
import { MPLessArtistIcon, MPPlusArtistIcon, MPPlusArtistAvatarIcon} from '../../assets/svg';

class MPArtist extends Component {

  render() {
    const {artist, style, isFollowing, onPress} = this.props;
    const image = artist.picture_url ? { uri: artist.picture_url } : null;

    return (
      <TouchableOpacity style={style || {}} onPress={onPress}>
        <Card containerStyle={styles.simpleArtistCardContainer}>
          <View>
            <View style={ styles.simpleArtistCardImage }>
              <Image source={image} style={styles.image}/>
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
          <MPText style={ styles.simpleArtistCardText }>{ artist.name }</MPText>
        </Card>
      </TouchableOpacity>
    );
  }
}

MPArtist.propTypes = {
  artist: PropTypes.object.isRequired,
  imagePath: PropTypes.any,
  onPress: PropTypes.func,
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
    padding: 0,
    overflow: 'hidden'
  },
  simpleArtistCardImage: {
    width: 100,
    height: 100,
    backgroundColor: '#f60'
  },
  image: {
    width: 100,
    height: 100
  },
  simpleArtistCardText: {
    fontSize: 14,
    color: '#000',
    paddingTop: 10,
    paddingStart: 10,
    paddingEnd: 10,
    paddingBottom: 26,
    fontFamily: 'ProbaPro-Regular'
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
