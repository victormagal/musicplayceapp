import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {updateSongRegisterData} from '../../../state/action';
import {MPHeader, MPSelect, MPText, MPIconButton, MPInput} from '../../../components';

class MusicLetterScreenContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lyrics: (props.song && props.song.lyrics) || '',
      language: 'default'
    };
  }

  handleChangeLetter = ({value}) => {
    this.setState({lyrics: value});
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSaveClick = () => {
    let song = {...this.props.song, lyrics: this.state.lyrics};
    this.props.dispatch(updateSongRegisterData(song));
    this.handleBackClick();
  };

  renderHeaderMenuSave() {
    return [
      <MPIconButton key={1} title="Salvar" titleStyle={styles.headerMenuText} onPress={this.handleSaveClick}/>
    ];
  }

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title="Letra da música"
                  icons={this.renderHeaderMenuSave()}/>
        <View style={styles.content}>
          <MPText style={styles.textTop}>Pode colar a letra da música aqui:</MPText>
          <MPInput label="Letra da música:" value={this.state.lyrics} onChangeText={this.handleChangeLetter}/>
          <View style={styles.clickableTextContainer}>
            <MPText style={styles.ouText}>ou </MPText>
            <MPText style={styles.clickableText}>faça upload da letra(doc, tx ou rtf)</MPText>
          </View>
          <MPSelect style={styles.idioma} label="Idioma" />
        </View>
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
  content: {
    marginTop: 30,
    marginHorizontal: 40
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    fontFamily: 'ProbaPro-Regular'
  },
  clickableTextContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 30
  },
  clickableText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#5994db',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular'
  },
  pickerContainer: {
    height: 46,
    marginTop: 30,
    borderColor: '#b1b1b1',
    borderBottomWidth: 1,
  },
  notEnabled: {
    backgroundColor: '#686868'
  },
  headerMenuText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#fff'
  },
  idioma: {
    marginTop: 52
  },
  ouText: {
    fontFamily: 'Montserrat-Regular'
  }
});

const mapStateToProps = ({songsReducer}) => {
  return {...songsReducer}
};

const MusicLetterScreen = connect(mapStateToProps)(MusicLetterScreenContainer);
export {MusicLetterScreen};
