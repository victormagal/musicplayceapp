import React from 'react';
import { connect } from 'react-redux';
import { Alert, StyleSheet, Text, View, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { MPGradientButton, MPHeader, MPSongInfo, MPText } from '../../../components'
import {MPSongUploadIcon} from '../../../assets/svg';


class RegisterSongContainer extends React.Component {

  state = {
    cardErros: {
      name: false,
      lyrics: false,
      coAuthors: false,
      tags: false
    },
    progressContentWidth: 0
  };

  componentWillReceiveProps(nextProps){
    let songKeys = Object.keys(nextProps.song);
    let total = songKeys.length;
    let count = 0;

    for(let key of songKeys){
      if(nextProps.song[key]){
        count++;
      }
    }

    let width = (count * 100) / total;
    this.setState({progressContentWidth: `${Math.ceil(width)}%`});
  }

  goToScreen = (route) => {
    this.props.navigation.navigate(route);
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handlePublishClick = () => {
    let {cardErros} = this.state;
    let valid = true;

    for(let key in this.state.cardErros){
      cardErros[key] = !this.props.song[key];
      if(cardErros[key]){
        valid = false;
      }
    }

    this.setState({cardErros});

    if(valid){
      //TODO: dispatch if it is saved publish song
      //this.props.dispatch(createSong(this.props.song));
      //this.goToScreen('ConfirmationScreen');
    }
  };

  handleFinishLaterClick = () => {
    if(this.validate()){
      this.goToScreen('SaveDraftScreen');
    }
  };

  handleChooseFileClick = () => {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.audio()],
    },(error,res) => {
      // Android
      console.log(
        res.uri,
        res.type, // mime type
        res.fileName,
        res.fileSize
      );
    });
  };

  validate(){
    let {cardErros} = this.state;
    let valid = true;

    for(let key in this.state.cardErros){
      cardErros[key] = !this.props.song[key];
      if(cardErros[key]){
        valid = false;
      }
    }

    this.setState({cardErros});
    return valid;
  }

  getProgressStyle(){
    let style = StyleSheet.flatten(styles.progressContent);
    style.width = this.state.progressContentWidth;
    return Object.assign({}, style);
  }

  getFilledString(key){
    if(this.props.song[key]){
      return this.props.song[key].map(i => i.name).slice(0, 2).join(", ");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title="Hora de fazer sucesso" />
        <View style={styles.progressContainer}>
          <View style={this.getProgressStyle()}/>
        </View>
        <ScrollView style={styles.scroll}>
            <View style={ {flex: 1}}>
              <View>
                <MPText style={styles.headerTitle}>Mostre pra todo mundo o que você faz de melhor.</MPText>
                <MPText style={ styles.headerText}>Upload de melodia</MPText>
              </View>
              <View>
                <MPGradientButton style={styles.uploadIcon} icon={MPSongUploadIcon} title='Escolher o arquivo'
                                  textSize={16} onPress={this.handleChooseFileClick}/>
                <MPText style={ styles.subText}>Você pode fazer upload de músicas em MP3 ou AAC.</MPText>

                <View style={ styles.horizontalContainer }>
                  <MPSongInfo style={styles.songItem} invalid={this.state.cardErros.name}
                              selected={!!this.props.song.name} title={'Qual é o título da música?'} info={this.props.song.name} onPress={this.goToScreen.bind(this, 'TitleScreen')}/>

                  <MPSongInfo style={styles.songItem} invalid={this.state.cardErros.lyrics}
                              selected={!!this.props.song.lyrics} title={'Qual é a letra?'}
                              info={this.props.song.lyrics}  onPress={this.goToScreen.bind(this, 'MusicLetterScreen')}/>

                  <MPSongInfo style={styles.songItem} invalid={this.state.cardErros.tags}
                              selected={this.props.song.tags && this.props.song.tags.length > 0}
                              title={'Quais as categorias e estilos que combinam?'} info={this.getFilledString('tags')}
                              onPress={this.goToScreen.bind(this, 'StylesScreen')}/>

                  <MPSongInfo style={styles.songItem} title={'Fale um pouquinho mais sobre sua música?'}
                              selected={!!this.props.song.description} info={this.props.song.description} placeholder={'*Opcional'}
                              onPress={this.goToScreen.bind(this, 'MusicDescriptionScreen')}/>

                  <MPSongInfo style={styles.songItem} invalid={this.state.cardErros.coAuthors}
                              selected={this.props.song.coAuthors && this.props.song.coAuthors.length > 0}
                              title={'Tem outros autores?'} info={this.getFilledString('coAuthors')}
                              onPress={this.goToScreen.bind(this, 'ArtistsScreen')}/>

                  <MPSongInfo title={'Tem intérpretes?'} style={styles.songItem}
                              selected={this.props.song.interpreter_name !== ''}
                              info={this.props.song.interpreter_name}
                              placeholder={'*Opcional'} onPress={this.goToScreen.bind(this, 'InterpreterScreen')}/>
                </View>

                <View style={ styles.horizontalFolder }>
                  <MPSongInfo title={(this.props.song.folder && 'Pasta') || 'Organize suas músicas em pastas'} placeholder={'*Opcional'}
                              selected={this.props.song.folder && this.props.song.folder.name}
                              info={(this.props.song.folder && this.props.song.folder.name) || '' }
                              onPress={this.goToScreen.bind(this, 'FolderScreen')}/>
                </View>

                <MPGradientButton title='Publicar' onPress={this.handlePublishClick} textSize={16} style={styles.publishButton} />
                <TouchableOpacity style={styles.clickableTextContainer} onPress={this.handleFinishLaterClick}>
                  <MPText style={styles.clickableText} >Terminar depois</MPText>
                </TouchableOpacity>
              </View>
            </View>
        </ScrollView>
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
