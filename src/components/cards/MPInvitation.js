import React, { Component } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MPInvitationComponent extends Component{

    render() {
        let {userName, userEmail, selected} = this.props;
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
                zIndex: 99
            };
        }

        return (
            <TouchableOpacity>
                <View style={{paddingTop: 8}}>
                {
                    this.props.fontLoaded ? (
                        <View style={ styles.stretchedUserCardContainer }>
                            <View style={ [styles.stretchedUserCardInnerContainer, borderStyle] }>
                                <View>
                                    <Text style={ styles.stretchedUserText}>{ userName }</Text>
                                    <Text style={ styles.stretchedUserEmail}>{ userEmail }</Text>
                                </View>
                                <Icon type='material-community' name='email-outline' color='#5994db' size={22} containerStyle={ styles.emailUserIcon }/>
                            </View>
                            { selected &&
                                <Text style={ styles.stretchedUserConfirmationText }>Convite Enviado</Text>
                            }
                        </View>
                    ) : null
                }
                { selected && 
                    <Icon name='check-circle' color='#f00' size={18} containerStyle={ iconStyle }/>
                }
                </View>
            </TouchableOpacity>
        );
    }
}

MPInvitationComponent.propTypes = {
    userName: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    selected: PropTypes.bool
};

const styles = StyleSheet.create({
	stretchedUserCardContainer: {
        flexDirection: 'column',
        backgroundColor: '#e13223',
        borderRadius: 4,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.15,
        shadowRadius: 4,
        marginBottom: 12,
        padding: 0
      },
      stretchedUserCardInnerContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 4,
        height: 60,
        overflow: 'hidden',
      },
      stretchedUserImage: {
        width: 60,
        height: 60,
      },
      stretchedUserText: {
        color: "#000",
        paddingStart: 20,
        fontSize: 20,
        fontFamily: 'Montserrat-Regular'
      },
      stretchedUserConfirmationText: {
        color: '#fff',
        paddingStart: 10,
        paddingTop: 5,
        paddingBottom: 5,
        fontFamily: 'Montserrat-Bold'
      },
      stretchedUserEmail:{
        color: '#5994db',
        paddingStart: 20,
        fontSize: 14,
        fontFamily: 'Montserrat-Regular'
      },
      emailUserIcon: {
          start: 0,
          paddingEnd: 20,
          alignItems: 'flex-end',
          flex: 1,
      }
});
const mapStateToProps = ({ fontReducer }) => {
    return { ...fontReducer };
  };
  
const MPInvitation = connect(mapStateToProps)(MPInvitationComponent);
export { MPInvitation };
