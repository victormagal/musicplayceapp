import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  MPSelect,
  MPTextField,
  MPGradientButton,
  MPHelpSuccess
} from '../../components';

class MPHelpComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleFoward = () => {
    this.props.navigation.replace('message', { component: MPHelpSuccess });
  };

  render() {
    return (
      <View style={styles.container}>
        <MPSelect label={"Selecione"} />
        <MPTextField label={"Envie sua mensagem"} value={""} />
        <MPGradientButton style={styles.button} textSize={16} title="Salvar" onPress={this.handleFoward} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30
  },
  button: {
    marginHorizontal: 20,
    marginTop: 20
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPHelp = connect(mapStateToProps)(MPHelpComponent);
export { MPHelp };