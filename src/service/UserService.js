import {API} from './api';
import axios from 'axios';


const API_USER = `${API}/users`;


class UserService {

  static createUser(user) {
    let data = {
      data: {
        type: "users",
        attributes: user
      }
    };

    return axios.post(API_USER, data)
      .then(response => response.data);
  }

}

export {UserService};
