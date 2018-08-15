import axios from 'axios';
import {API, transformResponseData} from './api';
const API_FEED = `${API}/full-text-search`;

class FeedService {

  static feeds(search){

    return axios.post(API_FEED, {name: search})
      .then(response => {
        return {
          data: {
            artists: response.data.data.attributes.artists,
            songs: response.data.data.attributes.songs
        }
      }
      });
  };

}

export {FeedService};
