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
          {icons ?
            <View style={styles.icons}>
              {icons}
            </View>
            : back &&
            <View style={styles.icons} />
          }
        </View>
        { title && title !== '' && (
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
    flex: 0,
    width: 50,
    marginLeft: 10,
    marginTop: 12,
    alignItems: 'center'
  },
  back: {
    width: 10,
    height: 20
  },
  logo: {
    flex: 1,
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
    flex: 0,
    width: 50,
    marginRight: 10,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  iconsLeft: {
    flex: 0,
    width: 50,
    marginLeft: 10,
    justifyContent: 'center'
  }
});

export { MPHeader };
