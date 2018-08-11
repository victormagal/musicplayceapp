import React from 'react';
import {connect} from 'react-redux';
import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {MPGradientButton, MPHeader, MPSongInfo, MPText, MPLoading} from '../../../components'
import {MPSongUploadIcon, MPSongUploadEditIcon, MPCameraIcon} from '../../../assets/svg';
import {createPermanentSong, updatePermanentSong, fetchOneSong} from "../../../state/action";
import {updateSongRegisterData} from "../../../state/songs/songsType";
import ImagePicker from "react-native-image-picker";


class RegisterSongContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      shouldFetchSong: false,
      songFile: null,
      imageFile: null,
      progressContentWidth: 0,
      errors: {},
      cardErrors: {
        name: false,
        lyrics: false,
        tags: false,
        coAuthors: false,
        songFile: false,
        imageFile: false,
      },
      draftErrors: {
        name: false,
      }
    };
  }

  componentDidMount(){
    if (this.props.navigation.state && this.props.navigation.state.params) {
      const {song} = this.props.navigation.state.params;
      this.setState({shouldFetchSong: true});
      this.props.dispatch(fetchOneSong(song));
    }
  }

  componentWillReceiveProps(nextProps) {
    const songKeys = Object.keys(nextProps.song);
    const total = songKeys.length;
    let count = 0;

    for (const key of songKeys) {
      if (nextProps.song[key]) {
        count++;
      }
    }

    const width = (count * 100) / total;
    this.setState({progressContentWidth: `${Math.ceil(width)}%`});

    if (nextProps.songPublishSuccess) {
      this.goToScreen('ConfirmationScreen');
    }

    if(nextProps.fetchedSong && this.state.shouldFetchSong){
      this.props.dispatch(updateSongRegisterData(nextProps.fetchedSong));
      this.setState({shouldFetchSong: false});
    }
  }

  goToScreen = (route) => {
    this.props.navigation.navigate(route);
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handlePublishClick = () => {
    const { songFile, imageFile, cardErrors } = this.state;
    let {song, dispatch} = this.props;
    const valid = this.validate(cardErrors);

    if (valid) {
      song.created_at
        ? dispatch(updatePermanentSong(song, songFile, imageFile))
        : dispatch(createPermanentSong(song, songFile, imageFile));
    }
  };

  handleFinishLaterClick = () => {
    let {draftErrors} = this.state;
    const isValid = this.validate(draftErrors);
    if (isValid) {
      let {song} = this.props;
      this.goToScreen('SaveDraftScreen', {song});
    }
  };

  handlePlaySongClick = () => {
    ///TODO: play music?
    console.log("TODO: play music?");
  };

  handleChooseFileClick = () => {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.audio()],
    }, (something, response) => {
      if (response) {
        if (response.type) {
          response.fileName = `${response.fileName}.${response.type.split('/')[1]}`;
        }

        this.setState({songFile: response});
      }
    });
  };

  handleChooseSongPictureClick = () => {
    const options = {
      title: 'Selecionar uma imagem',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({ imageFile: response });
      }
    });
  }

  validate(errors) {
    const {song} = this.props;
    let valid = true;

    for (const key in errors) {
      errors[key] = !song[key];
      if (errors[key]) {
        valid = false;
      }
    }

    this.setState({errors});

    //TODO: handle file validation if exists file
    return valid;
  }

  getProgressStyle = () => {
    let style = {...StyleSheet.flatten(styles.progressContent)};
    style.width = this.state.progressContentWidth;
    return style;
  };

  getFilledString(key) {
    const {song} = this.props;
    if (song[key]) {
      return song[key].map(i => i.name).slice(0, 2).join(", ");
    }
  }

  getSongName() {
    const { song } = this.props;
    const { songFile } = this.state;
    return songFile ? songFile.fileName : song.name + song.path.substr(song.path.lastIndexOf('.'));
  }

  getImageName() {
    const { song } = this.props;
    const { imageFile } = this.state;

    return imageFile
      ? imageFile.fileName
      :  song.name + song.picture_url.substr(song.picture_url.lastIndexOf('.'));
  }

  render() {
    const {song} = this.props;
    const {cardErrors, errors,  songFile, imageFile} = this.state;
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
                {songFile || song.path ? 'Melodia Selecionada' : 'Upload de melodia'}
              </MPText>
            </View>
            <View>
              <View style={styles.errorCard(errors)}>
                <MPGradientButton
                  style={styles.uploadIcon}
                  icon={(songFile && songFile.fileName) || song.path ? MPSongUploadEditIcon : MPSongUploadIcon}
                  title={songFile || song.path ? this.getSongName() : 'Escolher o arquivo'}
                  textSize={16}
                  onPress={songFile || song.path ? this.handlePlaySongClick : this.handleChooseFileClick}
                />

                {!songFile && !song.path && (
                  <MPText style={ [styles.subText, errors.songFile ? {color : '#e13223'} : null]}>
                    Você pode fazer upload de músicas em MP3 ou AAC.
                  </MPText>
                )}

                {(!!songFile || !!song.path) && (
                  <TouchableOpacity onPress={this.handleChooseFileClick}>
                    <MPText style={styles.replaceSong}>
                      Substituir arquivo
                    </MPText>
                  </TouchableOpacity>
                )}
              </View>
              <MPText style={[styles.headerText, { marginTop: 10 }]}>
                {imageFile || song.picture_url ? 'Imagem de Capa Selecionada' : 'Upload de Imagem de Capa'}
              </MPText>
              <View style={styles.errorCard(errors)}>
                <MPGradientButton
                  style={styles.uploadIcon}
                  icon={MPCameraIcon}
                  title={imageFile || song.picture_url ? this.getImageName() : 'Escolher o arquivo'}
                  textSize={16}
                  onPress={this.handleChooseSongPictureClick}
                />

                {!imageFile && !song.picture_url && (
                  <MPText style={ [styles.subText, errors.imageFile ? {color: '#e13223'}: {} ]}>
                    Você pode fazer upload de imagens em JPG, JPEG e PNG.
                  </MPText>
                )}

                {(!!imageFile || !!song.picture_url) && (
                  <TouchableOpacity onPress={this.handleChooseSongPictureClick}>
                    <MPText style={styles.replaceSong}>
                      Substituir arquivo
                    </MPText>
                  </TouchableOpacity>
                )}

              </View>
              <View style={ styles.horizontalContainer }>
                <MPSongInfo
                  style={styles.songItem}
                  invalid={errors.name}
                  selected={!!song.name}
                  title={'Qual é o título da música?'}
                  info={song.name}
                  onPress={() => this.goToScreen('TitleScreen')}
                />
                <MPSongInfo
                  style={styles.songItem}
                  invalid={errors.lyrics}
                  selected={!!song.lyrics}
                  title={'Qual é a letra?'}
                  info={song.lyrics}
                  onPress={() => this.goToScreen('MusicLetterScreen')}
                />
                <MPSongInfo
                  style={styles.songItem}
                  invalid={errors.tags}
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
                  invalid={errors.coAuthors}
                  selected={song.coAuthors && song.coAuthors.length > 0}
                  title={'Tem outros autores?'}
                  info={this.getFilledString('coAuthors')}
                  onPress={() => this.goToScreen('UsersScreen')}
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
                <MPText style={styles.clickableText}>
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
    marginLeft: 20,
    marginRight: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  horizontalFolder: {
    marginLeft: 20,
    marginRight: 10,
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
  replaceSong: {
    fontSize: 14,
    height: 32,
    marginTop: 10,
    fontFamily: 'Montserrat-Regular',
    color: '#5994db',
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  songItem: {
    width: '47%'
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
  progressContent: {
    height: 7,
    backgroundColor: '#e13223'
  },
  publishButton: {
    marginBottom: 20,
    marginHorizontal: 20
  },
  errorCard: (cardErrors) => ({
    padding: cardErrors.path ? 15 : 0,
    borderWidth: 2,
    borderColor: cardErrors.path ? '#e13223' : '#FFF'
  })
});

const mapStateToProps = ({songsReducer}) => {
  return {...songsReducer};
};

const RegisterSongScreen = connect(mapStateToProps)(RegisterSongContainer);
export {RegisterSongScreen};
