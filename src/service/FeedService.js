import axios from 'axios';
import {API} from './api';

const API_FEED = `${API}/full-text-search`;

class FeedService {

  static feeds(search){
    let params = {};

    if(search){
      params.query = JSON.stringify({name: {$like: `%${search}%`}});
    }

    return axios.get(API_FEED, {params})
      .then(response => {
        //TODO: handle pagination
        let {data} = response.data;
        return {data: transformResponseData(data)};
      });
  }

}

export {FeedService};
