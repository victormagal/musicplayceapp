import axios from 'axios';
import {API, transformResponseData} from './api';

const API_SONG = `${API}/songs`;

class SongService {

  static create(song) {
    song = {...song};
    song.title = song.name;

    let relationships = {};

    if(song.coAuthors){
      relationships['coAuthors'] = {
        data : song.coAuthors.map(a => { return {id: a.id, type: "coAuthors"}})
      };
    }

    if(song.tags){
      relationships['tags'] = {
        data : song.tags.map(a => { return {id: a.id, type: "tags"}})
      };
    }

    if(song.folder){
      relationships['folder'] = {
        data: song.folder
      };
    }

    delete song.coAuthors;
    delete song.folder;
    delete song.tags;

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

  static update(song) {
    song = {...song};
    song.title = song.name;

    //TODO: update relationship
    delete song.coAuthors;
    delete song.folder;
    delete song.tags;

    let data = {
      data: {
        type: "songs",
        song_id: song.id,
        attributes: song
      }
    };

    return axios.put(`${API_SONG}/${song.id}`, data)
                .then(response => response.data);
  }

  static delete(id){
    return axios.delete(`${API_SONG}/${id}`).then(response => response.data);
  }

  static publish(id){
    return axios.post(`${API_SONG}/${id}/publish`).then(response => response.data);
  }

  static unpublish(id){
    return axios.post(`${API_SONG}/${id}/unpublish`).then(response => response.data);
  }

  static getSong(song){
    return axios.get(`${API_SONG}/${song.id}`).
      then(response => {
        let {data} = response.data;
        console.log(data);
        return data;
      });
  }

  static getSongLyrics(song){
    return axios.get(`${API_SONG}/${song.id}/lyrics`).
      then(response =>{
        let {data} = response.data;
        return {data : transformResponseData(data)}
      })
  }

  static artistSongs(artist){
    return axios.get(`${API}/song-artist/${artist}`)
      .then(response => {
        let {data, meta} = response.data;
        return {data: transformResponseData(data), pagination: meta.pagination};
      });
  }

}

export {SongService};
