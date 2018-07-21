import React, {Component} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {MPSongListIcon, MPPlayIcon, MPStarIcon} from '../../assets/svg';
import {MPText} from '../../components';

class MPArtistFull extends Component {

  render() {
    let {songName, imagePath, artistImagePath, artistName, style, onPressMusic, onPressArtist} = this.props;

    return (
      <View style={style || {}}>
        <View style={ styles.simpleArtistCardContainer }>
          <View>
            <View style={ styles.simpleArtistCardImage }>
              <Image source={imagePath}/>
              <MPPlayIcon style={styles.playIcon}/>
              <MPSongListIcon style={styles.songListIcon}/>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={onPressMusic}>
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
                <Image source={artistImagePath}/>
              </View>
              <MPText style={styles.artistName}>{artistName}</MPText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

MPArtistFull.propTypes = {
  songName: PropTypes.string.isRequired,
  imagePath: PropTypes.any.isRequired,
  artistImagePath: PropTypes.any.isRequired,
  backgroundColor: PropTypes.any,
  style: PropTypes.any,
  onPressMusic: PropTypes.func.isRequired,
  onPressArtist: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  simpleArtistCardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 4,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 4
  },
  simpleArtistCardImage: {
    justifyContent: 'center',
    width: 120,
    height: 120,
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
    overflow: 'hidden',
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
  }
});

export {MPArtistFull};
