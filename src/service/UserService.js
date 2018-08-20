import {
  API,
  getIncludes,
  transformResponseData
} from './api';
import { Platform } from 'react-native';
import { AuthService } from './AuthService';
import axios from 'axios';

const API_AUTH = `${API}/auth/users/me`;
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

  static uploadImage(file, id) {
    let formData = new FormData();

    if (!file) {
      return Promise.resolve();
    }

    formData.append('picture', {
      uri: file.uri,
      name: file.fileName,
      type: `images/${ file.fileName.split('.')[1] }`
    });

    let endpointUrl = `${ API_USER }/me/picture`;
    if (id) {
      endpointUrl = `${ API_USER }/${ id }/picture`;
    }
    return axios.post(endpointUrl, formData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      const { data } = response.data;
      const { id, attributes } = data;
      return { id, ...attributes };
    });
  }

  static updateUser(user) {
    const data = {
      data: {
        type: "update_user",
        attributes: user
      }
    };

    const endpointUrl = user.password ? API_AUTH : `${ API_USER }/${ user.id }`;
    return axios.put(endpointUrl, data)
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

  static getUserFollowings(user, page){
    return UserService._followersOrFollowing(`${API_USER}/${user}/following`, page);
  }

  static getUserFollowers(user, page){
    return UserService._followersOrFollowing(`${API_USER}/${user}/followers`, page);
  }

  static _followersOrFollowing(url, page){
    let params = {
      'page[size]': 7
    };

    if(page){
      params['page[number]'] = page;
    }

    return axios.get(url, {params})
      .then(response => {
        let {data, meta} = response.data;
        data = transformResponseData(data);
        return {data, ...meta};
      });
  }

  static followUser(user){
    return axios.post(`${API_USER}/me/following/${user}`);
  }

  static stopFollowUser(user){
    return axios.delete(`${API_USER}/me/following/${user}`);
  }

  static getNotifications(page){
    return axios.get(`${API_USER}/me/notifications?page=${page}`).then((response) => {
      return response.data;
    });
  }

  static getFollowNotifications(page){
    return axios.get(`${API_USER}/me/notifications?page=${page}&searchType=following`).then((response) => {
      return response.data;
    });
  }

  static getNotificationSettings(){
    return axios.get(`${API_USER}/me/settings-notifications`).then((response)=>{
      return response.data.data.attributes;
    });
  }
  
  static patchNotificationSettings(settings) {
    const params = {
      data: {
        type: 'notificationSettings',
        attributes: settings
      }
    }
    return axios.patch(`${API_USER}/me/settings-notifications`, params).then((response) => {
      return response.data.data.attributes;
    });
  }

  static reportProfile(report){
    let params = {
      data : {
        type: 'reports',
        attributes : report
      }
    };
    return axios.post(`${API}/reports`, params).then(response => {
      return response;
    });
  }
}

export {UserService};
