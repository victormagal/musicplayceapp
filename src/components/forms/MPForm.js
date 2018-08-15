import React from 'react';
import { View, Text } from 'react-native';

class MPForm extends React.Component {

  state = {
    inputs : {}
  };

  _register = (id, component) => {
    let newState = {...this.state};
    newState.inputs[id] = component;
    this.setState(newState);
  };

  _unregister = (id) => {
    let newState = {...this.state};
    delete newState.inputs[id];
    this.setState(newState);
  };

  _handleSubmit = () => {
    return this._valid();
  };

  _valid = () => {
    let valid = true;
    for(let id of Object.keys(this.state.inputs)){
      let component = this.state.inputs[id];

      if(typeof component.props.valid !== 'undefined' && !component.props.valid) {
        if(!component.props.validate()){
          valid = false;
        }
      }
    }

    return valid;
  };

  hasText(children){
    let has = false;

    if(typeof children === 'string'){
      has = true;
    }

    if(Array.isArray(children)) {
      for (let child of children) {
        if (typeof child === 'string') {
          has = true;
          break;
        }
      }
    }

    return has;
  }

  renderChildren(child, index){
    let children = null;
    let parentProps = {register: this._register, unregister: this._unregister, onSubmit: this._handleSubmit, isValid: this._valid};

    if(child.props.children && !this.hasText(child.props.children)){
      children = React.Children.map(child.props.children, (c, i) => React.cloneElement(c, {id: parseInt(`${index}${i}`), ...parentProps}));
      parentProps.children = children;
    }
    return React.cloneElement(child, {id: index, ...parentProps});
  }

  render() {
    let { style } = this.props;
    return (
        <View style={style || {}}>
          {React.Children.map(this.props.children, (child, index) => this.renderChildren(child, index))}
        </View>
    );
  }
}

export {MPForm};
