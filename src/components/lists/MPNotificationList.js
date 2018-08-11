import React from 'react';
import {
  Image,
  StyleSheet,
  View
} from 'react-native';
import { MPText } from '../../components';
import { connect } from 'react-redux';

class MPNotificationListComponent extends React.Component {

  render() {
    let { item } = this.props;
    let notificationType = item.type.split("\\")[item.type.split("\\").length - 1];
    let types = [
      'AlertIndicationYourSongNotification',
      'AlertFaqNotification',
      'AlertFollowingMeNotification',
      'AlertIndicationMeNotification'
    ]
    return (
        <View style={styles.item}>
          <View style={styles.boxIcon}>
            <Image source={require('../../../assets/images/avatar.png')} />
          </View>
          {
            notificationType == types[0] && (
              <MPText style={styles.notificationText}>
                <MPText style={styles.notificationTextEmpth}>{item.data.userLogged.name}</MPText> indicou a sua música
                <MPText style={styles.notificationTextEmpth}> {item.data.song.name}</MPText> para 
                <MPText style={styles.notificationTextEmpth}> {item.data.artistIndicate.name}</MPText>
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
          {/* {
            notificationType == types[3] && (
              <MPText style={styles.notificationText}>
                <MPText style={styles.notificationTextEmpth}>{item.data.users.name}</MPText> te indicou para música
                <MPText style={styles.notificationTextEmpth}> {item.data.song.name}</MPText>
              </MPText>
            )
          } */}
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
