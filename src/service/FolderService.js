import axios from 'axios';
import {API, transformResponseData} from './api';

const API_FOLDER = `${API}/folders`;

//PLAYLIST
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

  static getUserFolders(){
    return axios.get(`${API_FOLDER}?query={"type":"userSongs"}&queryTable=folders&include=userSongs`)
                 .then(response => {
                   let {data} = response.data;
                   data = transformResponseData(data);
                   return {data};
                 }).catch(e =>{
                   console.log('getUserSongsFoldersError', e);
                 });
  }

  static getFavoriteSongsFolders(){
    return axios.get(`${API_FOLDER}?query={"type":"favoriteSongs"}&queryTable=folders&include=favoriteSongs`)
                 .then(response => {
                   let {data} = response.data;
                   data = transformResponseData(data);
                   return {data};
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
}

export {FolderService};
