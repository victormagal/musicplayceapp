import React, { Component } from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, StatusBar } from 'react-native';
import { MPText } from '../../components';
import { MPLogoRegisterIcon } from '../../assets/svg';
import LinearGradient from 'react-native-linear-gradient';
import { StorageService } from '../../service';
import { authSetStorageUser } from '../../state/action';

class StartScreenComponent extends Component {
  componentDidMount() {
    StorageService.getToken().then(token => {
      const { navigation, dispatch } = this.props;
      if (token) {
        StorageService.getUser().then(user => {
          if(user) {
            dispatch(authSetStorageUser(user));
            navigation.replace('home');
          }else{
            navigation.replace('login');
          }
        });
      } else {
        navigation.replace('login');
      }
    }).catch(e => {
      console.log('StartScreen componentDidMount :: Error', e)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={["#e1322373", "#ffffff8C"]} style={styles.gradient}>
          <StatusBar
            translucent={true}
            backgroundColor='#e1322373'
            barStyle='light-content'
          />
          <MPLogoRegisterIcon style={styles.logo}/>
          <MPText style={styles.title}>
            O seu lugar de música
          </MPText>
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
    fontFamily: 'ProbaPro-Regular',
    fontSize: 18,
    marginTop: 20,
    color: '#000',
    alignSelf: 'center'
  }
});

const mapStateToProps = () => { return {}; };
const StartScreen = connect(mapStateToProps)(StartScreenComponent);
export {StartScreen}
