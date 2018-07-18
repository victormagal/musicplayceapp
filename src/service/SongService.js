import axios from 'axios';
import {API} from './api';

const API_SONG = `${API}/songs`;

class SongService {

  static create(song) {
    song = {...song};
    song.title = song.name;

    let relationship = {};

    if(song.coAuthors){
      relationship['coAuthors'] = {
        data : song.coAuthors.map(a => { return {id: a.id, type: "coAuthors"}})
      };
    }

    if(song.tags){
      relationship['tags'] = {
        data : song.tags.map(a => { return {id: a.id, type: "tags"}})
      };
    }

    delete song.coAuthors;
    delete song.folder;
    delete song.tags;

    let data = {
      data: {
        type: "songs",
        attributes: song
      }
    };

    return axios.post(API_SONG, data)
                .then(response => response.data);
  }

}

export {SongService};
