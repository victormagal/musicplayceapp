import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {MPHeader, MPInput, MPText, MPIconButton} from '../../../components'
import {updateSongRegisterData} from "../../../state/songs/songsType";

class InterpreterScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      interpreter_name: ''
    };
    if (props.song && props.song.interpreter_name) {
      this.state.interpreter_name = props.song.interpreter_name;
    }
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSaveClick = () => {
    if (this.state.interpreter_name) {
      let song = {...this.props.song};
      song.interpreter_name = this.state.interpreter_name;
      this.props.dispatch(updateSongRegisterData(song));
      this.handleBackClick();
    }
  };

  handleChangeText = ({value}) => {
    this.setState({interpreter_name: value});
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
          title="Intérpretes"
          icons={this.renderHeaderMenuSave()}
        />
        <View style={styles.content}>
          <MPText style={styles.textTop}>
            Essa música tem intérprete?
          </MPText>
          <MPInput
            label='Intérprete'
            value={this.state.interpreter_name}
            onChangeText={this.handleChangeText}
          />
          <View style={styles.clickableTextContainer}>
            <MPText style={styles.clickableText}>
              Não, apenas eu
            </MPText>
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
    fontFamily: 'ProbaPro-Regular'
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
    fontFamily: 'Montserrat-Regular'
  },
  headerMenuText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#fff'
  }
});

const mapStateToProps = ({songsReducer}) => {
  return {...songsReducer};
};

const InterpreterScreen = connect(mapStateToProps)(InterpreterScreenContainer);
export {InterpreterScreen};
