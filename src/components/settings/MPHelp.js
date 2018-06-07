import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  fetchProfile,
  saveProfile
} from '../../state/action';
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
      <View>
        <MPSelect />
        <MPTextField label={"Envie sua mensagem"} value={""} multiline={true} />
        <MPGradientButton style={styles.button} textSize={16} title="Salvar" onPress={this.handleFoward} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
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