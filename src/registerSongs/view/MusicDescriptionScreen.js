import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import { updateSongRegisterData } from '../../state/action';
import { MPHeader, MPFooter } from '../../components';

class MusicDescriptionScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: ''};
  }

  handleChangeDescription = (value) => {
    let song = {...this.props.song, description  : value};
    this.props.dispatch(updateSongRegisterData(song));
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Descrição"} />
        {
          this.props.fontLoaded ? (
            <ScrollView style={styles.scroll}>
              <Text style={styles.textTop}>Explique um pouquinho sobre sua música.</Text>
              <TextField 
              onChangeText={this.handleChangeDescription}
              label='Descrição'
              value={this.props.song.description}
              labelFontSize={16}
              multiline={true}
              lineWidth={1}
              baseColor={'#b1b1b1'}
              labelTextStyle={{ fontFamily: 'montSerrat' }}
              titleTextStyle={{ fontFamily: 'montSerrat' }}/>
            </ScrollView>
          ) : null
        }
        <MPFooter />
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
    height: 20,
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
  }
});

const mapStateToProps = ({fontReducer, songsReducer}) => {
  return {...fontReducer, ...songsReducer}
};

const MusicDescriptionScreen = connect(mapStateToProps)(MusicDescriptionScreenContainer);
export {MusicDescriptionScreen};