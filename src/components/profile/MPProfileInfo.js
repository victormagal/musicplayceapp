import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {MPText} from '../general';
import {MPLocationPinIcon, MPVipIcon, MPVerifiedIcon} from '../../assets/svg';
import {ProfileIndicatorCE} from './ProfileIndicatorCE';

class MPProfileInfoComponent extends Component {

  renderItem = ({item}) => {
    return (
      <MPText style={styles.itemStyle}>{item.title}</MPText>
    );
  };

  render() {
    let {profile, editDescription} = this.props;

    let underlineStyle = profile.location ? {} : {textDecorationLine: 'underline'};
    let location = profile.location || 'Informe sua localização';

    return (
      <View style={ styles.parent }>
        <MPText style={styles.name}>{profile.name} {profile.lastName}</MPText>
        <View style={styles.row}>
          <MPText style={styles.username}>@{profile.username}</MPText>
          {profile.isVerified && ( <MPVerifiedIcon style={{marginStart: 5}}/>)}
        </View>
        <View style={{flexDirection: 'row', marginTop: 10,}}>
          <MPLocationPinIcon/>
          <MPText style={ [styles.location, underlineStyle] }>{location}</MPText>
        </View>
        {!profile.isManager && (
          <View>
            {profile.site && (
              <MPText style={styles.itemStyle}>{profile.site}</MPText>
            )}
            {!profile.site && (
              <MPText style={{color: '#fff', textDecorationLine: 'underline', marginEnd: 20, marginBottom: 20}}>Insira
                aqui seu site</MPText>
            )}
          </View>
        )}
        {profile.description && <MPText style={ styles.descriptionText}>{profile.description}</MPText>}
        {!profile.description && (
          <MPText style={ [styles.descriptionText, {textDecorationLine: 'underline'}]} onPress={ editDescription }>Fale
            sobre você, seu trabalho, qual seu objetivo com o MusicPlayce. Quanto tempo de experiência você tem? Já
            fez parceria com bandas? Já ganhou premiações? Tem fã clube?</MPText>
        )}
        {profile.vip && (
          <View style={styles.avaliadorContainer}>
            <MPVipIcon style={{alignSelf: 'flex-end'}}/>
            <MPText style={styles.avaliadorText}>SUPER AVALIADOR</MPText>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row'
  },
  name: {
    fontSize: 32,
    fontFamily: 'Montserrat-Bold',
    color: '#fff'
  },
  username: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#fff'
  },
  location: {
    fontSize: 14,
    color: '#fff',
    marginStart: 5,
    marginBottom: 15,
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
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    textAlign: 'right'
  },
  itemStyle: {
    color: '#fff',
    textDecorationLine: 'underline',
    marginEnd: 20,
    marginBottom: 20
  }
});

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const MPProfileInfo = connect(mapStateToProps)(MPProfileInfoComponent);
export {MPProfileInfo};

