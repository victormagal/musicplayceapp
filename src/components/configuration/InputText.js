import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';

class InputTextComponent extends React.Component {

  render() {
    let { value, label } = this.props;
    return (
      <View style={styles.parent}>
        {
          this.props.fontLoaded ? (
            <View>
              <TextInput
                style={styles.text}
                placeholder={label}
                placeholderTextColor={"#686868"}
                underlineColorAndroid={"transparent"}
                value={value}
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
  },
  text: {
    fontSize: 16,
    paddingVertical: 10,
    fontFamily: 'montSerrat',
    color: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#B1B1B1'
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const InputText = connect(mapStateToProps)(InputTextComponent);
export { InputText };