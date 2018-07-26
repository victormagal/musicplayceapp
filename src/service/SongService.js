import axios from 'axios';
import {API, transformResponseData, getIncludes} from './api';
import {StorageService} from "./StorageService";

const API_SONG = `${API}/songs`;

class SongService {

  static transformSongRequest(song){
    song = {...song};
    song.title = song.name;

    let relationships = {};

    if (song.coAuthors) {
      relationships['coAuthors'] = {
        data: song.coAuthors.map(a => {
          return {id: a.id, type: "coAuthors"}
        })
      };
    }

    if (song.tags) {
      relationships['tags'] = {
        data: song.tags.map(a => {
          return {id: a.id, type: "tags"}
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
      .then(response => response.data);
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

  static getSong(song) {
    return axios.get(`${API_SONG}/${song.id}?include=coAuthors,tags`).then(({data}) => {
      console.log(data);
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

  static artistSongs(artist) {
    return axios.get(`${API}/song-artist/${artist}`)
      .then(response => {
        let {data, meta} = response.data;
        return {data: transformResponseData(data), pagination: meta.pagination};
      });
  }

  static sendSongFile(file, song) {
    let formData = new FormData();

    formData.append('file', file);
    formData.append('name', file.fileName);
    formData.append('title', song.data.attributes.title || song.title);
    formData.append('artist_id', song.data.attributes.artist_id || song.artist_id);

    return StorageService.getToken().then(token => {
      if (token) {
        return fetch (
          `${ API_SONG }/${ song.data.id }/audio`,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            method: 'POST',
            body: formData
          }
        );
      }
    });
  }
}

export {SongService};
