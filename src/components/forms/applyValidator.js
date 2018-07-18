import React from 'react';
import {email, required} from './validators';


export const applyValidator = (FormFieldComponent) => {
  const validations = {
    'email': email,
    'required': required
  };

  return class extends React.Component{

    state = {
      errorProps: {},
      valid: true
    };

    componentDidMount(){
      if(this.props.validators && this.props.validators.includes('required') && !this.props.value){
        this.setState({valid: false});
      }
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.validators && nextProps.validators.includes('required') && !nextProps.value){
        this.setState({valid: false});
      }
    }

    handleValidate = () => {
      let error = null;

      if(this.props.validators){

        for(let validator of this.props.validators){
          let res = validations[validator](this.props.value);
          if(res){
            error = res;
            break;
          }
        }

        let errorProps = error ? {error, errorColor: '#e13223'} : null;
        let valid = !error;
        this.setState({errorProps, valid});
      }

      return !error;
    };

    handleBlur = () => {
      this.handleValidate();
    };

    render(){
      let newProps = {...this.props, valid: this.state.valid};
      delete newProps.onBlur;
      return <FormFieldComponent onBlur={this.handleBlur} validate={this.handleValidate} {...newProps} textProps={this.state.errorProps}/>;
    }
  }
};
