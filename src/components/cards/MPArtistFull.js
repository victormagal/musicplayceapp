import React, { Component } from 'react'; 
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon } from 'react-native-elements';
import { MPSongListIcon, MPPlayIcon, MPStarIcon } from '../../assets/svg';
import { MPText } from '../../components';

class MPArtistFullComponent extends Component{

    render() {
        let {songName, imagePath, artistImagePath, artistName, style, onPress} = this.props;

        return (
            <TouchableOpacity style={style || {}} onPress={ onPress }>
            {
                this.props.fontLoaded ? (
                    <View style={ styles.simpleArtistCardContainer }>
                        <View>
                            <View style={ styles.simpleArtistCardImage } >
                                <Image source={imagePath} />
                                <MPSongListIcon style={{position: 'absolute', top: 4, right: 4}} />
                                <MPPlayIcon style={{ marginTop: 48, alignSelf: 'center'}} />
                            </View>
                        </View>
                        <View>
                            <MPText style={ styles.simpleArtistCardText }>{songName}</MPText>
                            <View style={ styles.starsContainer }>
                                <MPStarIcon style={{marginEnd: 3}} />
                                <MPStarIcon style={{marginEnd: 3}} />
                                <MPStarIcon style={{marginEnd: 3}} />
                                <MPStarIcon style={{marginEnd: 3}} />
                                <MPStarIcon style={{marginEnd: 3}} />
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 20, marginHorizontal: 10, alignContent: 'center'}}>
                                <View style={ styles.roundImage }>
                                    <Image source={artistImagePath}/>
                                </View>
                                <MPText style={ {fontSize: 11, color: '#000', fontFamily: 'probaProRegular', marginStart : 8, marginTop: 15 } }>{artistName}</MPText>
                            </View>
                        </View>
                        
                    </View>
                ) : null
            }
            </TouchableOpacity>
        );
    }
}

MPArtistFullComponent.propTypes = {
    songName: PropTypes.string.isRequired,
    imagePath: PropTypes.any.isRequired,
    artistImagePath: PropTypes.any.isRequired,
    onPress: PropTypes.func.isRequired,
    backgroundColor: PropTypes.any,
    style: PropTypes.any,
};

const styles = StyleSheet.create({
	simpleArtistCardContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 4,
        marginHorizontal: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      simpleArtistCardImage:{
        width: 120,
        height: 120,
        borderRadius: 4,
        backgroundColor: '#f60',
        overflow: 'hidden'
      },
      simpleArtistCardText: {
        fontSize: 14,
        color: '#000',
        paddingTop: 10,
        paddingStart: 10,
        paddingEnd: 10,
        fontFamily: 'montSerrat'
      },
      starsContainer: {
          marginHorizontal : 10, 
          marginBottom: 10, 
          marginTop: 5, 
          flexDirection: 'row'
        },
        roundImage: {
            borderRadius: 25, 
            width:40, 
            height: 40,
            overflow: 'hidden',
        },
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPArtistFull = connect(mapStateToProps)(MPArtistFullComponent);
export { MPArtistFull };