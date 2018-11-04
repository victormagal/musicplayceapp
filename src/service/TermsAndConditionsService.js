import axios from 'axios';
import {API_TERMS_AND_CONDITIONS} from './api';

class TermsAndConditionsService {
  static fetchTermsAndConditions() {
    return axios.get(API_TERMS_AND_CONDITIONS)
      .then(response => response.data);
  }
}

export {TermsAndConditionsService};
