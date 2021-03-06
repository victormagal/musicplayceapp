import axios from 'axios';
import { API_AUTH } from './api';
import { StorageService } from './StorageService';

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
        return AuthService.setToken(response.data);
      });
  }

  static setToken(responseData) {
    StorageService.setToken(responseData);
    return AuthService.me().then(({ data }) => {
      let { id, attributes } = data.data;
      let user = { id, ...attributes };
      StorageService.setUser(user);
      return user;
    });
  }

  static logout() {
    delete axios.defaults.headers.common['Authorization'];
    StorageService.clear();
  }

  static recoverPassword(user) {
    let params = {
      data: {
        type: "recoverPassword",
        attributes: {
          email: user
        }
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

export { AuthService };
