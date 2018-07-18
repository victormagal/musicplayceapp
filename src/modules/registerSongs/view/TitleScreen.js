import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {updateSongRegisterData} from '../../../state/action';
import {MPHeader, MPInput, MPText, MPIconButton} from '../../../components';

class TitleScreenContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title: (props.song && props.song.name) || ''
    };
  }

  handleChangeName = ({value}) => {
    this.setState({title: value});
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSaveClick = () => {
    let song = {...this.props.song, name: this.state.title};
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
        <MPHeader back={true} onBack={this.handleBackClick} title="Título da música" icons={this.renderHeaderMenuSave()}/>
        <View style={styles.content}>
          <MPText style={styles.textTop}>Escreva o título da música.</MPText>
          <MPInput label="Título da música" name="title" value={this.state.title} onChangeText={this.handleChangeName} />
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
    fontFamily: 'montSerrat',
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

const TitleScreen = connect(mapStateToProps)(TitleScreenContainer);
export {TitleScreen};
