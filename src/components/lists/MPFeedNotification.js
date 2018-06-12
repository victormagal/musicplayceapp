import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import {connect} from 'react-redux';
import {MPText} from '../../components';

class MPFeedNotificationComponent extends React.Component {
  state = {
    tabIndex: 0,
  };

  changeTabIndex = (index) => {
    this.setState({tabIndex: index});
  };

  render() {
    let {artistName, composerName, songName, notificationType, timeText} = this.props;
    return (
        <View style={styles.parent}>
            <View style={{width: 40, height: 40, backgroundColor: '#f60', marginEnd: 10,}}></View>
            {
              this.props.notificationType == '1' && (
                <MPText style={styles.notificationText}>
                  <MPText style={ styles.notificationTextEmpth}>{songName}</MPText> de 
                  <MPText style={ styles.notificationTextEmpth}> {composerName}</MPText> foi indicada para 
                  <MPText style={ styles.notificationTextEmpth}> {artistName}</MPText>
              </MPText>
              )
            }
            {
              this.props.notificationType == '2' && (
                <MPText style={styles.notificationText}>
                  <MPText style={ styles.notificationTextEmpth}>{composerName}</MPText> indicou  
                  <MPText style={ styles.notificationTextEmpth}> {artistName}</MPText>
              </MPText>
              )
            }
            {
              this.props.notificationType == '3' && (
                <MPText style={styles.notificationText}>
                  <MPText style={ styles.notificationTextEmpth}>{composerName}</MPText> começou a seguir   
                  <MPText style={ styles.notificationTextEmpth}> {artistName}</MPText>
              </MPText>
              )
            } 
            {
              this.props.notificationType == '4' && (
                <MPText style={styles.notificationText}>
                  <MPText style={ styles.notificationTextEmpth}>{artistName}</MPText> comentou em    
                  <MPText style={ styles.notificationTextEmpth}> {songName}</MPText>
              </MPText>
              )
            }
            {
              this.props.notificationType == '5' && (
                <MPText style={styles.notificationText}>
                  <MPText style={ styles.notificationTextEmpth}>{composerName}</MPText> postou uma música: 
                  <MPText style={ styles.notificationTextEmpth}> {songName}</MPText>
              </MPText>
              )
            }            
            <MPText style={styles.notificationTimeLeft}>{timeText}</MPText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent:{
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    flexDirection:'row', 
    borderTopWidth: 1, 
    borderColor:'#d3d3d3'
  },
  notificationText: {
    fontSize: 16,
    color: '#9b9b9b',
    fontFamily: 'probaProRegular',
    textAlign: 'left',
    flexWrap: 'wrap',
    marginEnd: 34,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    lineHeight: 1.25,
  },
  notificationTextEmpth: {
    color:'#4a90e2',
    textDecorationLine: 'underline',
  },
  notificationTimeLeft: {
    fontSize: 11,
    color: '#4a4a4a',
    textAlign: 'right',
    fontFamily: 'montSerratSemiBold',
    alignSelf: 'center',
  }
});

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const MPFeedNotification = connect(mapStateToProps)(MPFeedNotificationComponent);
export {MPFeedNotification};
