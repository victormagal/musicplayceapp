import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { MPGradientButton, MPHeader, MPFooter, MPSongInfo, MPText } from '../../../components'
import { connect } from 'react-redux';

class UploadMediaEmptyScreenContainer extends React.Component {

  goToScreen = (route) => {
    this.props.navigation.navigate(route);
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Hora de fazer sucesso"} />
        <ScrollView style={styles.scroll}>
            <View style={ {flex: 1}}>
              <View>
                <MPText style={styles.headerTitle}>Mostre pra todo mundo o que você faz de melhor.</MPText>
                <MPText style={ styles.headerText}>Upload de melodia</MPText>
              </View>
              <View>
                <MPGradientButton title='Escolher o arquivo' onPress={ () => {} } textSize={16} style={ {marginBottom: 10, marginHorizontal: 20} } />
                <MPText style={ styles.subText}>Você pode fazer upload de músicas em MP3 ou AAC.</MPText>

                <View style={ styles.horizontalContainer }>
                  <MPSongInfo title={'Qual é o título da música?'} info={''} onPress={this.goToScreen.bind(this, 'TitleScreen')}/>
                  <MPSongInfo title={'Qual é a letra?'} info={''} onPress={this.goToScreen.bind(this, 'MusicLetterScreen')}/>
                  <MPSongInfo title={'Quais as categorias e estilos que combinam?'} info={''} onPress={this.goToScreen.bind(this, 'StylesScreen')}/>
                  <MPSongInfo title={'Fale um pouquinho mais sobre sua música?'} info={'*Opcional'} onPress={this.goToScreen.bind(this, 'MusicDescriptionScreen')}/>
                  <MPSongInfo title={'Tem outros autores?'} info={''} onPress={this.goToScreen.bind(this, 'ArtistsScreen')}/>
                  <MPSongInfo title={'Tem intérpretes?'} info={'*Opcional'} onPress={this.goToScreen.bind(this, 'RegisterArtistsScreen')}/>
                  <MPSongInfo style={{alignSelf: 'stretch'}} title={'Tem intérpretes?'} info={'*Opcional'} onPress={this.goToScreen.bind(this, 'FolderScreen')}/>
                </View>
                <MPGradientButton title='Publicar' onPress={ this.goToScreen.bind('ConfirmationScreen') } textSize={16} style={ {marginBottom: 20, marginHorizontal: 20} } />
                <View style={styles.clickableTextContainer}>
                  <MPText style={styles.clickableText} >Terminar depois</MPText>
                </View> 
              </View>
            </View>
        </ScrollView>
        <MPFooter />
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
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between' 
  },
  headerTitle: {
    fontSize: 16,
    marginHorizontal: 70,
    color: '#000',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'montSerrat',
  },
  headerText: {
    fontSize: 16,
    color: '#000',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'montSerrat',
  },
  subText: {
    fontSize: 12,
    color: '#686868',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'montSerrat',
  },
  clickableTextContainer: {
    alignItems: 'center',
  },
  clickableText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#5994db',
    fontSize: 14,
    fontFamily: 'montSerrat',
  }
});

const mapStateToProps = ({ songsReducer }) => {
  return {...songsReducer};
};
const UploadMediaEmptyScreen = connect(mapStateToProps)(UploadMediaEmptyScreenContainer);
export {UploadMediaEmptyScreen};
