import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, FlatList} from 'react-native';
import { Icon } from 'react-native-elements'
import { MPGradientButton } from '../../components'
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';

class UploadMediaEmptyScreenContainer extends React.Component {

  goToScreen = (route) => {
    this.props.navigation.navigate(route);
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
        <MPGradientButton iconName={'music-tone-alt'} iconType={'simple-line-icon'} title='Escolher o arquivo' onPress={ () => {} } textSize={16} style={ {marginBottom: 10} } />
        <Text style={ styles.subText}>Você pode fazer upload de músicas em MP3 ou AAC.</Text>
        <View style={ styles.textFieldsVerticalContainer }>
          <View style={  styles.textFieldsHorizontalContainer}>
            <View style={ styles.textFieldsInnerContainer}>
              <TextField
              titleTextStyle={{color: '#000'}}
              lineWidth={0}
              label='Qual é o título da música?'
              value={this.props.song.name}
              labelFontSize={12}
              baseColor={'#000'}
              textColor={'#686868'}/>
            </View>
            <View style={ styles.textFieldsInnerContainer}>
              <TextField
              labelTextStyle={{color: '#000'}}
              lineWidth={0}
              label='Qual é a letra?'
              value={this.props.song.letter}
              labelFontSize={12}
              baseColor={'#000'}
              textColor={'#686868'}/>
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
              textColor={'#686868'}/>
            </View>
            <View style={ styles.textFieldsInnerContainer}>
              <TextField
              lineWidth={0}
              label='Fale um pouquinho mais sobre a música'
              value={this.props.song.description}
              labelFontSize={12}
              baseColor={'#000'}
              textColor={'#686868'}
              labelTextStyle={{flex: 1,flexWrap: 'wrap'}}
              style={{fontSize: 10}}/>
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
              textColor={'#686868'}/>
            </View>
            <View style={ styles.textFieldsInnerContainer}>
              <TextField
              lineWidth={0}
              label='Tem outros intérpretes?'
              value={this.props.song.interpreters}
              labelFontSize={12}
              baseColor={'#000'}
              textColor={'#686868'}/>
            </View>
          </View>
          <View style={  styles.textFieldsHorizontalContainer}>
            <View style={ styles.textFieldsInnerContainer}>
              <TextField
              lineWidth={0}
              label='Organize sua música em pastas'
              value={this.props.song.folders}
              labelFontSize={12}
              baseColor={'#000'}
              textColor={'#686868'}/>
            </View>
          </View>
        </View>
        <MPGradientButton title='Publicar' onPress={ () => {} } textSize={16} style={ {marginBottom: 20} } />
        <View style={styles.clickableTextContainer}>
          <Text style={styles.clickableText} >Terminar depois</Text>
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

const mapStateToProps = ({ fontReducer, songsReducer }) => {
  return { ...fontReducer, ...songsReducer};
};
const UploadMediaEmptyScreen = connect(mapStateToProps)(UploadMediaEmptyScreenContainer);
export {UploadMediaEmptyScreen};
