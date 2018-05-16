import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ButtonCE, ProfileIndicatorCE} from './src/components';
import {LinearGradient} from 'expo';


export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <LinearGradient colors={["#e13223", "#ffffff"]} style={styles.gradient}>
                    <ButtonCE style={styles.button} title="TITLE"/>

                    <View style={{flexDirection: 'row', flex: 1}}>
                        <ProfileIndicatorCE style={{marginTop: 10, flex: 1}}
                                            title="Indicações Feitas"
                                            subtitle="Explore"
                                            count={4}/>
                        <ProfileIndicatorCE style={{marginTop: 10, flex: 1}} title="Seguidores" subtitle="Convide seus amigos"/>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gradient: {
        flex: 1,
        paddingTop: 18,
        alignItems: 'center'
    },
    button: {
        width: 230
    }
});
