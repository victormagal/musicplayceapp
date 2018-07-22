import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { applyFont } from './applyFont';


class MPTextComponent extends Component {

  render() {
    let text = this.props.children;

    return (
      <Text {...this.props}>
        {text}
      </Text>
    );
  }
}

const MPText = applyFont(MPTextComponent);
export { MPText };
