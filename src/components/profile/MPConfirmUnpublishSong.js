import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  MPText,
  MPGradientButton,
  MPLoading
} from '../../components';
import {unpublishSong} from '../../state/action';
import {MPUnpublishedSong} from '../../components';

class MPConfirmUnpublishSongComponent extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.songUnpublishSuccess) {
      this.props.navigation.navigate('message', {component: MPUnpublishedSong})
    }
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleUnpublishClick = () => {
    let {song} = this.props.navigation.state.params;
    this.props.dispatch(unpublishSong(song.id));
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={ styles.title }>Confirma que deseja despublicar sua música?</MPText>
        <MPText style={ styles.subTitle }>Todas as informações sobre sua música, inclusive indicações, serão guardadas e ninguém terá acesso as informações. Caso queira reativá-la, basta republicá-la.</MPText>
        <MPGradientButton style={ styles.button } title={'Sim, despublicar música'} textSize={16}
                          onPress={this.handleUnpublishClick}/>
        <MPGradientButton style={ styles.button } title={'Não, manter ativa'} textSize={16}
                          onPress={this.handleBackClick}/>

        <MPLoading visible={this.props.loading}/>
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
    marginHorizontal: 23,
    fontSize: 24,
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  subTitle: {
    marginHorizontal: 45,
    fontSize: 16,
    fontFamily: 'ProbaPro-Regular',
    color: '#686868',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 54,
    marginBottom: 20,
  }
});

const mapStateToProps = ({songsReducer}) => {
  return {...songsReducer};
};

const MPConfirmUnpublishSong = connect(mapStateToProps)(MPConfirmUnpublishSongComponent);
export {MPConfirmUnpublishSong};
