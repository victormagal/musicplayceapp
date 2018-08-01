import React, {Component} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import PropTypes from 'prop-types';
import {MPSongListIcon, MPPlayIcon, MPStarIcon} from '../../assets/svg';
import {MPText} from '../../components';

class MPArtistFull extends Component {

  render() {
    const {song, songName, imagePath, artistImagePath, artistName, style, onPressMusic, onPressArtist} = this.props;
    const songImage = typeof imagePath === 'string' ? {uri: imagePath} : imagePath;
    const artistImage = typeof artistImagePath === 'string' ? {uri: artistImagePath} : require('../../assets/img/avatar-male.jpg');
    return (
      <View style={style || {}}>
        <Card containerStyle={styles.simpleArtistCardContainer}>
          <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => onPressMusic(song)}>
              <View style={styles.simpleArtistCardImageContainer}>
                <Image source={songImage} style={ styles.simpleArtistCardImage }/>
                <MPPlayIcon style={styles.playIcon}/>
                <MPSongListIcon style={styles.songListIcon}/>
              </View>
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={() => onPressMusic(song)}>
                <MPText style={styles.simpleArtistCardText}>{songName}</MPText>
              </TouchableOpacity>
              <View style={styles.starsContainer}>
                <MPStarIcon style={styles.marginEnd}/>
                <MPStarIcon style={styles.marginEnd}/>
                <MPStarIcon style={styles.marginEnd}/>
                <MPStarIcon style={styles.marginEnd}/>
                <MPStarIcon style={styles.marginEnd}/>
              </View>
              <TouchableOpacity style={styles.artistContent} onPress={onPressArtist}>
                <View style={ styles.roundImage }>
                  <Image source={artistImage} style={styles.artistImage}/>
                </View>
                <MPText style={styles.artistName}>{artistName}</MPText>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

MPArtistFull.propTypes = {
  songName: PropTypes.string,
  song: PropTypes.object,
  imagePath: PropTypes.any,
  artistImagePath: PropTypes.any,
  backgroundColor: PropTypes.any,
  style: PropTypes.any,
  onPressMusic: PropTypes.func.isRequired,
  onPressArtist: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  simpleArtistCardContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    marginHorizontal: 20,
    marginVertical: 20,
    height: 120,
    padding: 0,
    overflow: 'hidden'
  },
  cardContainer: {
    flexDirection: 'row'
  },
  simpleArtistCardImageContainer: {
    justifyContent: 'center',
    width: 120,
    height: '100%',
    backgroundColor: '#f60'
  },
  simpleArtistCardImage: {
    width: 120,
    height: '100%'
  },
  simpleArtistCardText: {
    fontSize: 14,
    color: '#000',
    paddingTop: 10,
    paddingStart: 10,
    paddingEnd: 10,
    fontFamily: 'Montserrat-Regular'
  },
  starsContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
    flexDirection: 'row'
  },
  roundImage: {
    borderRadius: 25,
    width: 40,
    height: 40,
    overflow: 'hidden'
  },
  artistContent: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 10,
    alignContent: 'center'
  },
  artistName: {
    fontSize: 11,
    color: '#000',
    fontFamily: 'ProbaPro-Regular',
    marginStart: 8,
    marginTop: 15
  },
  marginEnd: {
    marginEnd: 3
  },
  playIcon: {
    position: 'absolute',
    alignSelf: 'center'
  },
  songListIcon: {
    position: 'absolute',
    top: 4,
    right: 4
  },
  artistImage: {
    borderRadius: 20,
    width: 40,
    height: 40
  }
});

export {MPArtistFull};
