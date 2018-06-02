import React from 'react';
import { StyleSheet, Text, View, TextInput, Picker, ScrollView } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import {updateSongRegisterData} from '../../state/action';
import { MPHeader } from '../../components';

class MusicLetterScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: '', language: 'default'};

  }

  handleChangeLetter = (value) => {
    let song = {...this.props.song, letter  : value};
    this.props.dispatch(updateSongRegisterData(song));
  };
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Letra da música"} />
        {
          this.props.fontLoaded ? (
            <ScrollView style={styles.scroll}>
              <Text style={styles.textTop}>Pode colar a letra da música aqui:</Text>
              <TextField 
              label='Letra da Música'
              onChangeText={this.handleChangeLetter}
              value={this.props.song.letter}
              labelFontSize={16}
              multiline={true}
              lineWidth={1}
              baseColor={'#b1b1b1'} 
              labelTextStyle={{ fontFamily: 'montSerrat' }}
              titleTextStyle={{ fontFamily: 'montSerrat' }}/>
              <View style={[styles.clickableTextContainer, {marginTop: 20}]}>
                <Text style={{fontFamily: 'montSerrat'}}>ou </Text>
                <Text style={styles.clickableText}>faça upload da letra(doc, tx ou rtf)</Text>
              </View>
              <View style={ styles.pickerContainer }>
                <Picker
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) => itemValue != 'default' ? this.setState({language: itemValue}) : {}}
                    mode={'dropdown'}
                    style={ {color: "#b1b1b1"} }>
                    <Picker.Item label="Idioma" value="default" style={styles.notEnabled}  />
                    <Picker.Item label="Português" value="pt" />
                    <Picker.Item label="Inglês" value="en" />
                    <Picker.Item label="Espanhol" value="es" />
                </Picker>
              </View>
            </ScrollView>
          ) : null
        }
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
    paddingTop: 30,
    paddingStart: 40,
    paddingEnd: 40
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    marginBottom: 20,
    fontFamily: 'montSerrat'
  },
  textInputContainer: {
    height: 46,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#b1b1b1',
    padding: 5
  },
  textInput: {
    borderColor: 'transparent',
  },
  clickableTextContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    height: 20,
  },
  clickableText: {
    borderBottomWidth: 1,
    borderColor: '#5994db',
    textAlign: 'center',
    color: '#5994db',
    fontSize: 14,
    fontFamily: 'montSerrat'
  },
  pickerContainer: {
    height: 46,
    marginTop: 30,
    borderColor: '#b1b1b1',
    borderBottomWidth: 1,
  },
  notEnabled: {
    backgroundColor: '#686868',
  }
});

const mapStateToProps = ({fontReducer, songsReducer}) => {
  return {...fontReducer, ...songsReducer}
};

const MusicLetterScreen = connect(mapStateToProps)(MusicLetterScreenContainer);
export {MusicLetterScreen};