import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';

class MPTextFieldComponent extends React.Component {

  render() {
    let { value, label, multiline } = this.props;
    return (
      <View style={styles.parent}>
        {
          this.props.fontLoaded ? (
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
              labelTextStyle={{ fontFamily: 'montSerrat' }}
              style={{ fontFamily: 'montSerrat', fontSize: 16 }}
            /> 
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: 40,
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPTextField = connect(mapStateToProps)(MPTextFieldComponent);
export { MPTextField };