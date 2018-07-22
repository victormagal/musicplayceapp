import React from 'react';
import { 
  StyleSheet,
  View
} from 'react-native';
import { 
  MPGradientButton, 
  MPText 
} from '../../components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MPTitleFormContainerComponent extends React.Component {

  render() {
    let { 
      title, 
      textButton, 
      onPress,
      disabledButton
    } = this.props;

    return (
      <View style={styles.container}>
        <MPText style={styles.title}>{title}</MPText>
        <MPGradientButton style={styles.button}
                          title={textButton}
                          onPress={onPress}
                          disabled={disabledButton} />
      </View>
    );
  }
}

MPTitleFormContainerComponent.propTypes = {
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: 'black',
    flex: 1
  },
  button: {
    flex: 0,
    width: 90
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPTitleFormContainer = connect(mapStateToProps)(MPTitleFormContainerComponent);
export { MPTitleFormContainer };
