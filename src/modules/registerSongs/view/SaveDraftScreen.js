import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, TextInput} from 'react-native';
import {MPGradientButton, MPHeader, MPText} from '../../../components';

class SaveDraftScreenContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <MPHeader />
        <View style={styles.content}>
          <MPText style={styles.textTop}>Deseja salvar como rascunho?</MPText>
          <MPGradientButton style={styles.button} textSize={16} title="Salvar rascunho" />
          <MPGradientButton style={styles.button} textSize={16} title="Apagar música" />
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
    flex: 2,
    paddingTop: 30,
  },
  textTop: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'montSerrat',
    alignSelf: 'center'
  },
  button: {
    width: 200,
    marginTop: 20,
    alignSelf: 'center'
  }
});

const mapStateToProps = () => {
  return {};
};

const SaveDraftScreen = connect(mapStateToProps)(SaveDraftScreenContainer);
export {SaveDraftScreen};
