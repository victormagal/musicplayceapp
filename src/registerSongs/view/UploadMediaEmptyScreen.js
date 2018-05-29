import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList} from 'react-native';
import { Icon } from 'react-native-elements'
import { ButtonCE } from '../../components'
import { TextField } from 'react-native-material-textfield';

class UploadMediaEmptyScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      titleText: '',
      letterText: '',
      stilesText: '',
      decriptionText: '*Opcional',
      authorsText: '',
      interpretersText: '*Opcional',
      folderText: '*Opcional',
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={ styles.topIndicator}>
          <View style={ styles.topIndicatorDone}></View>
          <View style={ styles.topIndicatorLeft}></View>
        </View>
        <Text style={styles.headerTitle}>Mostre pra todo mundo o que você faz de melhor.</Text>
        <Text style={ styles.headerText}>Upload de melodia</Text>
        <ButtonCE iconName={'music-tone-alt'} iconType={'simple-line-icon'} title='Escolher o arquivo' onPress={ () => {} } textSize={16} style={ {marginBottom: 10} } />
        <Text style={ styles.subText}>Você pode fazer upload de músicas em MP3 ou AAC.</Text>
        <View style={ styles.textFieldsVerticalContainer }>
          <View style={  styles.textFieldsHorizontalContainer}>
            <View style={ styles.textFieldsInnerContainer}>
              <TextField
              titleTextStyle={{color: '#000'}}
              lineWidth={0}
              label='Qual é o título da música?'
              value={this.state.titleText}
              labelFontSize={12}
              baseColor={'#000'}
              textColor={'#686868'}
              onChangeText={(titleText) => this.setState({titleText})}/>
            </View>
            <View style={ styles.textFieldsInnerContainer}>
              <TextField
              labelTextStyle={{color: '#000'}}
              lineWidth={0}
              label='Qual é a letra?'
              value={this.state.letterText}
              labelFontSize={12}
              baseColor={'#000'}
              textColor={'#686868'}
              onChangeText={(letterText) => this.setState({letterText})}/>
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
            </View>
            <View style={ styles.textFieldsInnerContainer}>
              <TextField
              lineWidth={0}
              label='Fale um pouquinho mais sobre a música'
              value={this.state.letterText}
              labelFontSize={12}
              baseColor={'#000'}
              textColor={'#686868'}
              labelTextStyle={{flex: 1,flexWrap: 'wrap'}}
              onChangeText={(letterText) => this.setState({letterText})}/>
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
            </View>
          </View>
        </View>
        <ButtonCE title='Publicar' onPress={ () => {} } textSize={16} style={ {marginBottom: 20} } />
        <View style={styles.clickableTextContainer}>
          <Text style={styles.clickableText}>Terminar depois</Text>
        </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    marginStart: 20,
    marginEnd: 20,
    flexDirection: 'column'
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
    paddingStart : 50,
    paddingEnd: 50,
    color: '#000',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    color: '#000',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 12,
    color: '#686868',
    alignItems: 'center',
    textAlign: 'center'
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

export {UploadMediaEmptyScreen};