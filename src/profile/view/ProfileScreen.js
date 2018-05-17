import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo';


class ProfileScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={["rgba(1, 1, 1, 0.2)", "#e13223"]}
                    style={styles.gradient}>

                    <View style={styles.cover}>

                    </View>

                    <View>
                        <Text style={styles.name}>Bruno Caliman</Text>
                        <Text style={styles.username}>@brunocaliman_oficial</Text>
                    </View>


                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    cover: {
        height: 225
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff'
    },
    username: {
        fontSize: 14,
        color: '#fff'
    },
    gradient: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    button: {
        width: 230
    }
});

export {ProfileScreen};