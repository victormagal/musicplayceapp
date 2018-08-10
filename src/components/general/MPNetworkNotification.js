import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MPFloatingNotification} from './MPFloatingNotification';
import {MPConnectionIcon} from '../../assets/svg';
import {hideNetworkError} from '../../state/action';


class MPNetworkNotificationComponent extends Component {

  timerError = null;

  componentWillReceiveProps(nextProps){
    if(nextProps.showError) {
      this.timerError = setTimeout(() => {
        this.props.dispatch(hideNetworkError());
        clearTimeout(this.timerError);
      }, 4000);
    }
  }

  componentWillUnmount(){
    if(this.timerError){
      clearTimeout(this.timerError);
    }
  }

  render(){
    return <MPFloatingNotification visible={this.props.showError} icon={<MPConnectionIcon />} text="Sem conexão com a internet"/>
  }
}

const mapStateToProps = ({generalReducer}) => {
  return {...generalReducer};
};
const MPNetworkNotification = connect(mapStateToProps)(MPNetworkNotificationComponent);
export {MPNetworkNotification};
