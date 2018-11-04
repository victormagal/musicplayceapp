import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { MPText } from '../../components';
import { connect } from 'react-redux';

class MPNotificationListComponent extends React.Component {

  navigateToProfile = (userId) => {
    this.props.navigation.navigate('userProfile', { userId });
  }

  render() {
    let { item } = this.props;
    let notificationType = item.type.split("\\")[item.type.split("\\").length - 1];
    // console.log(notificationType);
    let types = [
      'AlertIndicationYourSongNotification',
      'AlertFaqNotification',
      'AlertFollowingMeNotification',
      'AlertIndicationMeNotification',
      'AlertIndicationMeCountNotification'
    ]
    return (
        <View style={styles.item}>
          {
            (notificationType == types[0]) && (
              <View style={styles.boxIcon}>
                <Image style={{width: 20, height: 20, borderRadius: 10, marginEnd: 10}} source={typeof item.data.userLogged.picture_url === 'string' ? {uri : item.data.userLogged.picture_url} : require('../../assets/img/avatar-male.jpg')} />
              </View>  
            )
          }
          {
            (notificationType == types[1] || notificationType == types[2] || notificationType == types[3]) && (
              <View style={styles.boxIcon}>
                <Image style={{width: 20, height: 20, borderRadius: 10, marginEnd: 10}} source={typeof item.data.users.picture_url === 'string' ? {uri : item.data.users.picture_url} : require('../../assets/img/avatar-male.jpg')} />
              </View>  
            )
          }
          {
            notificationType == types[0] && (
              <MPText style={styles.notificationText}>
                <MPText style={styles.notificationTextEmpth}>{item.data.userLogged.name}</MPText>{' indicou a sua música '}
                <MPText style={styles.notificationTextEmpth}>{item.data.song.name}</MPText>{' para '} 
                <MPText style={styles.notificationTextEmpth}>{item.data.artistIndicate.name}</MPText>
              </MPText>
            )
          }
          {
            notificationType == types[1] && (
              <MPText style={styles.notificationText}>
                <MPText style={styles.notificationTextEmpth}>{item.data.users.name}</MPText> sua pergunta já está registrada em nosso sistema.
              </MPText>
            )
          }
          {
            notificationType == types[2] && (
              <MPText style={styles.notificationText}>
                <MPText style={styles.notificationTextEmpth}>{item.data.users.name}</MPText> começou a te seguir.
              </MPText>
            )
          }
          {
            notificationType == types[3] && (
              <View>
                <View style={styles.viewNotificationText}>
                  <TouchableOpacity onPress={() => this.navigateToProfile(item.data.users.id)}>
                    <MPText style={styles.notificationTextEmpth}>{item.data.users.name}</MPText>
                  </TouchableOpacity>
                  <MPText style={styles.notificationText}>{' te indicou para música '}</MPText> 
                </View>
                <MPText style={styles.notificationTextEmpth}>{item.data.songs.name}</MPText>
              </View>

            )
          }
          {
            notificationType == types[4] && (
              <MPText style={styles.notificationText}>
                <MPText style={styles.notificationTextEmpthBlack}>{item.data.count} {item.data.count > 1 ? 'pessoas' : 'pessoa'}</MPText>{item.data.count > 1 ? ' te indicaram ' : ' te indicou '}
                <MPText style={styles.notificationTextEmpth}>{item.data.songs.name}</MPText>
              </MPText>
            )
          }
          <View style={styles.boxFoward}>
            <MPText style={styles.textTime}>
              {item.time}
            </MPText>
          </View>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(211, 211, 211, 0.5)'
  },
  boxIcon: {
    flex: 0.1,
    alignItems: 'flex-start'
  },
  boxText: {
    flex: 0.7
  },
  boxTextBig: {
    flex: 0.8
  },
  notificationText: {
    fontSize: 16,
    lineHeight: 20,
    color: '#9b9b9b',
    fontFamily: 'ProbaPro-Regular',
    textAlign: 'left',
    flexWrap: 'wrap',
    marginEnd: 15,
    alignSelf: 'center',
  },
  viewNotificationText: {
    flex: 1,
    flexDirection: 'row'
  },
  notificationTextEmpth: {
    color:'#4a90e2',
    textDecorationLine: 'underline',
  },
  notificationTextEmpthBlack: {
    color : '#171616',
  },
  boxFoward: {
    flex: 0.2,
    alignItems: 'flex-end'
  },
  textTime: {
    color: '#4A4A4A',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11
  },
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPNotificationList = connect(mapStateToProps)(MPNotificationListComponent);
export { MPNotificationList };
