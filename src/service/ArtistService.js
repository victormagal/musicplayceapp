import axios from 'axios';
import {API, transformResponseData} from './api';

const API_ARTIST = `${API}/artists`;

class ArtistService {

  static getArtistById(id) {
    return axios.get(`${ API_ARTIST }/${ id }`)
      .then(response => {
        let {data} = response.data;
        let {id, attributes} = data;
        return {id, ...attributes};
      });
  }

  static artists(search) {
    let params = {};

    if(search){
      params.query = JSON.stringify({name: {$like: `%${search}%`}});
    }

    return axios.get(API_ARTIST, {params})
      .then(response => {
        //TODO: handle pagination
        let {data, meta} = response.data;
        return {data: transformResponseData(data), pagination: meta.pagination};
      });
  }

  static update(id, artist){
    let data = {
      data: {
        type: "artists",
        attributes: artist
      }
    };

    return axios.put(`${API_ARTIST}/${id}`, data)
      .then(response => response.data);
  }

}

export {ArtistService};
