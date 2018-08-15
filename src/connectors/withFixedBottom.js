import React from 'react';
import {View, Keyboard} from 'react-native'
import hoistNonReactStatics from 'hoist-non-react-statics';

export const withFixedBottom = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        btnLocation: 0
      };
    }

    componentDidMount () {
      this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        (e) => this.setState({ btnLocation: e.endCoordinates.height - 50 })
      );
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => this.setState({ btnLocation: 0 })
      );
    }

    componentWillUnmount () {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }

    render() {
      const style = this.props.style;
      const newProps = {...this.props};
      delete newProps.style;
      console.log( style, newProps);
      return (
          <WrappedComponent {...newProps} style={[style, {marginBottom: this.state.btnLocation}]} />
      )
    }
  }
}
