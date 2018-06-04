import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import { updateSongRegisterData } from '../../state/action';
import { MPHeader, MPFooter, MPTextField } from '../../components';

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
        <ScrollView style={styles.scroll}>
        {
          this.props.fontLoaded ? (
            <View>
              <Text style={styles.textTop}>Explique um pouquinho sobre sua música.</Text>
              <MPTextField label={'Descrição'} value={''} />
            </View>
          ) : null
        }
        </ScrollView>
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
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    marginHorizontal: 40,
    fontFamily: 'montSerrat'
  },
});

const mapStateToProps = ({fontReducer, songsReducer}) => {
  return {...fontReducer, ...songsReducer}
};

const MusicDescriptionScreen = connect(mapStateToProps)(MusicDescriptionScreenContainer);
export {MusicDescriptionScreen};