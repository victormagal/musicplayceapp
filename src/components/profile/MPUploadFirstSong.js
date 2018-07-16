import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import { MPText, MPGradientButton } from '../../components';
import { MPSongAddIcon } from '../../assets/svg';


class MPUploadFirstSongComponent extends Component{

    render() {
        let { onPress } = this.props;
        
        return (
            <View style={ styles.parent }>
                <MPText style={styles.titleText}>Faça upload do seu material e divulgue seu trabalho!</MPText>
                <MPGradientButton icon={MPSongAddIcon} onPress={onPress} textSize={16}
                                  style={{marginBottom: 82, marginHorizontal: 10}} title={'Cadastrar nova música'}/>
                <MPText style={styles.emphText}>Faça upgrade para o plano premium e cadastre várias músicas</MPText>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parent: {
        padding: 40,
        backgroundColor: '#FCFCFC',
        borderBottomWidth: 1,
        borderColor: '#FFF'
    },
    titleText: {
        fontSize: 16,
        fontFamily: 'probaProRegular',
        color : '#777777',
        textAlign: 'center',
        marginBottom: 10,
        marginHorizontal: 10,
    },
    languageText: {
        fontSize: 12,
        fontFamily: 'montSerrat',
        color : '#FFF',
        marginEnd: 12,
    },
    emphText: {
        fontSize: 14,
        fontFamily: 'montSerratMedium',
        color: '#5994db',
        textAlign: 'center',
        textDecorationLine: 'underline',
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPUploadFirstSong = connect(mapStateToProps)(MPUploadFirstSongComponent);
export { MPUploadFirstSong };

