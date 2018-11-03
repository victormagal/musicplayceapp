import axios from 'axios';
import {API_FEED} from './api';

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
