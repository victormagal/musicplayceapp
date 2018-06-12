import React, {Component} from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { applyFont } from './applyFont';


class MPTextComponent extends Component {

  render() {
    return (
      <Text {...this.props}>
        {this.props.children}
      </Text>
    );
  }
}

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const MPText = connect(mapStateToProps)(applyFont(MPTextComponent));
export { MPText };
