import React from 'react';
import { connect } from 'react-redux';
import { 
  StyleSheet,
  View 
} from 'react-native';
import {
  MPGradientButton,
  MPText
} from '../../components';

class MPProfileSuccessComponent extends React.Component {
  handleOkClick = () => {
    this.props.navigation.navigate('MyProfileScreen');
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={styles.title}>
          Identificação atualizada com sucesso
        </MPText>
        <MPGradientButton
          style={styles.button}
          textSize={16} title="OK"
          onPress={this.handleOkClick}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    marginHorizontal: 40
  },
  button: {
    marginHorizontal: 135,
    marginTop: 20
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPProfileSuccess = connect(mapStateToProps)(MPProfileSuccessComponent);
export { MPProfileSuccess };
