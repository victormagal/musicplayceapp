import React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {MPHeader, MPText, MPIconButton, MPTextField, MPSelect} from '../../../components';
import {updateSongRegisterData} from "../../../state/songs/songsType";
import {DocumentPicker, DocumentPickerUtil} from "react-native-document-picker";
import {MPSongIcon} from "../../../assets/svg";
import {MPFloatingNotification} from "../../../components/general";

class MusicLetterScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lyrics: (props.song && props.song.lyrics) || '',
      language: 'default',
      selectedOption: null,
      error: null,
      idiomas: ['Português', 'Inglês', 'Espanhol']
    };
  }

  handleChangeLetter = (lyrics) => {
    this.setState({ lyrics });
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  updateSong(propName, value){
    let {song} = this.props;
    song[propName] = value;
    this.props.dispatch(updateSongRegisterData(song));
  }

  handleChooseFileClick = () => {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    }, (something, response) => {
      if (response) {
        if (response.type === 'application/rtf' || response.type === 'text/plain') {
          this.updateSong('lyricsFile', response);
          this.setState({ error: null });
        } else {
          this.setState({ error: 'Esta extensão de arquivo não é suportada.' });
        }
      } else {
        this.setState({ error: 'Não conseguimos carregar o seu arquivo. Por favor tente novamente.' });
      }
      const timer = setTimeout(() => {
        this.setState({ error: null });
        clearTimeout(timer);
      }, 2000);
    });
  };

  handleSaveClick = () => {
    let song = {...this.props.song, lyrics: this.state.lyrics};
    this.props.dispatch(updateSongRegisterData(song));
    this.handleBackClick();
  };

  renderHeaderMenuSave() {
    return [
      <MPIconButton
        key={1}
        title="Salvar"
        titleStyle={styles.headerMenuText}
        onPress={this.handleSaveClick}
      />
    ];
  }

  render() {
    const { song } = this.props;
    return (
      <View style={styles.container}>
        <MPHeader
          back={true}
          onBack={this.handleBackClick}
          title="Letra da música"
          icons={this.renderHeaderMenuSave()}
        />
        <ScrollView style={styles.content}>
          <MPText style={styles.textTop}>
            Pode colar a letra da música aqui:
          </MPText>
          <MPTextField
            multiline={true}
            label="Letra da música"
            value={this.state.lyrics}
            onChangeText={this.handleChangeLetter}
          />
          <View style={styles.clickableTextContainer}>
            <MPText style={styles.ouText}>
              ou
            </MPText>
            <TouchableOpacity onPress={this.handleChooseFileClick}>
              <MPText style={styles.clickableText}>
                faça upload da letra (txt ou rtf)
              </MPText>
            </TouchableOpacity>
          </View>
          { (song.lyricsFile || song.lyrics_url) &&
            <MPText style={{ textAlign: 'center', fontWeight: '500', borderWidth: 1, borderRadius: 8, padding: 10 }}>
              Arquivo carregado: { song.lyricsFile
              ? song.lyricsFile.fileName
              : song.name + '.' + song.lyrics_url.substring(song.lyrics_url.lastIndexOf(".") + 1)
            }
            </MPText>
          }
          <MPSelect style={styles.idioma} label="Idioma" value={this.state.selectedOption} options={this.state.idiomas} onChangeOption={(selectedOption) => this.setState({selectedOption})} />
        </ScrollView>
        <MPFloatingNotification
          visible={this.state.error !== null}
          icon={<MPSongIcon/>}
          text={this.state.error}
        />
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
    marginTop: 30,
    marginHorizontal: 40
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    fontFamily: 'ProbaPro-Regular'
  },
  clickableTextContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 30
  },
  clickableText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#5994db',
    fontSize: 14,
    marginLeft: 6,
    fontFamily: 'Montserrat-Regular'
  },
  pickerContainer: {
    height: 46,
    marginTop: 30,
    borderColor: '#b1b1b1',
    borderBottomWidth: 1,
  },
  notEnabled: {
    backgroundColor: '#686868'
  },
  headerMenuText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#fff'
  },
  idioma: {

  },
  ouText: {
    fontFamily: 'Montserrat-Regular'
  }
});

const mapStateToProps = ({songsReducer}) => {
  return {...songsReducer}
};

const MusicLetterScreen = connect(mapStateToProps)(MusicLetterScreenContainer);
export {MusicLetterScreen};
