import React from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {updateSongRegisterData} from '../../../state/action';
import {MPHeader, MPFooter, MPInput, MPText, MPIconButton} from '../../../components';

class MusicDescriptionScreenContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      description: (props.song && props.song.description) || ''
    };
  }

  handleChangeDescription = ({value}) => {
    this.setState({description: value});
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSaveClick = () => {
    let song = {...this.props.song, description: this.state.description};
    this.props.dispatch(updateSongRegisterData(song));
    this.handleBackClick();
  };

  renderHeaderMenuSave() {
    return [
      <MPIconButton title="Salvar" titleStyle={styles.headerMenuText} onPress={this.handleSaveClick}/>
    ];
  }

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title="Descrição" icons={this.renderHeaderMenuSave()}/>
        <View style={styles.content}>
          <MPText style={styles.textTop}>Explique um pouquinho sobre sua música.</MPText>
          <MPInput label='Descrição' value={this.state.description} onChangeText={this.handleChangeDescription}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC'
  },
  content: {
    marginTop: 30,
    marginHorizontal: 40
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    fontFamily: 'montSerrat'
  },
  headerMenuText: {
    fontFamily: 'montSerrat',
    fontSize: 14,
    color: '#fff'
  }
});

const mapStateToProps = ({songsReducer}) => {
  return {...songsReducer}
};

const MusicDescriptionScreen = connect(mapStateToProps)(MusicDescriptionScreenContainer);
export {MusicDescriptionScreen};
