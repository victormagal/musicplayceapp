import axios from 'axios';
import {API, transformResponseData} from './api';

const API_ARTIST = `${API}/artists`;

class ArtistService {

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

}

export {ArtistService};
