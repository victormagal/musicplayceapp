import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, TextInput} from 'react-native';
import {MPGradientButton, MPHeader, MPText, MPLoading} from '../../../components';
import {songRegisterClear, createSong} from '../../../state/action';



class SaveDraftScreenContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.songCreateSuccess){
      this.props.navigation.pop();
    }
  }

  handleSaveDraftClick = () => {
    this.props.dispatch(createSong(this.props.song));
  };

  handleRemoveSongClick = () => {
    this.props.dispatch(songRegisterClear());
    this.props.navigation.popToTop();
  };

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <MPHeader />
        <View style={styles.content}>
          <MPText style={styles.textTop}>Deseja salvar como rascunho?</MPText>
          <MPGradientButton style={styles.button} textSize={16} title="Salvar rascunho" onPress={this.handleSaveDraftClick}/>
          <MPGradientButton style={styles.button} textSize={16} title="Apagar música" onPress={this.handleRemoveSongClick} />
        </View>
        <MPLoading visible={this.props.loading}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  content: {
    flex: 2,
    paddingTop: 30,
  },
  textTop: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'montSerrat',
    alignSelf: 'center'
  },
  button: {
    width: 200,
    marginTop: 20,
    alignSelf: 'center'
  }
});

const mapStateToProps = ({songsReducer}) => {
  return {...songsReducer};
};

const SaveDraftScreen = connect(mapStateToProps)(SaveDraftScreenContainer);
export {SaveDraftScreen};
