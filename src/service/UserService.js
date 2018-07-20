import {API, getIncludes} from './api';
import {AuthService} from './AuthService';
import axios from 'axios';


const API_USER = `${API}/users`;
const API_CURRENT_USER = `${API}/auth/users/me`;


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

  static updateUser(user) {
    let data = {
      data: {
        type: "update_user",
        attributes: user
      }
    };

    return axios.put(API_CURRENT_USER, data)
      .then(response => response.data);
  }

  //TODO: refactor
  static me() {
    return AuthService.me()
      .then(({data}) => {
        let relations = getIncludes(data);
        let {id, attributes} = data.data;
        let {userProfile} = relations;
        userProfile = {...data.attributes, ...userProfile[0]};
        userProfile.songSaves = relations.songSaves;
        userProfile.userFollowing = relations.userFollowing;
        return {user: {id, ...attributes}, profile: userProfile};
      });
  }
}

export {UserService};
