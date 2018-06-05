import React from 'react';
import { StyleSheet, Text, View, TextInput, Picker, ScrollView } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import {updateSongRegisterData} from '../../state/action';
import { MPHeader, MPFooter, MPTextField, MPSelect } from '../../components';

class MusicLetterScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: '', language: 'default'};

  }

  handleChangeLetter = (value) => {
    let song = {...this.props.song, letter  : value};
    this.props.dispatch(updateSongRegisterData(song));
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Letra da música"} />
        <ScrollView style={styles.scroll}>
        {
          this.props.fontLoaded ? (
              <View>
                <Text style={styles.textTop}>Pode colar a letra da música aqui:</Text>
                <MPTextField label={"Letra da música:"} value={""} />
                <View style={styles.clickableTextContainer}>
                  <Text style={{fontFamily: 'montSerrat'}}>ou </Text>
                  <Text style={styles.clickableText}>faça upload da letra(doc, tx ou rtf)</Text>
                </View>
                <MPSelect style={{marginTop: 30}} />
              </View>
          ) : null
        }
        </ScrollView>
        <MPFooter/>
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
    flex: 2
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    marginHorizontal: 40,
    fontFamily: 'montSerrat'
  },
  clickableTextContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 40,
    marginBottom: 30
  },
  clickableText: {
    textDecorationLine: 'underline',
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
    backgroundColor: '#686868'
  }
});

const mapStateToProps = ({fontReducer, songsReducer}) => {
  return {...fontReducer, ...songsReducer}
};

const MusicLetterScreen = connect(mapStateToProps)(MusicLetterScreenContainer);
export {MusicLetterScreen};