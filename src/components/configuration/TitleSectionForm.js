import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ButtonCE } from '../../components/ButtonCE';
import { connect } from 'react-redux';

class TitleSectionFormComponent extends React.Component {

  render() {
    let { title } = this.props;
    let { textButton } = this.props;
    return (
      <View style={styles.parent}>
        {
          this.props.fontLoaded ? (
            <View style={styles.container}>
              <Text style={styles.title}>{title}</Text>
              <ButtonCE style={styles.button} title={textButton} selected={true} onPress={() => { return false; }} />
            </View>
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: 40,
    backgroundColor: '#FCFCFC',
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontFamily: 'montSerratMedium',
    color: 'black',
    flex: 0.7
  },
  button: {
    flex: 0.3
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const TitleSectionForm = connect(mapStateToProps)(TitleSectionFormComponent);
export { TitleSectionForm };