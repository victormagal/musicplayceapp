import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import {
  MPText,
  MPSelect,
  MPTextField,
  MPGradientButton,
  MPHelpSuccess
} from '../../components';
import {sendQuestion} from "../../state/settings/help/helpAction";
import {MPHeader} from "../general";

class MPHelpComponent extends React.Component {
  state = {
    options: ['Música', 'Usera', 'Compositor', 'Cadastro', 'Perfil'],
    selectedOption: null,
    message: ''
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sentSuccess) {
      this.props.navigation.replace('message', { component: MPHelpSuccess });
    } else {
      this.scrollView.scrollToEnd()
    }
  }

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleSendQuestion = () => {
    const { dispatch } = this.props;
    const { options, message, selectedOption } = this.state;
    const data = {
      question: options[selectedOption],
      answer: message
    };
    dispatch(sendQuestion(data));
  }

  renderHeaderMenuRight() {
    const { message, selectedOption } = this.state;
    const isDisabled = message === '' || selectedOption === null;
    const color = isDisabled ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)';
    return [
      <TouchableOpacity
        setOpacity={1}
        key={Math.random()}
        disabled={isDisabled}
        onPress={this.handleSendQuestion}
      >
        <MPText style={[styles.headerText, { color }]}>
          Enviar
        </MPText>
      </TouchableOpacity>
    ];
  }

  render() {
    console.log('props', this.props);
    const { sentSuccess } = this.props;
    const { options, message, selectedOption } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <MPHeader
          back={true}
          onBack={this.handleBack}
          icons={this.renderHeaderMenuRight()}
        />
        <ScrollView ref={ref => this.scrollView = ref}>
          <View style={styles.container}>
            <MPSelect
              label={"Selecione o assunto"}
              value={selectedOption}
              options={options}
              onChangeOption={(selectedOption) => this.setState({ selectedOption })}
            />
            <MPTextField
              label={"Envie sua mensagem"}
              value={message}
              multiline={true}
              onChangeText={(message) => this.setState({ message })}
            />
            { (sentSuccess !== null && !sentSuccess) &&
              <MPText style={styles.errorText}>
                A sua dúvida não pôde ser enviada. Por favor tente mais tarde.
              </MPText>
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    marginHorizontal: 20
  },
  headerText: {
    fontWeight: "500",
    fontFamily: 'Montserrat-Medium',
    fontSize: 13
  },
  errorText: {
    color: 'rgba(255,0,0,1)',
    fontFamily: 'Montserrat',
    fontSize: 12,
    marginTop: 10
  }
});

const mapStateToProps = ({ fontReducer, helpReducer }) => {
  return { ...fontReducer, ...helpReducer };
};

const MPHelp = connect(mapStateToProps)(MPHelpComponent);
export { MPHelp };
