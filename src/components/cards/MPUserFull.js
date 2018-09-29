import React, {Component} from 'react';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import PropTypes from 'prop-types';
import {MPSongListIcon, MPPlayIcon, MPStarIcon, MPFilledStarIcon} from '../../assets/svg';
import {MPText} from '../../components';


const StarIcon = (props) => (
  props.filled ? <MPFilledStarIcon /> : <MPStarIcon />
);
const stars = new Array(5).fill();


class MPUserFull extends Component {

  render() {
    const {song, songName, imagePath, userImagePath, userName, style, onPressMusic, onPressUser} = this.props;
    const songImage = typeof imagePath === 'string' ? {uri: imagePath} : require('../../assets/img/album-default.png');
    const userImage = typeof userImagePath === 'string' ? {uri: userImagePath} : require('../../assets/img/avatar-male.jpg');
    return (
      <View style={style || {}}>
        <Card containerStyle={styles.simpleUserCardContainer}>
          <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => onPressMusic(song)}>
              <View style={styles.simpleUserCardImageContainer}>
                <Image source={songImage} style={ styles.simpleUserCardImage }/>
                <MPPlayIcon style={styles.playIcon}/>
                {/* <MPSongListIcon style={styles.songListIcon}/> */}
              </View>
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={() => onPressMusic(song)}>
                <MPText style={styles.simpleUserCardText}>{songName}</MPText>
              </TouchableOpacity>
              <View style={styles.starsContainer}>
                {song && stars.map((_, i) =>
                  <StarIcon key={i} style={styles.marginEnd} filled={i < song.rating }/>
                )}
              </View>
              <TouchableOpacity style={styles.userContent} onPress={onPressUser}>
                <View style={ styles.roundImage }>
                  <Image source={userImage} style={styles.userImage}/>
                </View>
                <MPText style={styles.userName}>{userName}</MPText>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

MPUserFull.propTypes = {
  songName: PropTypes.string,
  song: PropTypes.object,
  imagePath: PropTypes.any,
  userImagePath: PropTypes.any,
  backgroundColor: PropTypes.any,
  style: PropTypes.any,
  onPressMusic: PropTypes.func.isRequired,
  onPressUser: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  simpleUserCardContainer: {
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
  simpleUserCardImageContainer: {
    justifyContent: 'center',
    width: 120,
    height: '100%',
    backgroundColor: '#f60'
  },
  simpleUserCardImage: {
    width: 120,
    height: '100%'
  },
  simpleUserCardText: {
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
  userContent: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 10,
    alignContent: 'center'
  },
  userName: {
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
  userImage: {
    borderRadius: 20,
    width: 40,
    height: 40
  }
});

export {MPUserFull};
