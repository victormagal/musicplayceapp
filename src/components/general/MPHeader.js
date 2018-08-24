import React from 'react';
import { View, StyleSheet, Platform, Text, StatusBar, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { MPText } from '../general/MPText';
import {MPBackIcon, MPBackBlackIcon, MPLogoIcon, MPLogoBlackIcon, MPBackRedIcon, MPEmailTermsIcon} from '../../assets/svg';
import { MPGradientButton } from '../buttons';

class MPHeader extends React.Component {

  render() {
    let { terms,title, back, onBack, inverse, transparent, icons, style, iconsLeft, withoutLogo, redBack } = this.props;
    let logo = inverse ? <MPLogoBlackIcon style={styles.logo} /> :
                         <MPLogoIcon style={styles.logo} />;
    let backIcon = inverse ? <MPBackBlackIcon style={styles.back} /> : <MPBackIcon style={styles.back}/>;
    let backgroundColor = inverse || transparent ? 'transparent' : 'black';
    logo = withoutLogo ? null : logo;
    backIcon = redBack ? <MPBackRedIcon style={styles.back} /> : backIcon;

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
        {
          terms  && (
          <MPGradientButton icon={MPEmailTermsIcon} title={'Enviar para meu e-mail'} style={{position: 'absolute', bottom: -18, paddingVertical: 8, alignSelf: 'center'}} textStyle={{paddingStart: 18}}/>
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
    marginRight: 10,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  iconsLeft: {
    flex: 0,
    marginLeft: 10,
    justifyContent: 'center'
  }
});

export { MPHeader };
