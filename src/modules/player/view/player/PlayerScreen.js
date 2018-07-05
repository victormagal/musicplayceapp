import React from 'react';
import {connect} from 'react-redux';
import {
  View, StyleSheet
} from 'react-native';
import {MPButton} from '../../../../components';
import {PlayerComponent} from './PlayerComponent';
import {playerSongSaveReceived} from '../../../../state/action';
import {
  MPHeartRedIcon
} from '../../../../assets/svg';


class PlayerContainer extends React.Component {

  componentWillReceiveProps(nextProps){
    if(nextProps.saveSong.update){

      let timer = setTimeout(() => {
        this.props.dispatch(playerSongSaveReceived());
        clearTimeout(timer);
      }, 2000);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <PlayerComponent todo="REFACTOR" {...this.props} />
        {this.props.saveSong.update && (
          <MPButton
            style={styles.notificationSaved}
            textStyle={styles.notificationSavedText}
            title={"Salvo em " + this.props.saveSong.folder }
            onPress={() => {}} icon={MPHeartRedIcon}/>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  notificationSaved: {
    position: 'absolute',
    top: 75,
    width: '70%',
    marginLeft: '15%',
    borderRadius: 26,
    backgroundColor: '#fff'
  },
  notificationSavedText: {
    fontSize: 14,
    color: '#686868'
  }
});

const mapStateToProps = ({playerReducer}) => {
  return {...playerReducer}
};

const PlayerScreen = connect(mapStateToProps)(PlayerContainer);
export {PlayerScreen};
