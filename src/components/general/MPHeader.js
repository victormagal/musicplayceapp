import React from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
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
      <View style={[styles.parent, {backgroundColor}, style || {}]}>
        <View style={styles.header}>
          {back && (
            <TouchableOpacity onPress={onBack}>
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
  parent: {
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
  },
  icons: {
    flexDirection: 'row',
    marginRight: 20
  },
  iconsLeft: {
    flexDirection: 'row',
    marginLeft: 20
  }
});

export { MPHeader };
