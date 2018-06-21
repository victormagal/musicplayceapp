import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {connect} from 'react-redux';
import { MPText } from '../general';
import { MPLocationPinIcon, MPVipIcon, MPVerifiedIcon } from '../../assets/svg';
import { ProfileIndicatorCE } from './ProfileIndicatorCE';

class MPProfileInfoComponent extends Component{

    goToScreen = (rota) => {
        this.props.navigation.navigate(rota);
      }

    renderItem = ({item}) => (
        <MPText style={{color: '#fff', textDecorationLine: 'underline', marginEnd: 20}}>{item.title}</MPText>
    )

    render() {
        let { profile } = this.props;
       
        let underlineStyle = profile.location == '' ? {textDecorationLine: 'underline'}: {};
        let location = profile.location == '' ? 'Informe sua localização' : profile.location;

        return (
            <View style={ styles.parent }>
                <MPText style={styles.name}>{profile.name} {profile.lastName}</MPText>
                <MPText style={styles.username}>@{profile.username}
                { profile.isVerified ? (
                        <MPVerifiedIcon style={{marginStart: 5}} />
                    ) : null
                }</MPText>
                <View style={{flexDirection: 'row', marginTop: 10,}}>
                    <MPLocationPinIcon/>
                    <MPText style={ [styles.location, underlineStyle] }>{location}</MPText>
                </View>
                {
                    profile.isManager ? null : (
                        <View>
                            {
                                profile.sites != '' ? (
                                    <View>
                                        <FlatList data = {profile.sites}
                                            keyExtractor={(item,index) => item.id} 
                                            renderItem={this.renderItem}
                                            horizontal={true}
                                            style={{ marginBottom: 20, }}/>
                                    </View>
                                ) : (
                                    <MPText style={{color: '#fff', textDecorationLine: 'underline', marginEnd: 20, marginBottom: 20}}>Insira aqui seu site</MPText>
                                )
                            }
                        </View>
                    )
                }
                {
                    profile.description != '' ? (
                        <MPText style={ styles.descriptionText}>{profile.description}</MPText>
                    ) : (
                        <MPText style={ [styles.descriptionText, {textDecorationLine: 'underline'}]} onPress={ this.goToScreen.bind(this, 'EditProfileDescription')}>Fale sobre você, seu trabalho, qual seu objetivo com o MusicPlayce. Quanto tempo de experiência você tem? Já fez parceria com bandas? Já ganhou premiações? Tem fã clube?</MPText>
                    )
                }
                {
                    profile.vip ? (
                        <View style={styles.avaliadorContainer}>
                            <MPVipIcon style={{alignSelf: 'flex-end'}} />
                            <MPText style={styles.avaliadorText}>SUPER AVALIADOR</MPText>
                        </View>
                    ) : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parent: {
        marginHorizontal: 20,
    },
    name: {
        fontSize: 32,
        fontFamily: 'montSerratBold',
        color: '#fff'
    },
    username: {
        fontSize: 14,
        fontFamily: 'montSerrat',
        color: '#fff'
    },
    location: {
        fontSize: 14,
        color: '#fff',
        marginStart: 5,
        marginBottom: 15,
        fontFamily: 'montSerrat',
    },
    descriptionText: {
        fontSize: 12,
        fontFamily: 'montSerrat',
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
        fontFamily: 'montSerratMedium',
        fontSize: 10,
        textAlign: 'right'
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPProfileInfo = connect(mapStateToProps)(MPProfileInfoComponent);
export { MPProfileInfo };

