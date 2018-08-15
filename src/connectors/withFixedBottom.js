import React from 'react';
import {View, Keyboard} from 'react-native'
import hoistNonReactStatics from 'hoist-non-react-statics';

export default () => (WrappedComponent) => {
  class newClass extends React.Component {
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
      return (
        <View style={{ flex: 1, marginBottom: this.state.btnLocation }}>
          <WrappedComponent {...this.props} />
        </View>
      )
    }
  }
  return hoistNonReactStatics(newClass, WrappedComponent);
}
