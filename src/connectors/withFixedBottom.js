import React from 'react';
import {View, Keyboard, Platform} from 'react-native'

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
        (e) => {
          this.setState({ btnLocation: e.endCoordinates.height })
        }
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
      if(Platform.OS === 'ios') {
        const style = this.props.style;
        const newProps = {...this.props};
        delete newProps.style;
        return (
          <WrappedComponent {...newProps} style={[style, {marginBottom: this.state.btnLocation}]}/>
        );
      }
      return (
        <WrappedComponent {...this.props}/>
      )
    }
  }
}
