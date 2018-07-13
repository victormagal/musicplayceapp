import React from 'react';
import { View } from 'react-native';

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
    let valid = true;
    for(let id of Object.keys(this.state.inputs)){
      let component = this.state.inputs[id];

      if(typeof component.props.valid !== 'undefined' && !component.props.valid) {
        valid = false;
        component.validate();
      }
    }
    return valid;
  };

  renderChildren(child, index){
    let children = null;
    let parentProps = {register: this._register, unregister: this._unregister, onSubmit: this._handleSubmit};

    if(child.type.name === 'View' && child.props.children){
      children = React.Children.map(child.props.children, (child, i) => React.cloneElement(child, {id: parseInt(`${index}${i}`), ...parentProps}));
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
