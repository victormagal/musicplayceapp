import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {MPFloatingNotification} from './MPFloatingNotification';
import {MPPlusArtistAvatarRedIcon} from '../../assets/svg';
import {userHiddenNotification} from '../../state/user/userTypes';

const labels = {
  followSuccess: 'Seguindo o artista',
  stopFollowSuccess: 'Parou de seguir o artista'
};

class MPUserNotificationComponent extends Component {

  timerSuccess = null;
  state = {
    visible: false,
    text: ''
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.followSuccess || nextProps.stopFollowSuccess) {
      this.setupNotification(nextProps);
      this.timerSuccess = setTimeout(() => {
        this.setState({visible: false});
        this.props.dispatch(userHiddenNotification());
        clearTimeout(this.timerSuccess);
      }, 3000);
    }
  }

  componentWillUnmount(){
    if(this.timerSuccess){
      clearTimeout(this.timerSuccess);
    }
  }

  setupNotification(nextProps){
    let key = '';

    if(nextProps.followSuccess){
      key = 'followSuccess';
    }

    if(nextProps.stopFollowSuccess){
      key = 'stopFollowSuccess';
    }

    this.setState({visible: true, text: this.getText(key)});
  }

  getText(key){
    return labels[key];
  }

  render(){
    return <MPFloatingNotification visible={this.state.visible} icon={<MPPlusArtistAvatarRedIcon style={styles.icon}/>} text={this.state.text}/>
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32
  }
});

const mapStateToProps = ({userReducer}) => {
  return {...userReducer};
};
const MPUserNotification = connect(mapStateToProps)(MPUserNotificationComponent);
export {MPUserNotification};
