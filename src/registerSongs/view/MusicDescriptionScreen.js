import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import { updateSongRegisterData } from '../../state/action';

class MusicDescriptionScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: ''};
  }

  handleChangeDescription = (value) => {
    let song = {...this.props.song, description  : value};
    this.props.dispatch(updateSongRegisterData(song));
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTop}>Explique um pouquinho sobre sua música.</Text>
        <TextField 
        onChangeText={this.handleChangeDescription}
        label='Descrição'
        value={this.props.song.description}
        labelFontSize={16}
        multiline={true}
        lineWidth={1}
        baseColor={'#b1b1b1'}/>
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

const MusicDescriptionScreen = connect(mapStateToProps)(MusicDescriptionScreenContainer);
export {MusicDescriptionScreen};