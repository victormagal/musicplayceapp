import React, { Component } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class MPArtistComponent extends Component{

    render() {
        let {artist, backgroundColor, style, onPress} = this.props;

        return (
            <TouchableOpacity style={style || {}} onPress={ onPress }>
            {
                this.props.fontLoaded ? (
                    <View style={ styles.simpleArtistCardContainer }>
                        <View style={ styles.simpleArtistCardImage } backgroundColor={ backgroundColor }></View>
                        <Text style={ styles.simpleArtistCardText }>{ artist }</Text>
                    </View>
                ) : null
            }
            </TouchableOpacity>
        );
    }
}

MPArtistComponent.propTypes = {
    artist: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    backgroundColor: PropTypes.any,
    style: PropTypes.any,
};

const styles = StyleSheet.create({
	simpleArtistCardContainer: {
        width: 100,
        height: 152,
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
        paddingBottom: 26,
        fontFamily: 'montSerrat'
      }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPArtist = connect(mapStateToProps)(MPArtistComponent);
export { MPArtist };