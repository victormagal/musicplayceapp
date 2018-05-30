import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';

class MPTextFieldComponent extends React.Component {

  render() {
    let { value, label } = this.props;
    return (
      <View style={styles.parent}>
        {
          this.props.fontLoaded ? (
            <View>
              <TextField
                lineWidth={1}
                activeLineWidth={1}
                disabledLineWidth={0}
                label={label}
                value={value}
                labelFontSize={12}
                baseColor={'rgba(104, 104, 104, 0.8)'}
                tintColor={'rgba(177, 177, 177, 0.8)'}
                labelTextStyle={{ fontFamily: 'montSerrat' }}
                style={{ fontFamily: 'montSerrat', fontSize: 16 }}
              />
            </View>
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    marginTop: 20,
    marginHorizontal: 40,
    display: 'flex',
    backgroundColor: '#FCFCFC',
    justifyContent: 'flex-end'
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPTextField = connect(mapStateToProps)(MPTextFieldComponent);
export { MPTextField };