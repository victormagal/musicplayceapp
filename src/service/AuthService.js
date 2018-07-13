import {API} from './api';
import axios from 'axios';


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
                .then(response => response.data);
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
}

export {AuthService};
