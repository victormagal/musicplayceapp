import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'
import { MPGradientButton, MPHeader, MPFooter, MPSongInfo } from '../../components'
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';

class UploadMediaFilledScreenContainer extends React.Component {
  constructor(props){
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
            <View>
              {/* <View style={ styles.topIndicator}>
                <View style={ styles.topIndicatorDone}></View>
                <View style={ styles.topIndicatorLeft}></View>
              </View> */}
              <View>
                <Text style={styles.headerTitle}>Mostre pra todo mundo o que você faz de melhor.</Text>
                <Text style={ styles.headerText}>Melodia selecionada</Text>
              </View>
              <View>
                <MPGradientButton title='Nome da música.mp3' textSize={16} onPress={ () => {} } textSize={16} style={ {marginBottom: 10, marginHorizontal: 20} } />
                <View style={styles.clickableTextContainer}>
                  <Text style={styles.clickableText}>Substituir arquivo</Text>
                </View> 

                <View style={ styles.horizontalContainer }>
                  <MPSongInfo selected={true} title={'Qual é o título da música?'} info={'Camaro Amarelo'} onPress={this.goToScreen.bind(this, 'TitleScreen')} />
                  <MPSongInfo selected={true} title={'Qual é a letra?'} info={'Você de lá e eu de cá, Olhando o céu...'} onPress={this.goToScreen.bind(this, 'MusicLetterScreen')}/>
                  <MPSongInfo selected={true} title={'Quais as categorias e estilos que combinam?'} info={'Sertanejo, Galope, Amor, Balada'} onPress={this.goToScreen.bind(this, 'StylesScreen')}/>
                  <MPSongInfo selected={true} title={'Fale um pouquinho mais sobre sua música?'} info={'Escute essa música de tal jeito.'} onPress={this.goToScreen.bind(this, 'MusicDescriptionScreen')}/>
                  <MPSongInfo selected={true} title={'Tem outros autores?'} info={'Almir Sater'} onPress={this.goToScreen.bind(this, 'ArtistsScreen')}/>
                  <MPSongInfo selected={true} title={'Tem intérpretes?'} info={'Não teve'} onPress={this.goToScreen.bind(this, 'RegisterArtistsScreen')}/>
                  <MPSongInfo selected={true} style={{alignSelf: 'stretch'}} title={'Tem intérpretes?'} info={'Falando de amor'} onPress={this.goToScreen.bind(this, 'FolderScreen')}/>
                </View>

                {/* <View style={ styles.textFieldsVerticalContainer }>
                  <View style={  styles.textFieldsHorizontalContainer}>
                    <View style={ styles.textFieldsInnerContainer}>
                      <TextField
                      titleTextStyle={{color: '#000'}}
                      inputContainerStyle={{flexWrap: 'wrap'}}
                      lineWidth={0}
                      label='Qual é o título da música?'
                      value={this.state.titleText}
                      labelFontSize={12}
                      baseColor={'#000'}
                      textColor={'#686868'}
                      onChangeText={(titleText) => this.setState({titleText})}/>
                      <Icon name='check-circle' color='#f00' size={18} containerStyle={ styles.stretchedArtistSelectedIcon }/>
                    </View>
                    <View style={ styles.textFieldsInnerContainer}>
                      <TextField
                      labelTextStyle={{color: '#000'}}
                      inputContainerStyle={{flexWrap: 'wrap'}}
                      lineWidth={0}
                      label='Qual é a letra?'
                      value={this.state.letterText}
                      labelFontSize={12}
                      baseColor={'#000'}
                      textColor={'#686868'}
                      onChangeText={(letterText) => this.setState({letterText})}/>
                      <Icon name='check-circle' color='#f00' size={18} containerStyle={ styles.stretchedArtistSelectedIcon }/>
                    </View>
                  </View>
                  <View style={  styles.textFieldsHorizontalContainer}>
                    <View style={ styles.textFieldsInnerContainer}>
                      <TextField
                      lineWidth={0}
                      label='Quais as categorias e estilos que combinam?'
                      value={this.state.stilesText}
                      labelFontSize={12}
                      baseColor={'#000'}
                      textColor={'#686868'}
                      onChangeText={(stilesText) => this.setState({stilesText})}/>
                      <Icon name='check-circle' color='#f00' size={18} containerStyle={ styles.stretchedArtistSelectedIcon }/>
                    </View>
                    <View style={ styles.textFieldsInnerContainer}>
                      <TextField
                      lineWidth={0}
                      label='Fale um pouquinho mais sobre a música'
                      value={this.state.decriptionText}
                      labelFontSize={12}
                      baseColor={'#000'}
                      textColor={'#686868'}
                      onChangeText={(decriptionText) => this.setState({decriptionText})}/>
                      <Icon name='check-circle' color='#f00' size={18} containerStyle={ styles.stretchedArtistSelectedIcon }/>
                    </View>
                  </View>
                  <View style={  styles.textFieldsHorizontalContainer}>
                    <View style={ styles.textFieldsInnerContainer}>
                      <TextField
                      lineWidth={0}
                      label='Tem outros autores?'
                      value={this.state.authorsText}
                      labelFontSize={12}
                      baseColor={'#000'}
                      textColor={'#686868'}
                      onChangeText={(authorsText) => this.setState({authorsText})}/>
                      <Icon name='check-circle' color='#f00' size={18} containerStyle={ styles.stretchedArtistSelectedIcon }/>
                    </View>
                    <View style={ styles.textFieldsInnerContainer}>
                      <TextField
                      lineWidth={0}
                      label='Tem outros intérpretes?'
                      value={this.state.interpretersText}
                      labelFontSize={12}
                      baseColor={'#000'}
                      textColor={'#686868'}
                      onChangeText={(interpretersText) => this.setState({interpretersText})}/>
                      <Icon name='check-circle' color='#f00' size={18} containerStyle={ styles.stretchedArtistSelectedIcon }/>
                    </View>
                  </View>
                  <View style={  styles.textFieldsHorizontalContainer}>
                    <View style={ styles.textFieldsInnerContainer}>
                      <TextField
                      lineWidth={0}
                      label='Organize sua música em pastas'
                      value={this.state.folderText}
                      labelFontSize={12}
                      baseColor={'#000'}
                      textColor={'#686868'}
                      onChangeText={(folderText) => this.setState({folderText})}/>
                      <Icon name='check-circle' color='#f00' size={18} containerStyle={ styles.stretchedArtistSelectedIcon }/>
                    </View>
                  </View>
                </View> */}
                <MPGradientButton title='Publicar' onPress={ this.goToScreen.bind(this, 'ConfimationScreen') } textSize={16} style={ {marginBottom: 20, marginHorizontal: 30} } />
                <View style={styles.clickableTextContainer}>
                  <Text style={styles.clickableText}>Terminar depois</Text>
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
    justifyContent: 'flex-end'
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
const mapStateToProps = ({ fontReducer, songsReducer }) => {
  return { ...fontReducer, ...songsReducer};
};
const UploadMediaFilledScreen = connect(mapStateToProps)(UploadMediaFilledScreenContainer);
export {UploadMediaFilledScreen};