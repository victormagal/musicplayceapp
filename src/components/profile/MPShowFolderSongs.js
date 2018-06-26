import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import { MPSongRating, MPText } from '../../components'
import images from '../../assets/img';
import { MPGradientButton } from '../buttons';
import { MPGradientBorderButton } from './MPGradientBorderButton';

class MPShowFolderShongsComponent extends Component{

    renderSongs = ({item}) => (
        <MPSongRating songName={item.songName} indicateSong={true} isAdded={true} onExclude={this.props.excludeSong} onUnpublish={this.props.unpublishSong} />
    )

    render() {
        let { folderName, edit, onEdit, excludeSong, unpublishSong } = this.props;

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
                        edit == true ? (
                            <View style={ styles.topBarButton}>
                                <MPGradientBorderButton  onPress={onEdit}/>
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
        height: 300,
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
    },
    topBarButton: {
        flex: 1,
        width: 64,
        alignSelf: 'flex-end'
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

