import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {MPText} from '../../components';
import {MPLogoRegisterIcon} from '../../assets/svg';
import {LinearGradient} from 'expo';
import {StorageService} from '../../service';


class StartScreen extends Component {

  componentDidMount() {
    StorageService.getToken().then(token => {
      if (token) {
        this.props.navigation.replace('home');
      } else {
        this.props.navigation.replace('login');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={["#e1322373", "#ffffff8C"]} style={styles.gradient} start={[0, 0]} end={[0, 1]}>
          <MPLogoRegisterIcon style={styles.logo}/>
          <MPText style={styles.title}>O seu lugar de música</MPText>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center'
  },
  logo: {
    alignSelf: 'center'
  },
  title: {
    fontFamily: 'probaProRegular',
    fontSize: 18,
    marginTop: 20,
    color: '#000',
    alignSelf: 'center'
  }
});

export {StartScreen}
