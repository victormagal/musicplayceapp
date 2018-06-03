import React from 'react';
import { connect } from 'react-redux';
import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import {updateSongRegisterData} from '../../state/action';
import { MPHeader, MPFooter } from '../../components';

class TitleScreenContainer extends React.Component {

  handleChangeName = (value) => {
    let song = {...this.props.song, name: value};
    this.props.dispatch(updateSongRegisterData(song));
  };

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Título da música"} />
        {
          this.props.fontLoaded ? (
            <ScrollView style={styles.scroll}>
              <Text style={styles.textTop}>Escreva o título da música.</Text>
              <TextField
                onChangeText={this.handleChangeName}
                label='Título da música'
                value={this.props.song.name}
                labelFontSize={16}
                lineWidth={1}
                baseColor={'#b1b1b1'} 
                labelTextStyle={{ fontFamily: 'montSerrat' }}
                titleTextStyle={{ fontFamily: 'montSerrat' }}/>
            </ScrollView>
          ) : null
        }
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
    flex: 2,
    paddingTop: 30,
    paddingStart: 40,
    paddingEnd: 40,
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    height: 20,
    marginBottom: 20,
    fontFamily: 'montSerrat',
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

const mapStateToProps = ({fontReducer, songsReducer}) => {
  return {...fontReducer, ...songsReducer}
};

const TitleScreen = connect(mapStateToProps)(TitleScreenContainer);
export {TitleScreen};
