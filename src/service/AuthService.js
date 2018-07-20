import axios from 'axios';
import {API} from './api';
import {StorageService} from './StorageService';


const API_AUTH = `${API}/auth`;


class AuthService {

  static login(user) {
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

  static logout() {
    StorageService.clear();
  }

  static recoverPassword(user) {
    let params = {
      data: {
        type: "recoverPassword",
        attributes: user
      }
    };

    return axios.post(`${API_AUTH}/password/email`, params)
      .then(response => response.data);
  }

  static refreshToken(token) {
    return axios.post(`${API_AUTH}/refresh`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => response.data);
  }

  static me() {
    return axios.get(`${API_AUTH}/me`);
  }
}

export {AuthService};
