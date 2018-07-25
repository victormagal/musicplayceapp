import React, { Component } from 'react';
import { StyleSheet, View, Linking, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { MPText } from '../general';
import { MPLocationPinIcon, MPVipIcon, MPVerifiedIcon } from '../../assets/svg';

class MPProfileInfo extends Component {

  render() {
    const { isMe, profile, onEditSite, onEditDescription } = this.props;
    const underlineStyle = (attribute) => attribute ? {} : { textDecorationLine: 'underline' };
    const profileSite = profile.site && (profile.site.includes('http') || profile.site.includes('https'))
        ? profile.site : `https://${ profile.site }`;

    return (
      <View style={{ marginHorizontal: 20 }}>
        <MPText style={styles.name}>
          { profile.name }
        </MPText>
        <View style={{ flexDirection: 'row' }}>
          <MPText style={styles.username}>
            @{ profile.username }
          </MPText>
          { profile.isVerified &&
            <MPVerifiedIcon style={{ marginLeft: 8 }} />
          }
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 15, alignItems: 'center' }}>
          { profile.description ?
            <View>
              <MPLocationPinIcon/>
              <MPText style={[ styles.location, underlineStyle(profile.location) ]}>
                { profile.city }/{ profile.state }
              </MPText>
            </View>
            : isMe &&
            <MPText style={[ styles.location, underlineStyle(profile.location) ]}>
              Informe sua localização
            </MPText>
          }
        </View>
        { !profile.isManager && profile.site ?
          <TouchableOpacity onPress={() => Linking.openURL(profileSite)}>
            <MPText style={styles.itemStyle}>
              { profile.social_networks }
            </MPText>
          </TouchableOpacity>
          : isMe &&
          <TouchableOpacity onPress={onEditSite}>
            <MPText style={styles.itemStyle}>
              Insira aqui suas redes sociais
            </MPText>
          </TouchableOpacity>
        }
        { profile.description ?
          <MPText style={styles.descriptionText}>
            { profile.description }
          </MPText>
          : isMe &&
          <TouchableOpacity onPress={onEditDescription}>
            <MPText style={[ styles.descriptionText, underlineStyle(profile.description)]}>
              Fale sobre você, seu trabalho, qual seu objetivo com o MusicPlayce. Quanto tempo de experiência você tem?
              Já fez parceria com bandas? Já ganhou premiações? Tem fã clube?
            </MPText>
          </TouchableOpacity>
        }
        { profile.vip &&
          <View style={styles.avaliadorContainer}>
            <MPVipIcon style={{ alignSelf: 'flex-end' }}/>
            <MPText style={styles.avaliadorText}>
              SUPER AVALIADOR
            </MPText>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 32,
    fontFamily: 'Montserrat-Bold',
    color: '#FFF'
  },
  username: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#FFF'
  },
  location: {
    fontSize: 14,
    color: '#FFF',
    marginLeft: 5,
    fontFamily: 'Montserrat-Regular',
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#FFF',
    marginBottom: 15
  },
  avaliadorContainer: {
    position: 'absolute',
    top: 60,
    alignSelf: 'flex-end',
    width: 70,
  },
  avaliadorText: {
    color: '#FFF',
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    textAlign: 'right'
  },
  itemStyle: {
    color: '#FFF',
    textDecorationLine: 'underline',
    marginEnd: 20,
    marginBottom: 20
  }
});

export {MPProfileInfo};

