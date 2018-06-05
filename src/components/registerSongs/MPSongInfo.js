import React, { Component } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon } from 'react-native-elements';

class MPSongInfoComponent extends Component{

    render() {
        let {title, info, selected, onPress, style} = this.props;
        let borderStyle = {};
        let iconStyle = {};

        if(selected == true){
            borderStyle = {
                borderColor: "#e13223",
                borderWidth: 2
            };
            iconStyle = {
                position: 'absolute',
                right: 2    ,
                top: 0
            };
        }

        return (
            <TouchableOpacity onPress={ onPress }>
                <View style={{paddingTop: 8}}>
                    <View style={[styles.parent, borderStyle, style]}>
                    {
                        this.props.fontLoaded ? (
                            <View>
                                <Text style={styles.titleText}>{ title }</Text>
                                <Text style={styles.infoText}>{ info }</Text>
                            </View>
                        ) :null
                    }
                    </View>
                    { selected && 
                    <Icon name='check-circle' color='#f00' size={18} containerStyle={ iconStyle }/> 
                    }
                </View>
            </TouchableOpacity>
        );
    }
}

MPSongInfoComponent.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    info: PropTypes.string,
    selected: PropTypes.bool,
    style: PropTypes.any,
};

const styles = StyleSheet.create({
	parent: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 4,
        marginHorizontal: 10,
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOpacity: 0.15,
        shadowRadius: 2,
        shadowOffset: {
        width: 1,
        height: 1
        },
        height: 78,
        width: 170,
        marginBottom: 2,
        flexGrow: 1,
      },
      titleText: {
        color: "#000",
        paddingStart: 10,
        fontSize: 12,
        fontFamily: 'montSerratMedium' 
      },
      infoText: {
          color: '#9b9b9b',
          fontSize: 10,
          fontFamily: 'montSerrat',
          paddingStart: 10,
      }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPSongInfo = connect(mapStateToProps)(MPSongInfoComponent);
export { MPSongInfo };