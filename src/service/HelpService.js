import axios from 'axios';
import {API} from './api';

const API_HELP = `${API}/faqs`;

class HelpService {

  static fetchFAQ() {
    return axios.get(API_HELP)
      .then(response => response.data);
  }

}

export {HelpService};
