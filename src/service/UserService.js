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

  static indications(){
    return axios.get(`${API_USER}/me/indications`).then(response => {
      let {attributes} = response.data.data;
      return {...attributes};
    });

  }

  static followers(){
    return axios.get(`${API_USER}/me/followers`).then(response => {
      let {attributes} = response.data.data;
      return {...attributes};
    });
  }

  static followArtist(artist){
    return axios.post(`${API_USER}/me/following/${artist}`);
  }

  static stopFollowArtist(artist){
    return axios.delete(`${API_USER}/me/following/${artist}`);
  }

  static getNotifications(){
    return axios.get(`${API_USER}/me/notifications`);
    let {attributes} = response.data.data
    return {...attributes};
  }

  static getFollowNotifications(){
    return axios.get(`${API_USER}/me/notifications?searchType=following`);
    let {attributes} = response.data.data
    return {...attributes};
  }
}

export {UserService};
