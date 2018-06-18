import React, { Component } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon } from 'react-native-elements';
import { MPSongListIcon, MPPlayIcon, MPStarIcon, MPSongMenuIcon, MPSongIndicateIcon, MPSongIndicateFullIcon } from '../../assets/svg';
import images from '../../assets/img';
import { MPText } from '../general';

class MPSongRatingComponent extends Component{

    render() {
        let {songName, backgroundColor, style, onPress, isAdded, indicateSong, indications} = this.props;
        return (
            <TouchableOpacity style={style || {}} onPress={ onPress }>
            {
                this.props.fontLoaded ? (
                    <View style={ styles.simpleArtistCardContainer }>
                        <View>
                            <View style={ styles.simpleArtistCardImage } backgroundColor={ backgroundColor }>
                                <Image source={ images.daftPunk100 } />
                                {
                                    isAdded ? (
                                        <MPSongMenuIcon style={{position: 'absolute', top: 8, right: 8}}/>
                                    ) : (
                                        <MPSongListIcon style={{position: 'absolute', top: 10, right: 10}}/>
                                    )
                                }
                                <MPPlayIcon style={{position: 'absolute', top: 38, left: 38}} />
                            </View>
                        </View>
                        <View>
                            <Text style={ styles.simpleArtistCardText }>{ songName }</Text>
                            <View style={{marginHorizontal : 10, marginBottom: 10, marginTop: 5, flexDirection: 'row'}}>
                                <MPStarIcon style={{marginEnd: 3}} />
                                <MPStarIcon style={{marginEnd: 3}} />
                                <MPStarIcon style={{marginEnd: 3}} />
                                <MPStarIcon style={{marginEnd: 3}} />
                                <MPStarIcon style={{marginEnd: 3}} />
                            </View>
                        </View>
                        {
                            indicateSong && indications == null &&(
                                <View style={ styles.indicateSongContainer }>
                                    <MPSongIndicateIcon />
                                    <MPText style={styles.indicateSongText}>INDIQUE</MPText>
                                </View>
                            )
                        }
                        {
                            indications != null && (
                                <View style={styles.indicateSongContainer}>
                                    <MPSongIndicateFullIcon />
                                    <MPText style={styles.indicateSongText}>{ indications } INDICAÇÕES</MPText>
                                </View>
                            )
                        }
                    </View>
                ) : null
            }
            </TouchableOpacity>
        );
    }
}

MPSongRatingComponent.propTypes = {
    songName: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    backgroundColor: PropTypes.any,
    style: PropTypes.any,
};

const styles = StyleSheet.create({
	simpleArtistCardContainer: {
        flex: 1,
        width: 100,
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 4,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      simpleArtistCardImage:{
        width: 100,
        height: 100,
        borderRadius: 4,
        backgroundColor: '#f60',
        overflow: 'hidden',
      },
      simpleArtistCardText: {
        fontSize: 14,
        color: '#000',
        paddingTop: 10,
        paddingStart: 10,
        paddingEnd: 10,
        fontFamily: 'montSerrat'
      },
      indicateSongContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 10,
        alignContent: 'center', 
        justifyContent: 'center'
     },
     indicateSongText:{
        fontSize: 9,
        fontFamily: 'montSerratMedium',
        color: '#000',
        marginStart: 5
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPSongRating = connect(mapStateToProps)(MPSongRatingComponent);
export { MPSongRating };