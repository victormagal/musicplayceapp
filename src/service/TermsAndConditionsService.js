import axios from 'axios';
import {API} from './api';

const API_TERMS_AND_CONDITIONS = `${API}/terms`;

class TermsAndConditionsService {

  static fetchTermsAndConditions() {
    return axios.get(API_TERMS_AND_CONDITIONS)
      .then(response => response.data);
  }

}

export {TermsAndConditionsService};
