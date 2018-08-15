import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {MPHeader, MPText, MPIconButton} from '../../../components';
import {updateSongRegisterData} from "../../../state/songs/songsType";
import {MPTextField} from "../../../components/forms";

class MusicDescriptionScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: (props.song && props.song.description) || ''
    };
  }

  handleChangeDescription = (description) => {
    this.setState({ description });
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSaveClick = () => {
    const song = {...this.props.song, description: this.state.description};
    this.props.dispatch(updateSongRegisterData(song));
    this.handleBackClick();
  };

  renderHeaderMenuSave() {
    return [
      <MPIconButton
        key={1}
        title="Salvar"
        titleStyle={styles.headerMenuText}
        onPress={this.handleSaveClick}
      />
    ];
  }

  render() {
    return (
      <View style={styles.container}>
        <MPHeader
          back={true}
          onBack={this.handleBackClick}
          title="Descrição"
          icons={this.renderHeaderMenuSave()}
        />
        <ScrollView>
          <View style={styles.content}>
            <MPText style={styles.textTop}>
              Explique um pouquinho sobre sua música.
            </MPText>
            <MPTextField
              multiline={true}
              label='Descrição'
              value={this.state.description}
              onChangeText={this.handleChangeDescription}
            />
          </View>
        </ScrollView>
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
    fontFamily: 'ProbaPro-Regular'
  },
  headerMenuText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#fff'
  }
});

const mapStateToProps = ({songsReducer}) => {
  return {...songsReducer}
};

const MusicDescriptionScreen = connect(mapStateToProps)(MusicDescriptionScreenContainer);
export {MusicDescriptionScreen};
