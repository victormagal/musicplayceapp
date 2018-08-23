import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import {MPText} from '../general';
import {MPInvitationIcon, MPValidatedFilledRedIcon} from '../../assets/svg'


class MPInvitation extends Component {

  render() {
    let {userName, userEmail} = this.props;
    let borderStyle = {
      borderColor: "#e13223",
      borderWidth: 2
    };
    let iconStyle = {
      position: 'absolute',
      right: 12,
      top: 0,
      zIndex: 99
    };

    return (
      <TouchableOpacity>
        <View style={{paddingTop: 8}}>
          <View style={ styles.stretchedUserCardContainer }>
            <View style={ [styles.stretchedUserCardInnerContainer, borderStyle] }>
              <View>
                <MPText style={ styles.stretchedUserText}>{ userName }</MPText>
                <MPText style={ styles.stretchedUserEmail}>{ userEmail }</MPText>
              </View>
              <MPInvitationIcon style={ styles.emailUserIcon }/>
            </View>
            <MPText style={ styles.stretchedUserConfirmationText }>Convite Enviado</MPText>
          </View>
          <MPValidatedFilledRedIcon style={ iconStyle }/>
        </View>
      </TouchableOpacity>
    );
  }
}

MPInvitation.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  stretchedUserCardContainer: {
    flexDirection: 'column',
    backgroundColor: '#e13223',
    borderRadius: 4,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    marginBottom: 12,
    padding: 0
  },
  stretchedUserCardInnerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 4,
    height: 60,
    overflow: 'hidden',
  },
  stretchedUserImage: {
    width: 60,
    height: 60,
  },
  stretchedUserText: {
    color: "#000",
    paddingStart: 20,
    fontSize: 20,
    fontFamily: 'Montserrat-Regular'
  },
  stretchedUserConfirmationText: {
    color: '#fff',
    paddingStart: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: 'Montserrat-Bold'
  },
  stretchedUserEmail: {
    color: '#5994db',
    paddingStart: 20,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular'
  },
  emailUserIcon: {
    position: 'absolute',
    top: 20, 
    right: 20,
  }
});

export {MPInvitation};
