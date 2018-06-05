import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { updateSongRegisterData } from '../../state/action';
import { MPHeader, MPFooter, MPTextField } from '../../components';

class TitleScreenContainer extends React.Component {

  handleChangeName = (value) => {
    let song = {...this.props.song, name: value};
    this.props.dispatch(updateSongRegisterData(song));
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Título da música"} />
        <ScrollView style={styles.scroll}>
        {
          this.props.fontLoaded ? (
            <View>
              <Text style={styles.textTop}>Escreva o título da música.</Text>
              <MPTextField label={"Título da música"} value={""} />
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
    fontFamily: 'montSerrat',
  }
});

const mapStateToProps = ({fontReducer, songsReducer}) => {
  return {...fontReducer, ...songsReducer}
};

const TitleScreen = connect(mapStateToProps)(TitleScreenContainer);
export {TitleScreen};
