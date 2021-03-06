import axios from 'axios';
import { StorageService } from './StorageService';

// axios.interceptors.request.use(request => {
//   console.log('Logger: request => ', request)
//   return request
// });

// axios.interceptors.response.use(response => {
//   console.log('Logger: response => ', response)
//   return response
// }, (error) => {
//   console.log(error.response);
//   return Promise.reject(error);
// });

StorageService.getToken().then((token) => {
  console.log("TOKEN", token);
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
});

export const getIncludes = (response) => {
  let { included, data } = response;
  let includes = {};

  if (included) {
    for (let e of included) {
      let { type, id, attributes } = e;

      if (!includes[type]) {
        includes[type] = {};
      }

      includes[type][id] = { id, ...attributes };
    }
  }

  if (data && data.relationships) {
    return getItemRelations(data, includes);
  }

  return includes;
};

export const getItemRelations = (data, includes) => {
  let relations = {};

  if (data && data.relationships) {

    for (let key in data.relationships) {
      let relationData = data.relationships[key].data;

      if (Array.isArray(relationData)) {
        for (let e of relationData) {
          let { type, id } = e;

          if (!relations[key]) {
            relations[key] = [];
          }
          relations[key].push(includes[type][id]);
        }
      } else {
        let { type, id } = relationData;
        relations[key] = includes[type][id];
      }
    }

    return relations;
  }
};

export const transformResponseData = (data) => {
  return data.map(({ id, attributes }) => {
    return { id, ...attributes };
  });
};

export const GOOGLE_API_KEY = 'AIzaSyBHlhntl4H8ilBeYWUc6naDgUPbYfbnv3g';
export const API_BASE = 'https://live.musicplayce.net';
const API = `${API_BASE}/api`;
export const API_FEEDBACK = `${API}/feedbacks`;
export const API_CARD = `${API}/cards`;
export const API_AUTH = `${API}/auth`;
export const API_FEED = `${API}/full-text-search`;
export const API_FOLDER = `${API}/folders`;
export const API_HELP = `${API}/faqs`;
export const API_PLANS = `${API}/plans`;
export const API_SONG = `${API}/songs`;
export const API_TAG = `${API}/tags`;
export const API_TERMS_AND_CONDITIONS = `${API}/terms`;
export const API_USER = `${API}/users`;
export const API_LANGUAGES = `${API}/languages`;
export const API_SONG_ARTIST = `${API}/song-artist`;
export const API_STATES = `${API}/states`;
export const API_INVITE = `${API}/invite`;
// export const API = 'http://35.226.244.95/api';
// export const API = 'http://a00f1158.ngrok.io/api';

