import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'
import { MPGradientButton, MPHeader } from '../../components'
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
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Hora de fazer sucesso"} />
        <ScrollView style={styles.scroll}>
        {
          this.props.fontLoaded ? (
            <View>
              <View style={ styles.topIndicator}>
                <View style={ styles.topIndicatorDone}></View>
                <View style={ styles.topIndicatorLeft}></View>
              </View>
              <View style={{paddingStart: 50, paddingEnd: 50}}>
                <Text style={styles.headerTitle}>Mostre pra todo mundo o que você faz de melhor.</Text>
                <Text style={ styles.headerText}>Melodia selecionada</Text>
              </View>
              <View style={{paddingStart: 20, paddingEnd : 20, paddingBottom: 20}}>
                <MPGradientButton iconName={'play-circle-o'} iconType={ 'font-awesome' } title='Nome da música.mp3' textSize={16} onPress={ () => {} } textSize={16} style={ {marginBottom: 10} } />
                <View style={styles.clickableTextContainer}>
                  <Text style={styles.clickableText}>Substituir arquivo</Text>
                </View> 
                <View style={ styles.textFieldsVerticalContainer }>
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
                </View>
                <MPGradientButton title='Publicar' onPress={ () => {} } textSize={16} style={ {marginBottom: 20} } />
                <View style={styles.clickableTextContainer}>
                  <Text style={styles.clickableText}>Terminar depois</Text>
                </View> 
              </View>
            </View>
          ) : null
        }
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
    justifyContent: 'flex-end'
  },
  scroll: {
    flex: 2,
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
    flex: 0,
    backgroundColor: '#d8d8d8',
  },
  headerTitle: {
    fontSize: 16,
    paddingStart : 50,
    paddingEnd: 50,
    color: '#000',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'montSerrat',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 16,
    color: '#000',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'montSerrat',
    fontWeight: 'bold'
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
    height: 20
  },
  clickableText: {
    borderBottomWidth: 1,
    borderColor: '#5994db',
    textAlign: 'center',
    color: '#5994db',
    fontSize: 14,
    fontFamily: 'montSerrat'
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
    borderWidth: 2,
    borderColor: '#e13223',
    padding: 10
  },
  stretchedArtistSelectedIcon: {
    position: 'absolute',
    right: 0,
    top: 0,

}
});
const mapStateToProps = ({ fontReducer, songsReducer }) => {
  return { ...fontReducer, ...songsReducer};
};
const UploadMediaFilledScreen = connect(mapStateToProps)(UploadMediaFilledScreenContainer);
export {UploadMediaFilledScreen};