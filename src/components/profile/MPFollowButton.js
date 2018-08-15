import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {MPText} from '../general';
import {MPFollowingIcon, MPFollowIcon} from '../../assets/svg';

class MPFollowButton extends Component {
  render() {
    let {isFollowing, onPress} = this.props;

    return (
      <TouchableOpacity style={styles.parent} onPress={ onPress }>
        {
          isFollowing ? (
              <View style={styles.followingButtonContainer}>
                <MPFollowingIcon />
                <MPText style={styles.followingText}>Seguindo</MPText>
              </View>
            ) : (
              <View style={styles.followButtonContainer}>
                <MPFollowIcon />
                <MPText style={styles.followText}>Seguir</MPText>
              </View>
            )
        }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  parent: {
    alignSelf: 'flex-start',
    marginStart: 20
  },
  followingButtonContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  followButtonContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 16,
    flexDirection: 'row',
  },
  followingText: {
    color: '#e13223',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginStart: 10,
  },
  followText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginStart: 5,
  }
});

export {MPFollowButton};

