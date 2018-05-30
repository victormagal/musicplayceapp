import React from 'react';
import { connect } from 'react-redux';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import {updateSongRegisterData} from '../../state/action';

class TitleScreenContainer extends React.Component {

  handleChangeName = (value) => {
    let song = {...this.props.song, name: value};
    this.props.dispatch(updateSongRegisterData(song));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTop}>Escreva o título da música.</Text>
        <TextField
          onChangeText={this.handleChangeName}
          label='Título da música'
          value={this.props.song.name}
          labelFontSize={16}
          lineWidth={1}
          baseColor={'#b1b1b1'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    marginStart: 40,
    marginEnd: 40,
    flexDirection: 'column'
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    height: 20,
    marginBottom: 20,
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
  }
});

const mapStateToProps = ({songsReducer}) => {
  return {...songsReducer}
};

const TitleScreen = connect(mapStateToProps)(TitleScreenContainer);
export {TitleScreen};
