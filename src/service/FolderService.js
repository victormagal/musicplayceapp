import axios from 'axios';
import {API, transformResponseData, getIncludes} from './api';

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

  static getUserSongsWithFolders(){
    return axios.get(`${API_FOLDER}?query={"type":"userSongs"}&queryTable=folders&include=userSongs`)
                 .then(response => {
                  let {data} = response.data;
                  let relations = response.data.included;
                  data = transformResponseData(data);
                  let result = FolderService.transformFolderSongs(data, relations);
                  return result;
                 }).catch(e =>{
                   console.log('getUserSongsFoldersError', e);
                 });
  }

  static getUserSongsFolders(id, page){
    let params = {
      query: '{"type":"userSongs"}',
      queryTable: 'folders',
      'page[size]': 6
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

  static getFavoriteSongsWithFolders(){
    return axios.get(`${API_FOLDER}?query={"type":"favoriteSongs"}&queryTable=folders&include=favoriteSongs`)
                 .then(response => {
                   let {data} = response.data;
                   let relations = response.data.included;
                   data = transformResponseData(data);
                   let result = FolderService.transformFolderSongs(data, relations);
                   return result;
                 }).catch(e =>{
                   console.log('getFavoriteSongsFoldersError', e);
                 });
  }

  static getFavoriteSongsFolders(){
    return axios.get(`${API_FOLDER}?query={"type":"favoriteSongs"}&queryTable=folders`)
                 .then(response => {
                   console.log("AQUI", response);
                   let {data} = response.data;
                   data = transformResponseData(data);
                   return {data, meta};
                 }).catch(e =>{
                   console.log('getFavoriteSongsFoldersError', e);
                 });
  }

  static folders(){
    return axios.get(`${API_FOLDER}?query={"type":"favoriteSongs"}&queryTable=folders&include=favoriteSongs`)
                 .then(response => {
                   let {data} = response.data;
                   data = transformResponseData(data);
                   return {data};
                 }).catch(e =>{
                   console.log('getFoldersError', e);
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
          name: newName.value,
        }
      }
    }
    return axios.put(`${API_FOLDER}/${folderId}`, params).then(response => {return response});
  }
}

export {FolderService};
