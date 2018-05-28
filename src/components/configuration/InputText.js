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
              <Text style={styles.label}>{label}</Text>
              <TextInput style={styles.inputText} value={value} />
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
  label: {
    fontSize: 12,
    fontFamily: 'montSerrat',
    color: '#686868',
    marginBottom: 10
  },
  inputText: {
    borderBottomWidth: 1,
    borderBottomColor: '#5994DB',
    fontSize: 16,
    color: '#000000',
    fontFamily: 'montSerrat',
    paddingBottom: 5
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const InputText = connect(mapStateToProps)(InputTextComponent);
export { InputText };