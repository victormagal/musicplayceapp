import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { connect } from 'react-redux';

class TextAreaInputComponent extends React.Component {

  render() {
    return (
      <View style={styles.parent}>
        {
          this.props.fontLoaded ? (
            <View>
              <TextInput
                style={styles.text}
                multiline={true}
                numberOfLines={3}
                placeholder={"Esse é o placeholder"}
                placeholderTextColor={"#686868"}
                underlineColorAndroid={"transparent"}
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

const TextAreaInput = connect(mapStateToProps)(TextAreaInputComponent);
export { TextAreaInput };