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

  static artistSongs(artist){
    return axios.get(`${API}/song-artist/${artist}`)
      .then(response => {
        let {data, meta} = response.data;
        return {data: transformResponseData(data), pagination: meta.pagination};
      });
  }

}

export {SongService};
