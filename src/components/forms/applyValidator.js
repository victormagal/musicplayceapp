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

    handleBlur = () => {
      if(this.props.validators){
        let error = null;

        for(let validator of this.props.validators){
          let res = validations[validator](this.props.value);
          if(res){
            error = res;
            break;
          }
        }

        let errorProps = error ? {error, errorColor: '#e13223'} : {};
        let valid = !error;
        this.setState({errorProps, valid});
      }
    };

    render(){
      let newProps = {...this.props, valid: this.state.valid};
      delete newProps.onBlur;
      return <FormFieldComponent onBlur={this.handleBlur} {...newProps} textProps={this.state.errorProps}/>;
    }
  }
};
