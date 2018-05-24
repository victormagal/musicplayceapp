import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { Icon } from 'react-native-elements'
import { ButtonCE } from '../../components'

class UploadMediaEmptyScreen extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={ styles.topIndicator}>
          <View style={ styles.topIndicatorDone}></View>
        </View>
        <Text style={styles.headerTitle}>Mostre pra todo mundo o que você faz de melhor.</Text>
        <Text style={ styles.headerText}>Upload de media</Text>
        <ButtonCE title='Escolher o arquivo' onPress={ () => {} } textSize={16} style={ {marginBottom: 10} } />
        <Text style={ styles.subText}>Você pode fazer upload de músicas em MP3 e AAC.</Text>
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
    alignItems: 'flex-start',
    backgroundColor: '#d8d8d8',
    marginBottom: 20,
  },
  topIndicatorDone: {
    height: 7,
    flex: 1,
    backgroundColor: '#e13223',
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
  }
});

export {UploadMediaEmptyScreen};