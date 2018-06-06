import React from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {updateSongRegisterData} from '../../../state/action';
import {MPHeader, MPFooter, MPTextField, MPText} from '../../../components';

class MusicDescriptionScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  handleChangeDescription = (value) => {
    let song = {...this.props.song, description: value};
    this.props.dispatch(updateSongRegisterData(song));
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Descrição"}/>
        <ScrollView style={styles.scroll}>
          <View>
            <MPText style={styles.textTop}>Explique um pouquinho sobre sua música.</MPText>
            <MPTextField label={'Descrição'} value={''}/>
          </View>
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

const mapStateToProps = ({songsReducer}) => {
  return {...songsReducer}
};

const MusicDescriptionScreen = connect(mapStateToProps)(MusicDescriptionScreenContainer);
export {MusicDescriptionScreen};
