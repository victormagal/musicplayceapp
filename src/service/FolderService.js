import axios from 'axios';
import {API, transformResponseData} from './api';

const API_FOLDER = `${API}/folders`;

class FolderService {


  static create(folder){
    let data = {
      data: {
        type: "folders",
        attributes: {...folder}
      }
    };
    return axios.post(API_FOLDER, data);
  }

  static getUserSongsFolders(id, page, size){
    let params = {
      query: '{"type":"userSongs"}',
      queryTable: 'folders',
      'page[size]': size || 6,
      'sort': JSON.stringify({'created_at': 'desc'})
    };

    if(page){
      params['page[number]'] = page;
    }

    return axios.get(`${API_FOLDER}/user/${id}`, {params}).then(response => {
      let {data, meta} = response.data;
      data = transformResponseData(data);
      return {data, ...meta};
    });
  }

  static getFavoriteSongsFolders(page, size){
    let params = {
      query: '{"type":"favoriteSongs"}',
      queryTable: 'folders',
      'page[size]': size || 6,
      'sort': JSON.stringify({'created_at': 'desc'})
    };

    if(page){
      params['page[number]'] = page;
    }

    return axios.get(`${API_FOLDER}`, {params}).then(response => {
      let {data, meta} = response.data;
      data = transformResponseData(data);
      return {data, ...meta};
    });
  }

  static updateFolderName(folderId, newName){
    if(!newName){
      return Promise.reject();
    }

    let params = {
      data : {
        type: 'folders',
        attributes: {
          name: newName,
        }
      }
    };
    return axios.put(`${API_FOLDER}/${folderId}`, params).then(response => {return response});
  }
}

export {FolderService};
