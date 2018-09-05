import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {MPHeader, MPInput, MPText, MPIconButton} from '../../../components';
import {updateSongRegisterData} from "../../../state/songs/songsType";


class ISRCScreenContainer extends React.Component {

  state = {
    isrc: ''
  };

  componentDidMount(){
    console.log(this.props.song);
    if(this.props.song.isrc_number){
      this.setState({isrc: String(this.props.song.isrc_number)});
    }
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleChangeText = ({value}) => {
    this.setState({isrc: value});
  };

  handleSaveClick = () => {
    let song = {...this.props.song};
    song.isrc_number = this.state.isrc;
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
    console.log(this.props.song);
    return (
      <View style={styles.container}>
        <MPHeader
          back={true}
          onBack={this.handleBackClick}
          icons={this.renderHeaderMenuSave()}
          title={"Nº ISRC (código-padrão internacional de gravação)"}
        />
        <KeyboardAwareScrollView style={styles.scroll}>
          <View>
            <MPText style={styles.textTop}>
              Informe o ISRC, caso a música já esteja registrada:
            </MPText>
            <MPInput
              label={'Nº do ISRC'}
              value={this.state.isrc}
              onChangeText={this.handleChangeText}
              keyboardType='numeric'/>
            <View style={[ styles.clickableTextContainer, { marginTop: 76 } ]}>
              <MPText style={[ styles.clickableText, { marginBottom: 20 } ]}>
                A gravação ainda nao está registrada.
              </MPText>
              <MPText style={styles.clickableText}>
                Eu não sei o que é ISRC.
              </MPText>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'flex-end',
  },
  scroll: {
    flex: 2,
    paddingTop: 30,
    paddingHorizontal: 40
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    fontFamily: 'ProbaPro-Regular',
  },
  clickableTextContainer: {
    alignItems: 'flex-start',
  },
  clickableText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#5994db',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular'
  },
  headerMenuText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#fff'
  },
});

const mapStateToProps = ({songsReducer}) => {
  return {song: songsReducer.song};
};


const ISRCScreen = connect(mapStateToProps)(ISRCScreenContainer);
export {ISRCScreen};
