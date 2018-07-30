import React from 'react';
import { connect } from 'react-redux';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { MPGradientButton, MPHeader, MPSongInfo, MPText, MPLoading } from '../../../components'
import { MPSongUploadIcon } from '../../../assets/svg';
import { createPermanentSong, updatePermanentSong } from "../../../state/songs/songsAction";
import { updateSongRegisterData } from "../../../state/songs/songsType";

class RegisterSongContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      songFile: null,
      progressContentWidth: 0,
      cardErrors: {
        name: false,
        lyrics: false
      }
    };

    if (props.navigation.state && props.navigation.state.params) {
      const { song } = props.navigation.state.params;
      this.props.dispatch(updateSongRegisterData(song));
    }
  }

  componentWillReceiveProps(nextProps){
    const songKeys = Object.keys(nextProps.song);
    const total = songKeys.length;
    let count = 0;

    for (const key of songKeys){
      if (nextProps.song[key]){
        count++;
      }
    }

    const width = (count * 100) / total;
    this.setState({ progressContentWidth: `${Math.ceil(width)}%` });

    if (this.props.songPublishSuccess !== nextProps.songPublishSuccess){
      this.goToScreen('ConfirmationScreen');
    }
  }

  goToScreen = (route) => {
    this.props.navigation.navigate(route);
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handlePublishClick = () => {
    const { songFile } = this.state;
    let { song, dispatch } = this.props;
    const valid = this.validate();
    delete song.coAuthors;

    if (valid) {
      song.created_at
        ? dispatch(updatePermanentSong(song, songFile))
        : dispatch(createPermanentSong(song, songFile));
    }
  };

  handleFinishLaterClick = () => {
    const isValid = this.validate();
    if (isValid) {
      this.goToScreen('SaveDraftScreen');
    }
  };

  handleChooseFileClick = () => {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.audio()],
    },(something, response) => {
      console.log(something);
      console.log(response);
      this.setState({ songFile: response })
    });
  };

  validate(){
    const { cardErrors } = this.state;
    const { song } = this.props;
    let valid = true;

    for(const key in cardErrors){
      cardErrors[key] = !song[key];
      if(cardErrors[key]){
        valid = false;
      }
    }

    this.setState({ cardErrors });

    //TODO: handle file validation if exists file
    return valid;
  }

  getProgressStyle = () => {
    let style = {...StyleSheet.flatten(styles.progressContent)};
    style.width = this.state.progressContentWidth;
    return style;
  };

  getFilledString(key){
    const { song } = this.props;
    if(song[key]){
      return song[key].map(i => i.name).slice(0, 2).join(", ");
    }
  }

  render() {
    const { song } = this.props;
    const { cardErrors } = this.state;
    return (
      <View style={styles.container}>
        <MPHeader
          back={true}
          onBack={this.handleBackClick}
          title="Hora de fazer sucesso"
        />
        <View style={styles.progressContainer}>
          <View style={this.getProgressStyle()}/>
        </View>
        <ScrollView style={styles.scroll}>
            <View style={ {flex: 1}}>
              <View>
                <MPText style={styles.headerTitle}>
                  Mostre pra todo mundo o que você faz de melhor.
                </MPText>
                <MPText style={ styles.headerText}>
                  Upload de melodia
                </MPText>
              </View>
              <View>
                <View style={{
                  padding: cardErrors.path ? 15 : 0,
                  borderWidth: 2,
                  borderColor: cardErrors.path ? '#e13223' : '#FFF'
                }}>
                  <MPGradientButton
                    style={styles.uploadIcon}
                    icon={MPSongUploadIcon}
                    title={this.state.songFile || song.path !== '' ? 'Trocar o arquivo' : 'Escolher o arquivo'}
                    textSize={16}
                    onPress={this.handleChooseFileClick}
                  />
                  <MPText style={ styles.subText}>
                    {this.state.songFile
                      ? this.state.songFile.fileName
                      : 'Você pode fazer upload de músicas em MP3 ou AAC.'}
                  </MPText>
                </View>
                <View style={ styles.horizontalContainer }>
                  <MPSongInfo
                    style={styles.songItem}
                    invalid={cardErrors.name}
                    selected={!!song.name}
                    title={'Qual é o título da música?'}
                    info={song.name}
                    onPress={() => this.goToScreen('TitleScreen')}
                  />
                  <MPSongInfo
                    style={styles.songItem}
                    invalid={cardErrors.lyrics}
                    selected={!!song.lyrics}
                    title={'Qual é a letra?'}
                    info={song.lyrics}
                    onPress={() => this.goToScreen('MusicLetterScreen')}
                  />
                  <MPSongInfo
                    style={styles.songItem}
                    invalid={cardErrors.tags}
                    selected={song.tags && song.tags.length > 0}
                    title={'Quais as categorias e estilos que combinam?'}
                    info={this.getFilledString('tags')}
                    onPress={() => this.goToScreen('StylesScreen')}
                  />
                  <MPSongInfo
                    style={styles.songItem}
                    title={'Fale um pouquinho mais sobre sua música?'}
                    selected={!!song.description}
                    info={song.description}
                    placeholder={'*Opcional'}
                    onPress={() => this.goToScreen('MusicDescriptionScreen')}
                  />
                  <MPSongInfo
                    style={styles.songItem}
                    invalid={cardErrors.coAuthors}
                    selected={song.coAuthors && song.coAuthors.length > 0}
                    title={'Tem outros autores?'}
                    info={this.getFilledString('coAuthors')}
                    onPress={() => this.goToScreen('ArtistsScreen')}
                  />
                  <MPSongInfo
                    title={'Tem intérpretes?'}
                    style={styles.songItem}
                    selected={!!song.interpreter_name}
                    info={song.interpreter_name}
                    placeholder={'*Opcional'}
                    onPress={() => this.goToScreen('InterpreterScreen')}
                  />
                </View>
                <View style={ styles.horizontalFolder }>
                  <MPSongInfo
                    title={(song.folder && 'Pasta') || 'Organize suas músicas em pastas'}
                    placeholder={'*Opcional'}
                    selected={song.folder && typeof song.folder.name !== 'undefined'}
                    info={(song.folder && song.folder.name) || '' }
                    onPress={() => this.goToScreen('FolderScreen')}
                  />
                </View>
                <MPGradientButton
                  title={song.published_at ? 'Republicar' : 'Publicar'}
                  onPress={this.handlePublishClick}
                  textSize={16}
                  style={styles.publishButton}
                />
                { (song.published_at === null || song.unpublished_at !== null) &&
                  <TouchableOpacity style={styles.clickableTextContainer} onPress={this.handleFinishLaterClick}>
                    <MPText style={styles.clickableText} >
                      Terminar depois
                    </MPText>
                  </TouchableOpacity>
                }
              </View>
            </View>
        </ScrollView>
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
  scroll: {
    flex: 2,
  },
  horizontalContainer: {
    flex: 2,
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between' 
  },
  horizontalFolder: {
    marginHorizontal: 10,
    marginBottom: 10
  },
  headerTitle: {
    fontSize: 16,
    paddingTop: 20,
    marginHorizontal: 70,
    color: '#000',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
  },
  headerText: {
    fontSize: 16,
    color: '#000',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Montserrat-Regular',
  },
  subText: {
    marginTop: 10,
    fontSize: 12,
    color: '#686868',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  songItem: {
    width: '46%'
  },
  clickableTextContainer: {
    height: 32,
    marginBottom: 32,
    alignItems: 'center',
  },
  clickableText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#5994db',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  uploadIcon: {
    marginHorizontal: 40
  },
  progressContainer: {
    backgroundColor: '#d8d8d8',
    width: '100%',
    height: 7
  },
  progressContent:{
    height: 7,
    backgroundColor: '#e13223'
  },
  publishButton: {
    marginBottom: 20,
    marginHorizontal: 20
  }
});

const mapStateToProps = ({ songsReducer }) => {
  return {...songsReducer};
};

const RegisterSongScreen = connect(mapStateToProps)(RegisterSongContainer);
export {RegisterSongScreen};
