  import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
    MPText,
  MPGradientButton,
  MPTextField,
  MPReportedProfile,
  MPCheckBox
} from '../../components';
import { saveProfile, reportProfile } from '../../state/action';
import { MPForm, MPInput } from '../forms';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class MPConfirmReportProfileComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isSpam: true,
      isInappropiate: true,
      form: {
        report: '',
      },
    }
  }

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleFoward = () => {
    let params = {
      spam: this.state.isSpam,
      inappropriate: this.state.isInappropiate,
      message: this.state.form.report,
      artist_id: this.props.user.id,
    }
    
    this.props.dispatch(reportProfile(params));
  };
  
  componentWillReceiveProps(nextProps){
    if(nextProps.reportSuccess){
      this.props.navigation.navigate('message', {component: MPReportedProfile})
    }
  }

  handleTextChange = ({name, value}) => {
    let newState = {...this.state};
    newState.form[name] = value;
    this.setState({...newState});
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <MPText style={ styles.title }>O que está pegando?</MPText>
        <View style={styles.checkboxContainer}>
          <MPCheckBox style={styles.marginSpam} checked={this.state.isSpam} title={'É spam'} />
          <MPCheckBox checked={this.state.isInappropiate} title={'É impróprio'} />
        </View>
        <MPText style={ styles.subTitle }>Descreva sua denúncia.</MPText>
        <MPForm>
          <MPInput style={{marginHorizontal:40, marginBottom: 40}} label={"Texto da denúncia"} value={this.state.form.report} name='report' onChangeText={this.handleTextChange} validators={['required']} error={this.props.error}/>
        </MPForm>
        <MPGradientButton style={ styles.button } title={'Fazer denúncia'} textSize={16} onPress={this.handleFoward.bind(this)} disabled={this.props.errors ? true: false}/>
        <MPGradientButton style={ styles.button } title={'Cancelar'} textSize={16} onPress={this.handleBack.bind(this)}/>
      </KeyboardAwareScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30
  },
  title: {
    marginBottom: 30,
    marginHorizontal: 40,
    fontSize: 24,
    color : '#000',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  subTitle: {
    marginHorizontal: 46,
    fontSize: 16,
    fontFamily: 'ProbaPro-Regular',
    color: '#686868',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 54,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  marginSpam: {
    marginRight: 20
  }
});

const mapStateToProps = ({ userReducer }) => {
  return { ...userReducer };
};

const MPConfirmReportProfile = connect(mapStateToProps)(MPConfirmReportProfileComponent);
export { MPConfirmReportProfile };
