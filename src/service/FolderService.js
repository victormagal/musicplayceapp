import axios from 'axios';
import {API, transformResponseData, getIncludes} from './api';

const API_FOLDER = `${API}/folders`;

class FolderService {

  static transformFolderSongs(folders, favoriteSongs){
    let i,j;

    if(!favoriteSongs || favoriteSongs.length === 0 ){
      return [];
    }

    if(folders.length === 0){
      return [{id: 99, name: 'Outras', songs: favoriteSongs, songCount: favoriteSongs.length, editable: false }];
    }

    for(i = 0; i < folders.length; i++){
      for(j = 0; j < favoriteSongs.length; j++){
        if(folders[i].id === favoriteSongs[j].attributes.pivot.folder_id){
          folders[i].editable = true
          folders[i].songs = [];
          folders[i].songs.push(favoriteSongs[j].attributes);
        }
      }
    }

    folders = folders.filter((folder)=>{
      return folder.songs;
    });
    
    let noFolderSongs = favoriteSongs.filter((song) => {
      return song.attributes.pivot && song.attributes.pivot.folder_id;
    });

    if(noFolderSongs && noFolderSongs.length > 0){
      folders.push({id: 99, name: 'Outras', songs: noFolderSongs, songCount: noFolderSongs.length, editable: false });
    }
    
    return folders;
  }

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

  static getUserSongsFolders(){
    return axios.get(`${API_FOLDER}?query={"type":"userSongs"}&queryTable=folders`)
                 .then(response => {
                   let {data} = response.data;
                   data = transformResponseData(data);
                   return {data};
                 }).catch(e =>{
                   console.log('getUserSongsFoldersError', e);
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
