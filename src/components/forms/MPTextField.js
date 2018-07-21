import React from 'react';
import {
  StyleSheet,
  View,
  Platform
} from 'react-native';
import {TextField} from 'react-native-material-textfield';

class MPTextField extends React.Component {

  getTextFieldStyle() {
    let style = {fontSize: 16};
    style['fontFamily'] = Platform.OS === 'ios' ? 'Montserrat-Regular' : 'montSerrat';
    return style;
  }

  getLabelStyle() {
    let style = {};
    style['fontFamily'] = Platform.OS === 'ios' ? 'Montserrat-Regular' : 'montSerrat';
    return style;
  }

  render() {
    let {
      value,
      label,
      multiline,
      style,
      onFocus,
      onBlur,
      onChangeText,
      textProps
    } = this.props;

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
          onFocus={ onFocus }
          onBlur={ onBlur }
          onChangeText={ onChangeText }
          {...textProps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
  }
});

export {MPTextField};
