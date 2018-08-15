import React, {Component} from 'react';
import {Card} from 'react-native-elements';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {MPText} from '../general';
import {MPLessArtistIcon, MPPlusArtistIcon, MPPlusArtistAvatarIcon} from '../../assets/svg';

class MPUser extends Component {

  handleToggleFollowUser = () => {
    const {onToggleFollowUser, user} = this.props;
    onToggleFollowUser && onToggleFollowUser(user);
  };

  renderTopIcon() {
    const {user, hideSettings} = this.props;

    if (hideSettings) {
      return null;
    }

    if (user.isFollowing)
      return (
        <TouchableOpacity style={styles.iconContainer} onPress={this.handleToggleFollowUser}>
          <MPLessArtistIcon />
          <MPPlusArtistAvatarIcon style={styles.iconAvatar}/>
        </TouchableOpacity>
      );

    return (
      <TouchableOpacity style={styles.iconContainer} onPress={this.handleToggleFollowUser}>
        <MPPlusArtistIcon />
        <MPPlusArtistAvatarIcon style={styles.iconAvatar}/>
      </TouchableOpacity>
    );
  }

  render() {
    const {user, style, onPress} = this.props;
    const image = user.picture_url ? {uri: user.picture_url} : require('../../assets/img/avatar-male.jpg');
    return (
      <TouchableOpacity style={style || {}} onPress={onPress}>
        <Card containerStyle={styles.simpleUserCardContainer}>
          <View>
            <View style={ styles.simpleUserCardImage }>
              <Image source={image} style={styles.image}/>
            </View>
            {this.renderTopIcon()}
          </View>
          <MPText numberOfLines={2} style={ styles.simpleUserCardText }>
            { user.name } { user.last_name }
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
  iconContainer: {
    position: 'absolute',
    padding: 11,
    flexDirection: 'row'
  },
  iconAvatar: {
    marginLeft: 4
  }
});

export {MPUser};
