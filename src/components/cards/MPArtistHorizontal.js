import React, { Component } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

class MPArtistHorizontal extends Component{

    render() {
        let {artist, selected, style} = this.props;
        let borderStyle = {};
        let iconStyle = {};

        if(selected == true){
            borderStyle = {
                borderColor: "#e13223",
                borderWidth: 2
            };
            iconStyle = {
                position: 'absolute',
                right: 0,
                top: 0
            };
        }

        return (
            <TouchableOpacity style={style || {}}>
                <View>
                    <View style={ [styles.stretchedArtistCardContainer, borderStyle] }>
                        <View style={ styles.stretchedArtistImage } backgroundColor={ '#f06' }></View>
                        <Text style={ styles.stretchedArtistText}>{ artist }</Text>
                    </View>
                    { selected && 
                    <Icon name='check-circle' color='#f00' size={18} containerStyle={ iconStyle || {} }/> 
                    }
                </View>
            </TouchableOpacity>
        );
    }
}

MPArtistHorizontal.propTypes = {
    artist: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    style: PropTypes.any,
};

const styles = StyleSheet.create({
	stretchedArtistCardContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.9,
        shadowRadius: 4,
        height: 60,
        marginBottom: 20,
        overflow: 'hidden'
      },
      stretchedArtistImage: {
        width: 60,
        height: 60,
      },
      stretchedArtistText: {
        color: "#000",
        paddingStart: 20,
        fontSize: 20,
      },
      stretchedArtistSelectedIcon: {
          position: 'absolute',
          right: 0,
          top: 0,
      }
});
export { MPArtistHorizontal };