import React from 'react';
import { connect } from 'react-redux';
import {StyleSheet, ScrollView, View} from 'react-native';
import { MPHeader, MPInput, MPText, MPIconButton } from '../../../components'
import {updateSongRegisterData} from '../../../state/action';

class InterpreterScreenContainer extends React.Component {

  state = {
    search: ''
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSaveClick = () => {
    //TODO: finish put interpreters in redux
    let song = {...this.props.song};
    this.props.dispatch(updateSongRegisterData(song));
    this.handleBackClick();
  };

  handleChangeSearch = ({value}) => {
    this.setState({search: value});
  };

  renderHeaderMenuSave() {
    return [
      <MPIconButton title="Salvar" titleStyle={styles.headerMenuText} onPress={this.handleSaveClick}/>
    ];
  }

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title="Intérpretes" icons={this.renderHeaderMenuSave()}/>
        <View style={styles.content}>
          <MPText style={styles.textTop}>Essa música tem intérpretes?</MPText>
          <MPInput label='Pesquise pelo nome:' value={this.state.search} onChangeText={this.handleChangeSearch} />
          <View style={styles.clickableTextContainer}>
            <MPText style={styles.clickableText}>Não, apenas eu</MPText>
          </View>
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
    flex: 2,
    marginTop: 30,
    marginHorizontal: 40
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    fontFamily: 'montSerrat'
  },
  clickableTextContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  clickableText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#5994db',
    fontSize: 14,
    marginTop: 152,
    fontFamily: 'montSerrat'
  }
});

const mapStateToProps = ({songsReducer}) => {
  return {...songsReducer};
};

const InterpreterScreen = connect(mapStateToProps)(InterpreterScreenContainer);
export {InterpreterScreen};
