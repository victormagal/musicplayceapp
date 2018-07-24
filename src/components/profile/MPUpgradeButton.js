import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { MPSongRating, MPText } from '../../components';
import { MPUpgradeNoteIcon } from '../../assets/svg';
import { MPGradientButton } from '../buttons';


class MPUpgradeButton extends Component{

    render() {
        let { song } = this.props;
        
        return (
            <View style={ styles.parent }>
                <MPSongRating isDraft={song && song.isDraft}
                              rating={3} isAdded={true}
                              indicateSong={true}
                              song={song}
                              style={styles.cardContainer} />
                <View style={styles.upgradeContainer}>
                    <MPUpgradeNoteIcon  style={{alignSelf: 'center',}}/>
                    <MPText style={ styles.upgradeText}>Assine o plano premium para cadastrar mais músicas!</MPText>
                    <MPGradientButton title={'Fazer upgrade'} textSize={16} onPress={ () => {}}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parent: {
        backgroundColor: '#FCFCFC',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#FFF',
        paddingVertical: 44,
    },
    cardContainer: {
        marginStart: 40, 
        marginEnd: 45,
    },
    upgradeContainer: {
        marginEnd: 20,
        alignContent: 'center',
        justifyContent: 'space-between',
        width: 150,

    },
    upgradeText:{
        fontSize: 16,
        fontFamily: 'ProbaPro-Regular',
        color: '#777777',
        textAlign: 'center',
        flexWrap: 'wrap',
    }
});

export { MPUpgradeButton };

