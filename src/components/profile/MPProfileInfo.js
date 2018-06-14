import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {connect} from 'react-redux';
import { MPText } from '../general';
import { MPLocationPinIcon } from '../../assets/svg';
import { ProfileIndicatorCE } from './ProfileIndicatorCE';

class MPProfileInfoComponent extends Component{
    constructor(props){
        super(props);
        this.artist = {
            location: '',
            data: [
                {
                    id: '00',
                    title: 'Spotify',
                },
                {
                    id: '00',
                    title: 'YouTube',
                },
                {
                    id: '00',
                    title: 'Deezer',
                },
            ]
        }
    }

    renderItem = ({item}) => (
        <MPText style={{color: '#fff', textDecorationLine: 'underline', marginEnd: 20}}>{item.title}</MPText>
    )

    render() {
        let { profile,  } = this.props;
        let underlineStyle = profile.location == '' ? {textDecorationLine: 'underline'}: {};
        profile.location = profile.location == '' ? 'Informe sua localização' : profile.location;
        return (
            <View style={ styles.parent }>
                <MPText style={styles.name}>{profile.name}</MPText>
                <MPText style={styles.username}>@{profile.username}</MPText>
                <View style={{flexDirection: 'row', marginTop: 10,}}>
                    <MPLocationPinIcon/>
                    <MPText style={ [styles.location, underlineStyle] }>teste</MPText>
                </View>
                <View>
                    <FlatList data = {this.artist.data}
                        keyExtractor={(item,index) => item.id} 
                        renderItem={this.renderItem}
                        horizontal={true}
                        style={{ marginBottom: 20, }}/>
                </View>
                <MPText style={ styles.descriptionText}>Cantor, compositor e filósofo de ponto de ônibus.
                Compositor de Hits. Ganhou em 2015 o Prêmio Som Libre de autor do ano.
                 Os sonhos moram em casas com mais janelas do que paredes.</MPText>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <ProfileIndicatorCE style={{ flex: 1}} title="Indicações Feitas" subtitle="Explore" count={43}/>
                    <ProfileIndicatorCE style={{ flex: 1}} title="Seguidores" subtitle="Convide seus amigos" count={1.3}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parent: {
        marginHorizontal: 20,
        flex: 1,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff'
    },
    username: {
        fontSize: 14,
        color: '#fff'
    },
    location: {
        fontSize: 14,
        color: '#fff',
        marginStart: 5,
        marginBottom: 20,
    },
    descriptionText: {
        fontSize: 12,
        fontFamily: 'montSerrat',
        color: '#FFF',
        marginBottom: 20
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPProfileInfo = connect(mapStateToProps)(MPProfileInfoComponent);
export { MPProfileInfo };

