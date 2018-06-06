import React, { Component } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MPSongComponent extends Component{

    render() {
        let {songName, composers, onPress, style} = this.props;

        return (
            <TouchableOpacity style={[styles.parent, style]}>
                <View>
                {
                    this.props.fontLoaded ? (
                        <View>
                            <View style={ styles.songHeaderContainer }>
                                <Icon name={'controller-play'} type={'entypo'} color='#000' size={24} containerStyle={ styles.songHeaderIcon }/>
                                <Text style={ styles.songHeaderText}>Tocando em Frente</Text>
                            </View>
                            <Text style={ styles.songCardTitle}>COMPOSITORES</Text>
                            <Text>
                                <Text style={ styles.songCardArtist}>Almir Sater</Text> e <Text style={ styles.songCardArtist}>Zé da Clave</Text>
                            </Text>

                        </View>
                    ) : null
                }
                </View>
            </TouchableOpacity>
        );
    }
}

MPSongComponent.propTypes = {
    songName: PropTypes.string,
    composers: PropTypes.array,
    onPress: PropTypes.func,
    style: PropTypes.any,
};

const styles = StyleSheet.create({
	parent: {
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 30,
        padding: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.9,
        shadowRadius: 4,
    },
    songHeaderContainer: {
        flexDirection: 'row',
        alignContent: 'flex-start',
        marginBottom: 20,
    },
    songHeaderText: {
        fontSize: 24,
        fontFamily: 'montSerrat',
        color: '#000',
    },
    songHeaderIcon: {
        marginEnd: 14,
    },
    songCardTitle: {
        fontSize: 10,
        fontFamily: 'montSerrat',
        color: '#919191',
        letterSpacing: 1
    },
    songCardText:{
        fontSize: 15,
        color: '#000',
        fontFamily: 'montSerratMedium',
    },
    songCardArtist: {
        textDecorationLine: 'underline'
    }
});
const mapStateToProps = ({ fontReducer }) => {
    return { ...fontReducer };
  };
  
const MPSong = connect(mapStateToProps)(MPSongComponent);
export { MPSong };