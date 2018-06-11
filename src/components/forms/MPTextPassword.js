import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {connect} from 'react-redux';
import { MPInputEyeIcon, MPInputEyeVisibleIcon } from '../../assets/svg';


class MPTextPasswordComponent extends React.Component {

  state = {
    password: '',
    passwordMask: '',
    maskVisible: true
  };

  constructor(props){
    super(props);
    this.setupPassword(props.value);
  }

  componentWillReceiveProps(nextProps){
    this.setupPassword(nextProps.value);
  }

  setupPassword(value){
    if(value){
      this.setState({
        password: value,
        passwordMask: value.replace(/./g, '*')
      });
    }
  }

  getTextFieldStyle() {
    let style = {fontSize: 16, paddingRight: 30};

    if (this.props.fontLoaded) {
      style['fontFamily'] = 'montSerrat';
    }

    return style;
  }

  getLabelStyle() {
    let style = {};

    if (this.props.fontLoaded) {
      style['fontFamily'] = 'montSerrat';
    }

    return style;
  }

  handleToggleEye = () => {
    this.setState({maskVisible: !this.state.maskVisible});
  };

  handleChangeText = (value) => {
    let passLength = this.state.password.length;
    let password = this.state.password;

    if(this.state.maskVisible) {
      if (value.length > passLength) {
        password = this.state.password + value.replace(/\*/g, '');
        this.setState({password, passwordMask: password.replace(/./g, '*')});
      } else if (passLength > 0) {
        password = this.state.password.substring(0, passLength - 1);
        this.setState({password});
      }
      this.props.onChangeText && this.props.onChangeText(password);
      return;
    }

    this.props.onChangeText && this.props.onChangeText(value);
  };

  render() {
    let {
      label,
      multiline,
      style,
      onFocus,
      onBlur,
      textProps
    } = this.props;

    let inputIcon = this.state.maskVisible ? <MPInputEyeIcon /> : <MPInputEyeVisibleIcon />;
    let valueToShow = this.state.maskVisible ? this.state.passwordMask : this.state.password;

    return (
      <View style={[styles.parent, style]}>
        <TextField
          lineWidth={0.5}
          activeLineWidth={0.5}
          disabledLineWidth={0.5}
          multiline={multiline}
          label={label}
          value={valueToShow}
          labelFontSize={12}
          baseColor={'rgba(104, 104, 104, 0.8)'}
          tintColor={'rgba(177, 177, 177, 0.8)'}
          labelTextStyle={this.getLabelStyle()}
          style={this.getTextFieldStyle()}
          onFocus={ onFocus }
          onBlur={ onBlur }
          onChangeText={ this.handleChangeText }
          {...textProps}/>
        <TouchableOpacity style={} onPress={this.handleToggleEye}>
          {inputIcon}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  eye:{
    position: 'absolute',
    right: 0,
    bottom: 15
  }
});

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const MPTextPassword = connect(mapStateToProps)(MPTextPasswordComponent);
export {MPTextPassword};
