import React, { Component } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon } from 'react-native-elements';
import { MPSongListIcon, MPPlayIcon, MPStarIcon, MPSongMenuIcon, MPSongIndicateIcon, MPSongIndicateFullIcon, MPAddSongWhiteNoteIcon } from '../../assets/svg';
import images from '../../assets/img';
import { MPText } from '../general';

class MPSongRatingComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            menuOpen: false,
        }
    }

    toggleState = () => {
        this.setState({[menuOpen]: !this.state.menuOpen});
    }

    render() {
        let {songName, style, isAdded, indicateSong, indications, isNew} = this.props;
        return (
            <TouchableOpacity style={style || {}} >
            {
                this.state.menuOpen == false ? (
                    <View style={ styles.simpleArtistCardContainer }>
                        <View>
                            <View style={ styles.simpleArtistCardImage }>
                                <Image source={ images.daftPunk100 } />
                                {
                                    isAdded ? (
                                        <View onPress={this.toggleState.bind(this)} style={{position: 'absolute', top: 0, right: 0, width: 20}} >
                                            <MPSongMenuIcon style={{position: 'absolute', top: 8, right: 8}} />
                                        </View>
                                    ) : (
                                        <MPSongListIcon style={{position: 'absolute', top: 10, right: 10}}/>
                                    )
                                }
                                <MPPlayIcon style={{position: 'absolute', top: 38, left: 38}} />
                            </View>
                        </View>
                        <View>
                            <MPText style={ styles.simpleArtistCardText }>{ songName }</MPText>
                            <View style={{marginHorizontal : 10, marginBottom: 10, marginTop: 5, flexDirection: 'row'}}>
                                <MPStarIcon style={{marginEnd: 3}} />
                                <MPStarIcon style={{marginEnd: 3}} />
                                <MPStarIcon style={{marginEnd: 3}} />
                                <MPStarIcon style={{marginEnd: 3}} />
                                <MPStarIcon style={{marginEnd: 3}} />
                            </View>
                        </View>
                        {
                            indicateSong && indications == null && isNew == null &&(
                                <View style={ styles.indicateSongContainer }>
                                    <MPSongIndicateIcon />
                                    <MPText style={styles.indicateSongText}>INDIQUE</MPText>
                                </View>
                            )
                        }
                        {
                            indications != null && isNew == null && (
                                <View style={styles.indicateSongContainer}>
                                    <MPSongIndicateFullIcon />
                                    <MPText style={styles.indicateSongText}>{ indications } INDICAÇÕES</MPText>
                                </View>
                            )
                        }
                        {
                            isNew && (
                                <View style={ styles.newSongContainer}>
                                    <MPAddSongWhiteNoteIcon style={{alignSelf: 'center'}} />
                                    <MPText style={ styles.newSongText}>NOVIDADE</MPText>
                                </View>
                            )
                        }
                    </View>
                ) : (
                    <View style={ styles.menuContainer }>
                        <MPText style={ styles.menuCloseText}>X</MPText>
                        <MPText style={ styles.menuText }>EDITAR</MPText>
                        <View style={ styles.menuSeparator }></View>
                        <MPText style={ styles.menuText }>DESPUBLICAR</MPText>
                        <View style={ styles.menuSeparator }></View>
                        <MPText style={ styles.menuText }>EXCLUIR</MPText>
                    </View>
                )
            }
            </TouchableOpacity>
        );
    }
}

MPSongRatingComponent.propTypes = {
    songName: PropTypes.string.isRequired,
    style: PropTypes.any,
};

const styles = StyleSheet.create({
	simpleArtistCardContainer: {
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
        fontFamily: 'montSerrat',
        flexWrap: 'wrap',
      },
      indicateSongContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 10,
        height: 16,
        alignContent: 'center', 
        justifyContent: 'center'
     },
     indicateSongText:{
        fontSize: 9,
        fontFamily: 'montSerratMedium',
        color: '#000',
        marginStart: 5
    },
    newSongContainer: {
        backgroundColor: '#e13223',
        borderRadius: 8,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 10,
        alignContent: 'center',
        justifyContent: 'center',
    },
    newSongText: {
        fontSize: 10,
        fontFamily: 'montSerratMedium',
        color : '#FFF', 
    },
    menuContainer: {
        width: 100,
        backgroundColor: '#000',
        paddingVertical: 43,
        borderRadius: 4,
    },
    menuText: {
        fontSize: 11,
        fontFamily: 'montSerratMedium',
        color : '#FFF',
        textAlign: 'center'
    },
    menuSeparator: {
        width: 20,
        height: 1,
        backgroundColor: '#FFF',
        marginVertical: 20,
        alignSelf: 'center'
    },
    menuCloseText: {
        position: 'absolute',
        top: 8,
        right: 8,
        fontSize: 13,
        color: '#FFF',
        fontFamily: 'montSerratBold',
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPSongRating = connect(mapStateToProps)(MPSongRatingComponent);
export { MPSongRating };