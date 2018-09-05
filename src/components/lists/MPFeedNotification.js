import React from 'react';
import {
  StyleSheet, 
  View,
  Image
} from 'react-native';
import { MPText } from '../../components';

class MPFeedNotification extends React.Component {

  render() {
    let {notification, handleSongNavigate, handleNavigateUserProfile} = this.props;
    let notificationType = notification.type.split("\\")[notification.type.split("\\").length - 1];
    let types = ['AlertFollowingMeIndicationNotification',
      'AlertFollowersMeNotification',
      'AlertCommentNotification',
    ];

    let image = require('../../assets/img/avatar-male.jpg');
    let imageFirst = '';
    let imageSecond = "";

    if(notificationType == types[0]){
      imageFirst = typeof notification.data.artistsOwner.picture_url === 'string' ? {uri : notification.data.artistsOwner.picture_url} : image;
      imageSecond = typeof notification.data.artistIndication.picture_url === 'string' ? {uri : notification.data.artistIndication.picture_url} : image;
    }else if(notificationType == types[1]){
      imageFirst = typeof notification.data.userFollower.picture_url === 'string' ? {uri : notification.data.userFollower.picture_url} : image;
      imageSecond = typeof notification.data.artists.picture_url === 'string' ? {uri : notification.data.artists.picture_url} : image;
    }else if (notificationType == types[2]){
      imageFirst = typeof notification.data.users.picture_url === 'string' ? {uri : notification.data.users.picture_url} : image;
    }
    // console.log(notification, imageFirst, imageSecond)
    return (
      <View style={styles.parent}>
        {
          notificationType == types[0] && (
            <View style={{width: 30, height: 30, marginEnd: 10}}>
              <Image source={imageFirst} style={{width: 20, height:20, borderRadius: 10}} />
              <Image style={{position: 'absolute', bottom: 0, right: 0, width: 20, height:20, borderRadius: 10}} source={imageSecond} />
            </View>   
          )
        }
        {
          notificationType == types[1] && (
            <View style={{width: 30, height: 30, marginEnd: 10}}>
              <Image source={imageFirst} style={{width: 20, height:20, borderRadius: 10}} />
              <Image style={{position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderRadius: 10}} source={imageSecond} />
            </View>   
          )
        }
        {
          notificationType == types[2] && (
            <View style={{width: 30, height: 30, marginEnd: 10}}>
              <Image source={imageFirst} style={{width: 30, height: 30, borderRadius: 15}} />
            </View>   
          )
        }
        {
          notificationType == types[0] && (
            <MPText style={styles.notificationText} onPress={handleSongNavigate.bind(this,notification.data.song)}>
              <MPText style={styles.notificationTextEmpth}>{notification.data.song.name}</MPText> de
              <MPText style={styles.notificationTextEmpth}> {notification.data.artistsOwner.name}</MPText> foi indicada para 
              <MPText style={styles.notificationTextEmpth}> {notification.data.artistIndication.name}</MPText>
            </MPText>
          )
        }
        { 
          notificationType == types[1] && (
            <MPText style={styles.notificationText} onPress={handleNavigateUserProfile.bind(this, notification.data.artists.id)}>
              <MPText style={styles.notificationTextEmpth}>{notification.data.userFollower.name}</MPText> começou a seguir   
              <MPText style={styles.notificationTextEmpth}> {notification.data.artists.name}</MPText>
            </MPText>
          )
        } 
        { 
          notificationType == types[2] && (
            <MPText style={styles.notificationText} onPress={handleNavigateUserProfile.bind(this, notification.data.users.id)}>
              <MPText style={styles.notificationTextEmpth}>{notification.data.users.name} </MPText>comentou em
              <MPText style={styles.notificationTextEmpth}> {notification.data.songs.name}</MPText>
            </MPText>
          )
        } 
        { /*
        { 
          notification.type == '2' && (
            <MPText style={styles.notificationText}>
              <MPText style={styles.notificationTextEmpth}>{composerName}</MPText> indicou  
              <MPText style={styles.notificationTextEmpth}>{artistName}</MPText>
            </MPText>
          )
        }
        {
          notification.type == '4' && (
            <MPText style={styles.notificationText}>
              <MPText style={styles.notificationTextEmpth}>{artistName}</MPText> comentou em    
              <MPText style={styles.notificationTextEmpth}>{songName}</MPText>
            </MPText>
          )
        }
        {
          notification.type == '5' && (
            <MPText style={styles.notificationText}>
              <MPText style={styles.notificationTextEmpth}>{composerName}</MPText> postou uma música: 
              <MPText style={styles.notificationTextEmpth}> {songName}</MPText>
            </MPText>
          )
        }*/}
        <MPText style={styles.notificationTimeLeft}>{notification.time}</MPText> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent:{
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection:'row',
    borderBottomWidth: 1,
    borderColor:'#d3d3d3'
  },
  notificationText: {
    fontSize: 16,
    color: '#9b9b9b',
    fontFamily: 'ProbaPro-Regular',
    textAlign: 'left',
    flexWrap: 'wrap',
    flex: 1,
    marginEnd: 15,
    alignSelf: 'center'
  },
  notificationTextEmpth: {
    color:'#4a90e2',
    textDecorationLine: 'underline',
  },
  notificationTimeLeft: {
    fontSize: 11,
    color: '#4a4a4a',
    textAlign: 'right',
    fontFamily: 'Montserrat-SemiBold',
    alignSelf: 'center',
  }
});

export {MPFeedNotification};
