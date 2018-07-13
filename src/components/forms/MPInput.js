import React from 'react';
import {
  StyleSheet, View, TouchableOpacity
} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {connect} from 'react-redux';
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

  validate(){
    this.props.onBlur();
  }

  handleToggleEye = () => {
    this.setState({isPassword: !this.state.isPassword});
  };

  handleChangeText = (value) => {
    let {name} = this.props;
    this.props.onChangeText && this.props.onChangeText({name,value});
  };

  render() {
    let { label, multiline, style, value, onBlur, secureTextEntry, textProps} = this.props;
    let inputIcon = this.state.isPassword ? <MPInputEyeIcon /> : <MPInputEyeVisibleIcon />;
    let iconStyle = [styles.eye];

    if (textProps && Object.keys(textProps).length > 0) {
      iconStyle.push(styles.eyeError)
    }

    return (
      <View style={[styles.parent, style]}>
        <TextField
          lineWidth={0.5}
          activeLineWidth={0.5}
          disabledLineWidth={0.5}
          multiline={multiline}
          label={label}
          value={value}
          labelFontSize={12}
          baseColor={'rgba(104, 104, 104, 0.8)'}
          tintColor={'rgba(177, 177, 177, 0.8)'}
          labelTextStyle={this.getLabelStyle()}
          style={this.getTextFieldStyle()}
          onBlur={onBlur}
          onChangeText={ this.handleChangeText }
          secureTextEntry={this.state.isPassword}
          {...this.props.textProps}/>

        {secureTextEntry && (
          <TouchableOpacity style={iconStyle} onPress={this.handleToggleEye}>
            {inputIcon}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

MPInputComponent.propTypes = {
  name: PropTypes.string,
  validators: PropTypes.any
};

const styles = StyleSheet.create({
  parent: {
    display: 'flex'
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

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};


const MPInput = connect(mapStateToProps)(applyValidator(MPInputComponent));
export {MPInput};
