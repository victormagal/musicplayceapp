import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import { MPSongRating, MPText } from '../../components'
import images from '../../assets/img';
import { MPGradientButton } from '../buttons';
import { MPGradientBorderButton } from './MPGradientBorderButton';

class MPShowFolderShongsComponent extends Component{

    renderSongs = ({item}) => (
        <MPSongRating songName={item.songName} indicateSong={true} isAdded={true} />
    )

    render() {
        let { folderName, edit } = this.props;

        let songs = [
            {
                id: '00',
                songName: 'Nome da música',
            },
            {
                id: '01',
                songName: 'Nome da música',
            },
            {
                id: '02',
                songName: 'Camaro Amarelo',
            },
            {
                id: '03',
                songName: 'Nome da música',
            }
        ]
        
        return (
            <View style={ styles.parent }>
                <View style={ styles.topBarContainer }>
                    <MPText style={ styles.topBarText}>{ folderName }</MPText>
                    {
                        edit ? (
                            <View style={ styles.topBarButton}>
                                <MPGradientBorderButton  onPress={() => {}}/>
                            </View>
                        ) : null
                    }
                </View>
                <View style={ styles.sliderContainer}>
                    <FlatList
                        data={songs}
                        keyExtractor={(item) => item.id}
                        renderItem={this.renderSongs}
                        horizontal={true}
                        />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parent:{
        backgroundColor: '#FCFCFC',
        paddingVertical: 30,
        paddingHorizontal: 20,
        height: 270,
        borderBottomWidth: 1,
        borderColor: '#fff',
    },
    topBarContainer: {
        flexDirection: 'row',
    },
    topBarText: {
        fontSize: 16,
        fontFamily: 'montSerratMedium',
        color: '#000',
        alignSelf: 'center',
        marginEnd: 138,
    },
    topBarButton: {
        width: 64,
    },
    sliderContainer: {
        paddingTop: 10,
        flex: 1,
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPShowFolderSongs = connect(mapStateToProps)(MPShowFolderShongsComponent);
export { MPShowFolderSongs };

