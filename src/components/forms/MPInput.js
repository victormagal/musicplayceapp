import React from 'react';
import {
  StyleSheet, View, TouchableOpacity
} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import PropTypes from 'prop-types';
import {applyValidator} from './applyValidator';
import {MPInputEyeIcon, MPInputEyeVisibleIcon} from '../../assets/svg';


class MPInputComponent extends React.Component {

  state = {
    isPassword: false
  };

  constructor(props){
    super(props);
    this.state.isPassword = props.secureTextEntry || false;
  }

  componentDidMount(){
    if(this.props.register) {
      this.props.register(this.props.id, this);
    }
  }

  componentWillUnmount(){
    if(this.props.unregister) {
      this.props.unregister(this.props.id);
    }
  }

  validate(){
    return this.props.validate();
  }

  handleToggleEye = () => {
    this.setState({isPassword: !this.state.isPassword});
  };

  handleChangeText = (value) => {
    let {name} = this.props;
    this.props.onChangeText && this.props.onChangeText({name,value});
  };

  render() {
    let {
      label, multiline, style, value, onBlur, secureTextEntry,
      textProps, autoCapitalize, error, contentStyle, keyboardType,
      rightIcon, maxLength
    } = this.props;
    let inputIcon = this.state.isPassword ? <MPInputEyeIcon /> : <MPInputEyeVisibleIcon />;
    let iconStyle = [styles.eye];
    let inputContentStyle = [styles.textField];

    if(contentStyle){
      inputContentStyle.push(contentStyle);
    }

    if (textProps && Object.keys(textProps).length > 0 || !!error) {
      iconStyle.push(styles.eyeError)
    }

    return (
      <View style={[styles.parent, style]}>
        <TextField
          label={label}
          value={value}
          tintColor='#5994db'
          multiline={multiline}
          labelFontSize={12}
          style={inputContentStyle}
          labelTextStyle={styles.labelStyle}
          onBlur={onBlur}
          autoCapitalize={autoCapitalize}
          secureTextEntry={this.state.isPassword}
          onChangeText={ this.handleChangeText }
          error={error}
          keyboardType={keyboardType || 'default'}
          characterRestriction={maxLength}
          {...this.props.textProps}/>

        {secureTextEntry && (
          <TouchableOpacity style={iconStyle} onPress={this.handleToggleEye}>
            {inputIcon}
          </TouchableOpacity>
        )}

        { rightIcon &&
          <View style={iconStyle}>
            {rightIcon}
          </View>
        }
      </View>
    );
  }
}

MPInputComponent.propTypes = {
  name: PropTypes.string,
  validators: PropTypes.any,
  maxLength: PropTypes.number
};

MPInputComponent.defaultProps = {
  maxLength: undefined
}

const styles = StyleSheet.create({
  parent: {
    display: 'flex'
  },
  labelStyle: {
    fontFamily: 'Montserrat-Regular',
  },
  textField: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular'
  },
  eye: {
    position: 'absolute',
    right: 0,
    bottom: 15
  },
  eyeError: {
    bottom: 30
  }
});

const MPInput = applyValidator(MPInputComponent);
export {MPInput};
