import React, {Component} from 'react';
import {Card} from 'react-native-elements';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {MPText} from '../general';
import { MPLessArtistIcon, MPPlusArtistIcon, MPPlusArtistAvatarIcon} from '../../assets/svg';

class MPUser extends Component {

  render() {
    const {user, style, isFollowing, onPress} = this.props;
    const image = user.picture_url ? { uri: user.picture_url } : require('../../assets/img/avatar-male.jpg');

    return (
      <TouchableOpacity style={style || {}} onPress={onPress}>
        <Card containerStyle={styles.simpleUserCardContainer}>
          <View>
            <View style={ styles.simpleUserCardImage }>
              <Image source={image} style={styles.image}/>
            </View>
            { isFollowing  ?
              <View style={{position: 'absolute'}}>
                <MPLessArtistIcon style={styles.iconUser}/>
                <MPPlusArtistAvatarIcon style={styles.iconUserAvatar}/>
              </View>
            :
              <View style={{position: 'absolute'}}>
                <MPPlusArtistIcon style={styles.iconUser}/>
                <MPPlusArtistAvatarIcon style={styles.iconUserAvatar}/>
              </View>
            }
          </View>
          <MPText numberOfLines={2} style={ styles.simpleUserCardText }>
            { user.name }
          </MPText>
        </Card>
      </TouchableOpacity>
    );
  }
}

MPUser.propTypes = {
  user: PropTypes.object.isRequired,
  imagePath: PropTypes.any,
  onPress: PropTypes.func,
  backgroundColor: PropTypes.any,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  simpleUserCardContainer: {
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
  simpleUserCardImage: {
    width: 100,
    height: 100,
    backgroundColor: '#f60'
  },
  image: {
    width: 100,
    height: 100
  },
  simpleUserCardText: {
    fontSize: 14,
    color: '#000',
    paddingTop: 10,
    paddingStart: 10,
    paddingEnd: 10,
    paddingBottom: 26,
    fontFamily: 'ProbaPro-Regular'
  },
  iconUser: {
    position: 'absolute',
    left: 8,
    top: 8
  },
  iconUserAvatar: {
    position: 'absolute',
    left: 23,
    top: 8
  }
});

export {MPUser};
