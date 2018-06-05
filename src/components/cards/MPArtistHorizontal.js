import React, { Component } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class MPArtistHorizontalComponent extends Component{

    render() {
        let {artist, selected, style, onPress} = this.props;
        let borderStyle = {};
        let iconStyle = {};

        if(selected == true){
            borderStyle = {
                borderColor: "#e13223",
                borderWidth: 2
            };
            iconStyle = {
                position: 'absolute',
                right: 12,
                top: 0,
                zIndex: 99,
            };
        }

        return (
            <TouchableOpacity style={style || {}} onPress={ onPress }>
                <View style={{paddingTop: 8}}>
                    { selected && 
                    <Icon name='check-circle' color='#f00' size={18} containerStyle={ iconStyle }/> 
                    }
                    <View style={ [styles.stretchedArtistCardContainer, borderStyle] }>
                        <View style={ styles.stretchedArtistImage } backgroundColor={ '#f06' }></View>
                        { 
                            this.props.fontLoaded ? (
                                <View>
                                    <Text style={ styles.stretchedArtistText}>{ artist }</Text>
                                </View>
                            ) : null
                        }
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

MPArtistHorizontalComponent.propTypes = {
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
        marginHorizontal: 20,
        shadowColor: '#000000',
        shadowOpacity: 0.15,
        shadowRadius: 2,
        shadowOffset: {
        width: 1,
        height: 1
        },
        height: 60,
        marginBottom: 12,
        zIndex: 1,
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
        fontFamily: 'montSerrat' 
      },
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPArtistHorizontal = connect(mapStateToProps)(MPArtistHorizontalComponent);
export { MPArtistHorizontal };