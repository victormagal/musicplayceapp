import React, { Component } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

class MPFolder extends Component{

    render() {
        let {folderName, musicAmount, selected} = this.props;
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

                <View>
                    <View style={ [styles.chooseFolderCardContainer, borderStyle] }>
                        <View style={ styles.chooseFolderImage }>
                            <Icon type='font-awesome' name='folder-open-o' color='#5994db' />
                        </View>
                        <View style={ styles.chooseFolderTextContainer }>
                            <Text style={ styles.chooseFolderText}>{ folderName }</Text>
                            <Text style={ styles.chooseFolderSubText}>{ musicAmount }</Text>
                        </View>
                    </View>
                    { selected &&
                    <Icon name='check-circle' color='#f00' size={18} containerStyle={ iconStyle }/>
                    }
                </View>
            </TouchableOpacity>
        );
    }
}

MPFolder.propTypes = {
    folderName: PropTypes.string.isRequired,
    musicAmount: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    selected: PropTypes.bool
};

const styles = StyleSheet.create({
	chooseFolderCardContainer: {
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
      chooseFolderImage: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
      },
      chooseFolderText: {
        color: "#000",
        paddingStart: 20,
        fontSize: 20,
      },
      chooseFolderSubText: {
        color: "#c0c0c0",
        paddingStart: 20,
        fontSize: 10,
      },
      chooseFolderSelectedIcon: {
          position: 'absolute',
          right: 0,
          top: 0,
      },
});
export { MPFolder };