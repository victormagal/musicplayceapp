import axios from 'axios';
import {API} from './api';
import {StorageService} from './StorageService';


const API_AUTH = `${API}/auth`;


class AuthService {

  static login(user){
    let params = {
      data: {
        type: "login",
        attributes: user
      }
    };

    return axios.post(`${API_AUTH}/login`, params)
                .then(response => {
                  StorageService.setToken(response.data);
                  return response.data;
                });
  }

  static logout(){
    StorageService.clear();
  }

  static recoverPassword(user){
    let params = {
      data: {
        type: "recoverPassword",
        attributes: user
      }
    };

    return axios.post(`${API_AUTH}/password/email`, params)
                .then(response => response.data);
  }

  static refreshToken(token){
    let params = {
      data : {
        type: "refresh",
        attributes: { token }
      }
    };

    return axios.post(`${API_AUTH}/refresh`, params)
                .then(response => response.data)
                .catch((e) => null);
  }

  static me(){
    return axios.get(`${API_AUTH}/me`)
                .then(response => response.data);
  }
}

export {AuthService};
