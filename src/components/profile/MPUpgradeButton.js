import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import { MPSongRating, MPText } from '../../components';
import { MPUpgradeNoteIcon } from '../../assets/svg';
import { MPGradientButton } from '../buttons';

class MPUpgradeButtonComponent extends Component{

    render() {
        let { song } = this.props;
        
        return (
            <View style={ styles.parent }>
                <MPSongRating songName={song.songName} isAdded={true} indicateSong={true} style={styles.cardContainer} />
                <View style={styles.upgradeContainer}>
                    <MPUpgradeNoteIcon  style={{alignSelf: 'center',}}/>
                    <MPText style={ styles.upgradeText}>Assine o plano premium para cadastrar mais músicas!</MPText>
                    <MPGradientButton title={'Fazer upgrade'} textSize={16}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
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
        fontFamily: 'probaProRegular',
        color: '#777777',
        textAlign: 'center',
        flexWrap: 'wrap',
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPUpgradeButton = connect(mapStateToProps)(MPUpgradeButtonComponent);
export { MPUpgradeButton };

