import {
  API_USER,
  API_REPORTS,
  API_INVITE,
  getIncludes,
  transformResponseData,
  API_AUTH
} from './api';
import { AuthService } from './AuthService';
import axios from 'axios';

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

  static uploadImage(file) {
    let formData = new FormData();

    if (!file) {
      return Promise.reject();
    }

    let { fileName, uri } = file;

    if (!fileName) {
      const positionDotExtension = uri.lastIndexOf('.');
      const extension = uri.substr(positionDotExtension + 1, 3);
      const name = uri.substring(uri.lastIndexOf('/') + 1, positionDotExtension);
      fileName = `${name}.${extension}`;
    }

    const photo = {
      uri,
      type: 'image/jpeg',
      name: fileName,
    };
    formData.append('picture', photo);

    const endpointUrl = `${ API_USER }/me/picture`;
    return axios.post(endpointUrl, formData).then(response => {
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

    const endpointUrl = user.password ? `${API_AUTH}/users/me` : `${API_USER}/${user.id}`;
    return axios.put(endpointUrl, data)
      .then(response => response.data);
  }

  static getUserById(id) {
    return axios.get(`${API_USER}/${id}`)
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

  static checkUsernameOrEmail({ field, value }) {
    const endpointUrl = field === 'email' ? `${ API_USER }/check-email` : `${ API_USER }/check-username`;
    return axios.post(endpointUrl, {
      [field]: value
    }).then(response => response.data);
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
    return axios.post(`${API_REPORTS}`, params).then(response => {
      return response;
    });
  }

  static inviteUser(user){
    let params = {
      email: user.email
    };
    return axios.post(`${API_INVITE}/${user.id}`, params).then(response => {
      return response;
    });
  }

  static sendEmailTermsOfService(){
    return axios.post(`${API_USER}/me/send-terms/`, {});
  }
}

export {UserService};
