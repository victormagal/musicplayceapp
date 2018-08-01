import React from 'react';
import {
  StyleSheet, 
  View,
} from 'react-native';
import { MPText } from '../../components';

class MPFeedNotification extends React.Component {

  render() {
    let {notification} = this.props;
    let notificationType = notification.type.split("\\")[notification.type.split("\\").length - 1];
    let types = ['AlertFollowingMeIndicationNotification',
      'AlertFollowersMeNotification',
      // 'AlertIndicationMeNotification',
      // 'AlertFollowingMeNotification',
      // 'AlertIndicationYourSongNotification' 
    ];
    
    return (
      <View style={styles.parent}>
        <View style={{width: 40, height: 40, backgroundColor: '#f60', marginEnd: 10}}></View>
        {
          notificationType == types[0] && (
            <MPText style={styles.notificationText}>
              <MPText style={styles.notificationTextEmpth}>{notification.data.song.name}</MPText> de
              <MPText style={styles.notificationTextEmpth}> {notification.data.artistsOwner.name}</MPText> foi indicada para 
              <MPText style={styles.notificationTextEmpth}> {notification.data.artistIndication.name}</MPText>
            </MPText>
          )
        }
        { 
          notificationType == types[1] && (
            <MPText style={styles.notificationText}>
              <MPText style={styles.notificationTextEmpth}>{notification.data.userFollower.name}</MPText> começou a seguir   
              <MPText style={styles.notificationTextEmpth}> {notification.data.artists.name}</MPText>
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
