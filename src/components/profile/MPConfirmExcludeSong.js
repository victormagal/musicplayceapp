import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
    MPText,
  MPGradientButton,
  MPExcludedSong,
  MPLoading
} from '../../components';
import { removeSong } from '../../state/action';


class MPConfirmExcludeSongComponent extends React.Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.songRemoveSuccess){
      this.props.navigation.navigate('message', {component: MPExcludedSong});
    }
  }

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleRemoveSong = () => {
    let {song} = this.props.navigation.state.params;
    this.props.dispatch(removeSong(song.id))
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={ styles.title }>Tem certeza que deseja excluir sua música?</MPText>
        <MPText style={ styles.subTitle }>Não será possível resgatar as indicações e outras interações que você teve com essa música. Caso queira, poderá cadastrá-la novamente e recomeçar uma interação do zero.</MPText>
        <MPGradientButton style={ styles.button } title={'Sim, excluir música'}   textSize={16} onPress={this.handleRemoveSong}/>
        <MPGradientButton style={ styles.button } title={'Não, manter ativa'} textSize={16} onPress={this.handleBack}/>
        <MPLoading visible={this.props.loading} />
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
  subTitle: {
    marginHorizontal: 20,
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

const MPConfirmExcludeSong = connect(mapStateToProps)(MPConfirmExcludeSongComponent);
export { MPConfirmExcludeSong };
