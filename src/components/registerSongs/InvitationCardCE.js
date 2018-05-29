import React, { Component } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

class InvitationCardCE extends Component{

    render() {
        let {artistName, artistEmail, selected} = this.props;
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
            <TouchableOpacity>
                <View style={ styles.stretchedArtistCardContainer }>
                    <View style={ [styles.stretchedArtistCardInnerContainer, borderStyle] }>
                        <View>
                            <Text style={ styles.stretchedArtistText}>{ artistName }</Text>
                            <Text style={ styles.stretchedArtistEmail}>{ artistEmail }</Text>
                        </View>
                        <Icon type='material-community' name='email-outline' color='#5994db' size={22} containerStyle={ styles.emailArtistIcon }/>
                    </View>
                    { selected &&
                        <Text style={ styles.stretchedArtistConfirmationText }>Convite Enviado</Text>
                    }
                </View>
                { selected && 
                    <Icon name='check-circle' color='#f00' size={18} containerStyle={ iconStyle }/>
                }
            </TouchableOpacity>
        );
    }
}

InvitationCardCE.propTypes = {
    artist: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    selected: PropTypes.bool
};

const styles = StyleSheet.create({
	stretchedArtistCardContainer: {
        flexDirection: 'column',
        backgroundColor: '#e13223',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.9,
        shadowRadius: 4,
        marginBottom: 10,
        padding: 0
      },
      stretchedArtistCardInnerContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 4,
        height: 60,
        overflow: 'hidden',
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
      stretchedArtistConfirmationText: {
        color: '#fff',
        fontWeight: 'bold',
        paddingStart: 10,
        paddingTop: 5,
        paddingBottom: 5,
      },
      stretchedArtistEmail:{
        color: '#5994db',
        paddingStart: 20,
        fontSize: 14,
      },
      emailArtistIcon: {
          start: 0,
          paddingEnd: 20,
          alignItems: 'flex-end',
          flex: 1,
      }
});
export { InvitationCardCE };