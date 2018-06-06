import React from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { MPText } from '../general/MPText';
import {MPBackIcon, MPLogoIcon} from '../../assets/svg';

class MPHeader extends React.Component {

  render() {
    let { title, back, onBack } = this.props;
    return (
      <View style={styles.parent}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.header}>
          {back && (
            <TouchableOpacity onPress={onBack}>
              <MPBackIcon style={styles.back}/>
            </TouchableOpacity>
          )}

          <MPLogoIcon style={styles.logo} />
        </View>
        { title && (
          <MPText style={styles.title}>
            {title}
          </MPText>
        )}
      </View>
    );
  }
}

MPHeader.propTypes = {
  title: PropTypes.string.isRequired,
  back: PropTypes.bool,
  onBack: PropTypes.func
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: 'black',
    paddingBottom: 15
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
  },
  back: {
    width: 10,
    height: 20,
    marginLeft: 20
  },
  logo: {
    flex: 1,
    width: 120,
    height: 20,
    alignSelf: 'center'
  },
  title: {
    fontFamily: 'montSerrat',
    marginTop: 20,
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 40,
    textAlign: 'center'
  }
});

export { MPHeader };
