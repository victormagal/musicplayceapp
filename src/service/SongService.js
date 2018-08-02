import axios from 'axios';
import {API, transformResponseData, getIncludes} from './api';
import {StorageService} from "./StorageService";

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
    console.log(song);
    console.log(relationships);

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

  static indicateSong(songId, artistId) {
    let params = {
      artist_id: artistId
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


  static artistSongs(artist) {
    return axios.get(`${API}/song-artist/${artist}`)
      .then(response => {
        console.log(response.data);
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

  static createAndPublishSong(song, file){
    song.path = 'path/without-song.mp3';

    return SongService.create(song).then(response => {
      return SongService.sendSongFile(file, response).then(() => {
        return SongService.publish(response.id);
      });
    });
  }

  static republishSong(song, file){
    return SongService.sendSongFile(file, song).then((fileResponse) => {
      if(fileResponse){
        song.path = fileResponse.path;
      }
      return SongService.update(song).then(() => {
        return SongService.publish(song.id);
      })
    });
  }
}

export {SongService};
