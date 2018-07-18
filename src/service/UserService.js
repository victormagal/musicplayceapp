import {API, getIncludes} from './api';
import {AuthService} from './AuthService';
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
