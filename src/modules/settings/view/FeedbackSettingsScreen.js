import React from 'react';
import { 
  ScrollView, StyleSheet, View, TouchableOpacity
} from 'react-native';
import { 
  MPHeader, MPSelect, MPTextField, MPText
} from '../../../components';
import {createFeedback} from "../../../state/action";
import {connect} from "react-redux";
import {MPLoading} from "../../../components/general";

class FeedbackSettingsScreenContainer extends React.Component {
  state = {
    message: '',
    selectedOption: null,
    options: ['Interface', 'Navegação', 'Experiência']
  };

  handleBack = () => {
    this.props.navigation.popToTop();
  };

  handleSendPress = () => {
    const { dispatch } = this.props;
    const { options, message, selectedOption } = this.state;
    const feedback = {
      message,
      subject: options[selectedOption]
    };
    dispatch(createFeedback(feedback));
    this.handleBack();
  };

  renderHeaderMenuRight() {
    const { message, selectedOption } = this.state;
    const isDisabled = message === '' || selectedOption === null;
    const color = isDisabled ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)';
    return [
      <TouchableOpacity setOpacity={1}
                        key={Math.random()}
                        disabled={isDisabled}
                        onPress={this.handleSendPress}>
        <MPText style={[styles.headerText, { color }]}>
          Enviar
        </MPText>
      </TouchableOpacity>
    ];
  }

  render() {
    const { loading, feedbackSaveError } = this.props;
    const { options, message, selectedOption } = this.state;
    return (
      <View style={styles.parent}>
        <MPHeader back={true}
                  onBack={this.handleBack}
                  icons={this.renderHeaderMenuRight()}
                  title={"Alguma sugestão? Ajude-nos a melhorar a plataforma"} />
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <MPSelect label={"Assunto do feedback"}
                      value={selectedOption}
                      options={options}
                      onChangeOption={(selectedOption) => this.setState({ selectedOption })} />
            <MPTextField label={"Envie sua mensagem"}
                         value={message}
                         multiline={true}
                         onChangeText={(message) => this.setState({ message })} />
            { feedbackSaveError &&
              <MPText style={styles.errorText}>
                A sua sugestão não pôde ser enviada. Por favor tente mais tarde.
              </MPText>
            }
            <MPLoading visible={loading}/>
          </View>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'flex-end'
  },
  scroll: {
    flex: 2
  },
  container: {
    marginVertical: 30,
    marginHorizontal: 20
  },
  errorText: {
    color: 'rgba(255,0,0,1)',
    fontFamily: 'Montserrat',
    fontSize: 12,
    marginTop: 10
  },
  headerText: {
    fontWeight: "500",
    fontFamily: 'Montserrat-Medium',
    fontSize: 13
  }
});

const mapStateToProps = ({ feedbackReducer }) => {
  return { ...feedbackReducer };
};

const FeedbackSettingsScreen = connect(mapStateToProps)(FeedbackSettingsScreenContainer);
export { FeedbackSettingsScreen };
