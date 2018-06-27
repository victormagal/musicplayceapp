import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
    MPText,
  MPGradientButton,
  MPChatDeleted
} from '../../components';
import { saveProfile } from '../../state/action';

class MPConfirmChatDeleteComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleFoward = () => {
    this.props.navigation.navigate('message', {component: MPChatDeleted})
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={ styles.title }>Tem certeza que deseja apagar a conversa com Fernanda Almeida?</MPText>
        <MPText style={ styles.subTitle }>Ao apagar uma conversa, não é possível reverter a operação. Todo o histórico de mensagens trocadas com o usuário é permanentemente descartado.</MPText>
        <MPGradientButton style={ styles.button } title={'Apagar'}   textSize={16} onPress={this.handleFoward.bind(this)}/>
        <MPGradientButton style={ styles.button } title={'Manter conversa'} textSize={16} onPress={this.handleBack.bind(this)}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30
  },
  title: {
    marginBottom: 20,
    marginHorizontal: 40,
    fontSize: 24,
    color : '#000',
    fontFamily: 'montSerrat',
    textAlign: 'center',
  },
  subTitle: {
    marginHorizontal: 40,
    fontSize: 16,
    fontFamily: 'probaProRegular',
    color: '#686868',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 54,
    marginBottom: 20,
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPConfirmChatDelete = connect(mapStateToProps)(MPConfirmChatDeleteComponent);
export { MPConfirmChatDelete };