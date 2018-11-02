import React from 'react';
import { View, StyleSheet, Platform, Alert, StatusBar, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { MPText } from '../general/MPText';
import {MPBackIcon, MPBackBlackIcon, MPLogoIcon, MPLogoBlackIcon, MPBackRedIcon, MPEmailTermsIcon} from '../../assets/svg';
import { MPGradientButton } from '../buttons';
import { UserService } from '../../service/UserService'

class MPHeader extends React.Component {
  
  sendEmail = () => {
    UserService.sendEmailTermsOfService().then( results => {
      console.warn(result)
      this.alertSuccessSendEmail()
    })
    .catch(error =>{
      console.warn('error')
    })
  }

  alertSuccessSendEmail = () => {
    Alert.alert(
      'Atenção',
      'Email enviado com sucesso',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
    )
  };
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
          <View style={[styles.column, styles.columnLeft]}>
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
          </View>
          <View style={[styles.column, styles.columnCenter]}>
            {logo}
          </View>
          <View style={[styles.column, styles.columnRight]}>
            {icons ?
              <View style={styles.iconsRight}>
                {icons}
              </View>
              : back &&
              <View style={styles.iconsRight} />
            }
          </View>
        </View>
        { title && title !== '' && (
          <MPText style={styles.title}>
            {title}
          </MPText>
        )}
        {
          terms  && (
          <MPGradientButton onPress={this.sendEmail}  icon={MPEmailTermsIcon} title={'Enviar para meu e-mail'} style={{position: 'absolute', bottom: -18, paddingVertical: 8, alignSelf: 'center'}} textStyle={{paddingStart: 18}}/>
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
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  columnLeft: { justifyContent: 'flex-start' },
  columnCenter: { justifyContent: 'center' },
  columnRight: { justifyContent: 'flex-end' },
  iconsLeft: { 
    marginLeft: 20,
    flexDirection: 'row',
  },
  iconsRight: {
    marginRight: 20,
    flexDirection: 'row',
  },
  backContainer: {
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  back: {
    width: 10,
    height: 12
  },
  logo: {
    width: 120,
    height: 20,
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
});

export { MPHeader };
