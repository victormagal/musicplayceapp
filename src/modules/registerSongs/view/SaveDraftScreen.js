import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { MPGradientButton, MPHeader, MPText, MPLoading } from '../../../components';
import {createDraftSong, removeSong, updateDraftSong} from "../../../state/songs/songsAction";

class SaveDraftScreenContainer extends React.Component {
  componentWillReceiveProps(nextProps){
    if (nextProps.songDraftSuccess || nextProps.songRemoveSuccess){
      this.props.navigation.navigate('ProfileScreen', { backFromPublishedOrDraft: true });
    }
  }

  handleSaveDraftClick = () => {
    const { song, dispatch } = this.props;
    delete song.coAuthors;
    if (song.created_at){
      dispatch(updateDraftSong(song));
    } else {
      dispatch(createDraftSong(song));
    }
  };

  handleRemoveSongClick = () => {
    this.props.dispatch(removeSong(this.props.song.id));
  };

  render() {
    const { song } = this.props;
    return (
      <View style={styles.container}>
        <MPHeader />
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
