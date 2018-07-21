import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
    MPText,
  MPGradientButton,
  MPHelpSuccess
} from '../../components';
import { saveProfile } from '../../state/action';
import { MPUnpublishedSong } from '../../components';

class MPChatDeletedComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleFoward = () => {
    this.props.navigation.navigate('message', {component: MPUnpublishedSong})
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={ styles.title }>Conversa apagada.</MPText>
        <MPGradientButton style={ styles.button } title={'OK'} textSize={16} onPress={this.handleBack.bind(this)}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30
  },
  title: {
    marginBottom: 20,
    marginHorizontal: 40,
    fontSize: 24,
    color : '#000',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 115,
    marginBottom: 20,
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPChatDeleted = connect(mapStateToProps)(MPChatDeletedComponent);
export { MPChatDeleted };
