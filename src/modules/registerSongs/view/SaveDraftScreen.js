import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { MPGradientButton, MPHeader, MPText, MPLoading, MPFloatingNotification } from '../../../components';
import {createDraftSong, removeSong, updateDraftSong} from '../../../state/action';
import {MPAlertIcon} from '../../../assets/svg';


class SaveDraftScreenContainer extends Component {

  componentWillReceiveProps(nextProps){
    if (nextProps.songDraftSuccess){
      this.props.navigation.navigate('MyProfileScreen', { backFromPublishedOrDraft: true });
    }
  }

  handleSaveDraftClick = () => {
    let {song, dispatch} = this.props;
    song.created_at ? dispatch(updateDraftSong(song)) : dispatch(createDraftSong(song));
  };

  handleRemoveSongClick = () => {
    this.props.dispatch(removeSong(this.props.song.id));
  };

  handleBack = () => {
    this.props.navigation.pop();
  };

  render() {
    const { song } = this.props;
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBack}  />
        <View style={styles.content}>
          <MPText style={styles.textTop}>
            Deseja salvar como rascunho?
          </MPText>
          <MPGradientButton
            style={styles.button}
            textSize={16}
            title="Salvar rascunho"
            onPress={this.handleSaveDraftClick}
          />
          { song.created_at &&
            <MPGradientButton
              style={styles.button}
              textSize={16}
              title="Apagar música"
              onPress={this.handleRemoveSongClick}
            />
          }
        </View>
        <MPLoading visible={this.props.loading}/>
        <MPFloatingNotification
          icon={<MPAlertIcon />}
          visible={this.props.songDraftError}
          text="Não foi possível salvar a música"/>
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
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center'
  },
  button: {
    width: 200,
    marginTop: 20,
    alignSelf: 'center'
  }
});

const mapStateToProps = ({ songsReducer }) => {
  return { ...songsReducer };
};

const SaveDraftScreen = connect(mapStateToProps)(SaveDraftScreenContainer);
export { SaveDraftScreen };
