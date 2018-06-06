import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList, ScrollView} from 'react-native';
import {MPGradientButton, MPHeader, MPFooter, MPSongInfo, MPText} from '../../components'
import {connect} from 'react-redux';

class UploadMediaFilledScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: 'Camaro Amarelo',
      letterText: 'Você de lá e eu de cá. Olhando o céu...',
      stilesText: 'Sertanejo, galope, amor, balada',
      decriptionText: 'Escute essa música de tal jeito',
      authorsText: 'Almir Sater',
      interpretersText: 'Não teve',
      folderText: 'Falando de amor',
    }
  }

  goToScreen = (route) => {
    this.props.navigation.navigate(route);
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Hora de fazer sucesso"}/>
        <ScrollView style={styles.scroll}>
          <View>
            <View>
              <MPText style={styles.headerTitle}>Mostre pra todo mundo o que você faz de melhor.</MPText>
              <MPText style={ styles.headerText}>Melodia selecionada</MPText>
            </View>
            <View>
              <MPGradientButton title='Nome da música.mp3' onPress={ () => {} } textSize={16} style={ {marginBottom: 10, marginHorizontal: 20} }/>
              <View style={styles.clickableTextContainer}>
                <MPText style={styles.clickableText}>Substituir arquivo</MPText>
              </View>

              <View style={styles.horizontalContainer}>
                <MPSongInfo selected={true} title={'Qual é o título da música?'} info={'Camaro Amarelo'}
                            onPress={this.goToScreen.bind(this, 'TitleScreen')}/>
                <MPSongInfo selected={true} title={'Qual é a letra?'}
                            info={'Você de lá e eu de cá, Olhando o céu...'}
                            onPress={this.goToScreen.bind(this, 'MusicLetterScreen')}/>
                <MPSongInfo selected={true} title={'Quais as categorias e estilos que combinam?'}
                            info={'Sertanejo, Galope, Amor, Balada'}
                            onPress={this.goToScreen.bind(this, 'StylesScreen')}/>
                <MPSongInfo selected={true} title={'Fale um pouquinho mais sobre sua música?'}
                            info={'Escute essa música de tal jeito.'}
                            onPress={this.goToScreen.bind(this, 'MusicDescriptionScreen')}/>
                <MPSongInfo selected={true} title={'Tem outros autores?'} info={'Almir Sater'}
                            onPress={this.goToScreen.bind(this, 'ArtistsScreen')}/>
                <MPSongInfo selected={true} title={'Tem intérpretes?'} info={'Não teve'}
                            onPress={this.goToScreen.bind(this, 'RegisterArtistsScreen')}/>
                <MPSongInfo selected={true} style={{alignSelf: 'stretch'}} title={'Tem intérpretes?'}
                            info={'Falando de amor'} onPress={this.goToScreen.bind(this, 'FolderScreen')}/>
              </View>

              <MPGradientButton title='Publicar' onPress={ this.goToScreen.bind(this, 'ConfimationScreen') }
                                textSize={16} style={ {marginBottom: 20, marginHorizontal: 30} }/>
              <View style={styles.clickableTextContainer}>
                <MPText style={styles.clickableText}>Terminar depois</MPText>
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
    justifyContent: 'flex-end'
  },
  scroll: {
    flex: 2,
  },
  horizontalContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap'
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
    fontFamily: 'montSerrat'
  },
  clickableTextContainer: {
    alignItems: 'center',
  },
  clickableText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#5994db',
    fontSize: 14,
    fontFamily: 'montSerrat'
  }
});
const mapStateToProps = ({songsReducer}) => {
  return {...songsReducer};
};
const UploadMediaFilledScreen = connect(mapStateToProps)(UploadMediaFilledScreenContainer);
export {UploadMediaFilledScreen};
