import React from 'react';
import { View, StyleSheet, Platform, Text, StatusBar, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { MPText } from '../general/MPText';
import {MPBackIcon, MPBackBlackIcon, MPLogoIcon, MPLogoBlackIcon} from '../../assets/svg';

class MPHeader extends React.Component {

  render() {
    let { title, back, onBack, inverse, transparent, icons, style, iconsLeft } = this.props;
    let logo = inverse ? <MPLogoBlackIcon style={styles.logo} /> :
                         <MPLogoIcon style={styles.logo} />;
    let backIcon = inverse ? <MPBackBlackIcon style={styles.back} /> : <MPBackIcon style={styles.back}/>;
    let backgroundColor = inverse || transparent ? 'transparent' : 'black';

    return (
      <View style={[{backgroundColor}, style || {}]}>
        <View style={styles.header}>
          {back && (
            <TouchableOpacity onPress={onBack} style={styles.backContainer}>
              {backIcon}
            </TouchableOpacity>
          )}
          {iconsLeft && (
            <View style={styles.iconsLeft}>
              {iconsLeft}
            </View>
          )}
          {logo}
          {icons && (
            <View style={styles.icons}>
              {icons}
            </View>
          )}
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
  title: PropTypes.string,
  back: PropTypes.bool,
  transparent: PropTypes.bool,
  onBack: PropTypes.func,
  icons: PropTypes.any,
  style: PropTypes.any
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 42,
    ...Platform.select({
        ios: {
          marginTop: 18,
        }})
  },
  backContainer: {
    position: 'absolute',
    top: 2,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  back: {
    width: 10,
    height: 20,
  },
  logo: {
    flex: 1,
    width: 100,
    height: 20,
    alignSelf: 'center'
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    paddingTop: 10,
    paddingBottom: 20,
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 40,
    textAlign: 'center'
  },
  icons: {
    position: 'absolute',
    right: 20,
    top: 12
  },
  iconsLeft: {
    position: 'absolute',
    left: 10
  }
});

export { MPHeader };
