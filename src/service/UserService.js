import {
  API,
  getIncludes,
  transformResponseData
} from './api';
import { AuthService } from './AuthService';
import axios from 'axios';

const API_USER = `${API}/users`;

class UserService {
  static createUser(user) {
    const data = {
      data: {
        type: "users",
        attributes: user
      }
    };

    return axios.post(API_USER, data)
      .then(response => response.data);
  }

  static updateUser(user) {
    const data = {
      data: {
        type: "update_user",
        attributes: user
      }
    };

    return axios.put(`${ API_USER }/${ user.id }`, data)
      .then(response => response.data);
  }

  static getUserById(id) {
    return axios.get(`${ API_USER }/${ id }`)
      .then(response => {
        const { data } = response.data;
        const { id, attributes } = data;
        return { id, ...attributes };
      });
  }

  static fetchUsers(search) {
    const params = {};

    if (search){
      params.query = JSON.stringify({
        name: {
          $like: `%${search}%`
        }
      });
    }

    return axios.get(API_USER, {params})
      .then(response => {
        //TODO: handle pagination
        const { data, meta } = response.data;
        return {
          data: transformResponseData(data),
          pagination: meta.pagination
        };
      });
  }

  //TODO: refactor
  static me() {
    return AuthService.me()
      .then(({ data }) => {
        const relations = getIncludes(data);
        const { id, attributes } = data.data;
        return { id, ...attributes, ...relations };
      });
  }

  static indications(){
    return axios.get(`${API_USER}/me/indications`)
      .then(response => {
        const { attributes } = response.data.data;
        return { ...attributes };
      });
  }

  static followers(){
    return axios.get(`${API_USER}/me/followers`)
      .then(response => {
        const { attributes } = response.data.data;
        return { ...attributes };
      });
  }

  static followUser(user){
    return axios.post(`${API_USER}/me/following/${user}`);
  }

  static stopFollowUser(user){
    return axios.delete(`${API_USER}/me/following/${user}`);
  }

  static getNotifications(){
    return axios.get(`${API_USER}/me/notifications`);
  }

  static getFollowNotifications(){
    return axios.get(`${API_USER}/me/notifications?searchType=following`);
  }

  static getNotificationSettings(){
    return axios.get(`${API_USER}/me/settings-notifications`);
  }
}

export {UserService};
