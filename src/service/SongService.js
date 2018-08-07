import axios from 'axios';
import {API, transformResponseData, getIncludes} from './api';
import {StorageService} from "./StorageService";
import {Platform} from "react-native";

const API_SONG = `${API}/songs`;

class SongService {

  static transformSongRequest(song) {
    song = {...song};
    song.title = song.name;

    let relationships = {};

    if (song.coAuthors) {
      relationships['coAuthors'] = {
        data: song.coAuthors.map(a => {
          return {id: a.id, type: "coAuthors"};
        })
      };
    }

    if (song.tags) {
      relationships['tags'] = {
        data: song.tags.map(a => {
          return {id: a.id, type: "tags"};
        })
      };
    }

    if (song.folder) {
      relationships['folder'] = {
        data: song.folder
      };
    }

    delete song.coAuthors;
    delete song.folder;
    delete song.tags;

    return {song, relationships};
  }

  static create(songParam) {
    let {song, relationships} = SongService.transformSongRequest(songParam);

    let data = {
      data: {
        type: "songs",
        attributes: song,
        relationships
      }
    };

    return axios.post(API_SONG, data)
      .then(response => {
        let {data} = response.data;
        let {id, attributes} = data;
        return {id, ...attributes};
      });
  }

  static update(songParam) {
    let {song, relationships} = SongService.transformSongRequest(songParam);
    let data = {
      data: {
        type: "songs",
        song_id: song.id,
        attributes: song,
        relationships
      }
    };

    return axios.put(`${API_SONG}/${song.id}`, data)
      .then(response => response.data);
  }

  static delete(id) {
    return axios.delete(`${API_SONG}/${id}`).then(response => response.data);
  }

  static publish(id) {
    return axios.post(`${API_SONG}/${id}/publish`).then(response => response.data);
  }

  static unpublish(id) {
    return axios.post(`${API_SONG}/${id}/unpublish`).then(response => response.data);
  }

  static indicateSong(songId, userId) {
    let params = {
      user_id: userId
    };
    return axios.post(`${API_SONG}/${songId}/indications`, params).then(response => response.data);
  }

  static likeComment(commentId) {
    return axios.post(`${API_SONG}/${commentId}/like`).then(response => response.data);
  }

  static favoriteSong(songId) {
    // let params = { 
    // folders: [],
    // };
    return axios.post(`${API_SONG}/${songId}/favorite`).then(response => response.data);
  }

  static getSong(song) {
    return axios.get(`${API_SONG}/${song.id}?include=coAuthors,tags,comments`).then(({data}) => {
      let relations = getIncludes(data);
      let {id, attributes} = data.data;
      return {id, ...attributes, ...relations};
    });
  }

  static getSongLyrics(song) {
    return axios.get(`${API_SONG}/${song.id}/lyrics`).then(response => {
      let {data} = response.data;
      return {data: transformResponseData(data)}
    })
  }

  static songsByUser(user) {
    return axios.get(`${API}/song-artist/${user}`)
      .then(response => {
        let {data, meta} = response.data;
        return {data: transformResponseData(data), pagination: meta.pagination};
      });
  }

  static sendSongFile(file, song) {
    let formData = new FormData();

    if (!file) {
      return Promise.resolve();
    }

    formData.append('audio', {uri: file.uri, name: file.fileName});

    return axios.post(`${ API_SONG }/${ song.id }/audio`, formData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      let {data} = response.data;
      let {id, attributes} = data;
      return {id, ...attributes};
    });
  }

  static createAndPublishSong(song, songFile, imageFile){
    song.path = 'path/without-song.mp3';
    song.artist_id = song.user_id;

    return SongService.create(song).then(response => {
      return SongService.uploadImage(response.id, imageFile).then(() => {
        return SongService.sendSongFile(songFile, response).then(() => {
          return SongService.publish(response.id);
        });
      });
    });
  }

  static republishSong(song, songFile, imageFile){
    return SongService.uploadImage(song.id, imageFile).then((response) => {
      return SongService.sendSongFile(songFile, response).then((fileResponse) => {
        if(fileResponse){
          song.path = fileResponse.path;
        }
        return SongService.update(response).then(() => {
          return SongService.publish(song.id);
        });
      });
    });
  }

  static uploadImage(songId, file) {
    let formData = new FormData();

    if (!file) {
      return Promise.resolve();
    }

    formData.append('picture', {
      uri: file.uri,
      name: file.fileName,
      type: Platform.OS === 'android' ? file.type : `images/${ file.fileName.split('.')[1] }`
    });

    return axios.post(`${ API_SONG }/${ songId }/picture`, formData, {
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
}

export {SongService};
