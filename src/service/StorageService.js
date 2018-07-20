import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {AuthService} from './AuthService';


const TOKEN_KEY = 'user_token_key';


class StorageService {

  static clear(){
    AsyncStorage.clear();
  }

  static setToken(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`;
    token.expires_in = (new Date().getTime() + ((token.expires_in - 1000) * 1000));
    AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }

  static getToken() {
    let now = new Date().getTime();

    return AsyncStorage.getItem(TOKEN_KEY).then((token) => {
      if(!token){
        return null;
      }

      token = JSON.parse(token);

      if (now > token.expires_in) {
        return AuthService.refreshToken(token.access_token).then(response => {
          StorageService.setToken(response);
          return response.access_token;
        }).catch(e => {
          console.log(e.response);
          console.log('StorageService refreshToken :: Error', e);
          return null;
        });
      }

      return token.access_token;
    });
  }
}

export {StorageService};

