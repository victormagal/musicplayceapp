import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'
import { MPGradientButton, MPHeader, MPFooter, MPSongInfo } from '../../components'
import { TextField } from 'react-native-material-textfield';
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
        {
          this.props.fontLoaded ? (
            <View style={ {flex: 1}}>
              {/* <View style={ styles.topIndicator}>
                <View style={ styles.topIndicatorDone}></View>
                <View style={ styles.topIndicatorLeft}></View>
              </View> */}
              <View>
                <Text style={styles.headerTitle}>Mostre pra todo mundo o que você faz de melhor.</Text>
                <Text style={ styles.headerText}>Upload de melodia</Text>
              </View>
              <View>
                <MPGradientButton title='Escolher o arquivo' onPress={ () => {} } textSize={16} style={ {marginBottom: 10, marginHorizontal: 20} } />
                <Text style={ styles.subText}>Você pode fazer upload de músicas em MP3 ou AAC.</Text>

                <View style={ styles.horizontalContainer }>
                  <MPSongInfo title={'Qual é o título da música?'} info={''} onPess={() => {}} />
                  <MPSongInfo title={'Qual é a letra?'} info={''} onPess={() => {}} />
                  <MPSongInfo title={'Quais as categorias e estilos que combinam?'} info={''} onPess={() => {}} />
                  <MPSongInfo title={'Fale um pouquinho mais sobre sua música?'} info={'*Opcional'} onPess={() => {}} />
                  <MPSongInfo title={'Tem outros autores?'} info={''} onPess={() => {}} />
                  <MPSongInfo title={'Tem intérpretes?'} info={'*Opcional'} onPess={() => {}} />
                </View>
                <View style={ {flex: 1, marginHorizontal: 10, alignItems: 'stretch'} }>
                  <MPSongInfo title={'Tem intérpretes?'} info={'*Opcional'} onPess={() => {}} />
                </View>

                {/* <View style={ styles.textFieldsVerticalContainer }>
                  <View style={  styles.textFieldsHorizontalContainer}>
                    <View style={ styles.textFieldsInnerContainer}>
                      <TextField
                      titleTextStyle={{color: '#000'}}
                      lineWidth={0}
                      label='Qual é o título da música?'
                      value={this.props.song.name}
                      labelFontSize={12}
                      baseColor={'#000'}
                      textColor={'#686868'}
                      labelTextStyle={{ fontFamily: 'montSerrat' }}
                      titleTextStyle={{ fontFamily: 'montSerrat' }}
                      onFocus={ this.goToScreen.bind( this, 'TitleScreen')} />
                    </View>
                    <View style={ styles.textFieldsInnerContainer}>
                      <TextField
                      labelTextStyle={{color: '#000'}}
                      lineWidth={0}
                      label='Qual é a letra?'
                      value={this.props.song.letter}
                      labelFontSize={12}
                      baseColor={'#000'}
                      textColor={'#686868'}
                      labelTextStyle={{ fontFamily: 'montSerrat' }}
                      titleTextStyle={{ fontFamily: 'montSerrat' }}
                      onFocus={ this.goToScreen.bind( this, 'MusicLetterScreen')} />
                    </View>
                  </View>
                  <View style={  styles.textFieldsHorizontalContainer}>
                    <View style={ styles.textFieldsInnerContainer}>
                      <TextField
                      lineWidth={0}
                      label='Quais as categorias e estilos que combinam?'
                      value={this.props.song.genres}
                      labelFontSize={12}
                      baseColor={'#000'}
                      textColor={'#686868'}
                      labelTextStyle={{ fontFamily: 'montSerrat' }}
                      titleTextStyle={{ fontFamily: 'montSerrat' }}
                      onFocus={ this.goToScreen.bind( this, 'StylesScreen')} />
                    </View>
                    <View style={ styles.textFieldsInnerContainer}>
                      <TextField
                      lineWidth={0}
                      label='Fale um pouquinho mais sobre a música'
                      value={'*Opcional' || this.props.song.description}
                      labelFontSize={12}
                      baseColor={'#000'}
                      textColor={'#686868'}
                      labelTextStyle={{ fontFamily: 'montSerrat' }}
                      titleTextStyle={{ fontFamily: 'montSerrat' }}
                      onFocus={ this.goToScreen.bind( this, 'MusicDescriptionScreen')} />
                    </View>
                  </View>
                  <View style={  styles.textFieldsHorizontalContainer}>
                    <View style={ styles.textFieldsInnerContainer}>
                      <TextField
                      lineWidth={0}
                      label='Tem outros autores?'
                      value={this.props.song.authors}
                      labelFontSize={12}
                      baseColor={'#000'}
                      textColor={'#686868'}
                      labelTextStyle={{ fontFamily: 'montSerrat' }}
                      titleTextStyle={{ fontFamily: 'montSerrat' }}
                      onFocus={ this.goToScreen.bind( this, 'ArtistsScreen')} />
                    </View>
                    <View style={ styles.textFieldsInnerContainer}>
                      <TextField
                      lineWidth={0}
                      label='Tem outros intérpretes?'
                      value={'*Opcional' || this.props.song.interpreters}
                      labelFontSize={12}
                      baseColor={'#000'}
                      textColor={'#686868'}
                      labelTextStyle={{ fontFamily: 'montSerrat' }}
                      titleTextStyle={{ fontFamily: 'montSerrat' }}
                      onFocus={ this.goToScreen.bind( this, 'RegisterArtistsScreen')} />
                    </View>
                  </View>
                  <View style={  styles.textFieldsHorizontalContainer}>
                    <View style={ styles.textFieldsInnerContainer}>
                      <TextField
                      lineWidth={0}
                      label='Organize sua música em pastas'
                      value={'*Opcional' || this.props.song.folders}
                      labelFontSize={12}
                      baseColor={'#000'}
                      textColor={'#686868'}
                      labelTextStyle={{ fontFamily: 'montSerrat' }}
                      titleTextStyle={{ fontFamily: 'montSerrat' }}
                      onFocus={ this.goToScreen.bind( this, 'FolderScreen')} />
                    </View>
                  </View>
                </View> */}
                <MPGradientButton title='Publicar' onPress={ this.goToScreen.bind('ConfirmationScreen') } textSize={16} style={ {marginBottom: 20, marginHorizontal: 20} } />
                <View style={styles.clickableTextContainer}>
                  <Text style={styles.clickableText} >Terminar depois</Text>
                </View> 
              </View>
            </View>
          ) : null
        }
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
    marginHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between' 
  },
  topIndicator: {
    height: 7,
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'stretch',
    backgroundColor: '#d8d8d8',
    marginBottom: 20,
  },
  topIndicatorDone: {
    height: 7,
    flex: 1,
    backgroundColor: '#e13223',
  },
  topIndicatorLeft: {
    height: 7,
    flex: 19,
    backgroundColor: '#d8d8d8',
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
  },
  textFieldsVerticalContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'stretch',
    marginTop: 20,
    marginBottom: 10
  },
  textFieldsHorizontalContainer:{
    flexDirection: 'row',
    alignContent: 'space-between',
    flex: 1,
  },
  textFieldsInnerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    height: 78,
    marginBottom: 10,
    marginStart: 5,
    marginEnd: 5,
    borderRadius: 4,
    padding: 10
  }
});

const mapStateToProps = ({ fontReducer, songsReducer }) => {
  return { ...fontReducer, ...songsReducer};
};
const UploadMediaEmptyScreen = connect(mapStateToProps)(UploadMediaEmptyScreenContainer);
export {UploadMediaEmptyScreen};
