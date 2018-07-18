import axios from 'axios';
import {API} from './api';

const API_FEED = `${API}/full-text-search`;

class FeedService {

  static feeds(){
    return axios.get(API_FEED)
                .then(response => response.data);
  }

}

export {FeedService};
