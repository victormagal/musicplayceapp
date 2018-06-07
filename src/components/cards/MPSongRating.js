import React, { Component } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon } from 'react-native-elements';
import { MPSongListIcon, MPPlayIcon, MPStarIcon } from '../../assets/svg';

class MPSongRatingComponent extends Component{

    render() {
        let {songName, backgroundColor, style, onPress} = this.props;

        return (
            <TouchableOpacity style={style || {}} onPress={ onPress }>
            {
                this.props.fontLoaded ? (
                    <View style={ styles.simpleArtistCardContainer }>
                        <View>
                            <View style={ styles.simpleArtistCardImage } backgroundColor={ backgroundColor }>
                                <MPSongListIcon style={{position: 'absolute', top: 10, right: 10}} />
                                <MPPlayIcon style={{ marginTop: 38, alignSelf: 'center'}} />
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
        shadowOpacity: 0.9,
        shadowRadius: 4,
      },
      simpleArtistCardImage:{
        width: 100,
        height: 100,
        borderRadius: 4,
        backgroundColor: '#f60'
      },
      simpleArtistCardText: {
        fontSize: 14,
        color: '#000',
        paddingTop: 10,
        paddingStart: 10,
        paddingEnd: 10,
        fontFamily: 'montSerrat'
      }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPSongRating = connect(mapStateToProps)(MPSongRatingComponent);
export { MPSongRating };