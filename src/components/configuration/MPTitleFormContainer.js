import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MPGradientButton } from '../../components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MPTitleFormContainerComponent extends React.Component {

  render() {
    let { title, textButton, onPress } = this.props;

    return (
      <View style={styles.parent}>
        {
          this.props.fontLoaded ? (
            <View style={styles.container}>
              <Text style={styles.title}>{title}</Text>
              <MPGradientButton style={styles.button} title={textButton} onPress={onPress} />
            </View>
          ) : null
        }
      </View>
    );
  }
}

MPTitleFormContainerComponent.propTypes = {
  onPress: PropTypes.func
};

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

const MPTitleFormContainer = connect(mapStateToProps)(MPTitleFormContainerComponent);
export { MPTitleFormContainer };
