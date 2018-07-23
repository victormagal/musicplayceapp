import axios from 'axios';
import {API} from './api';

const API_TERMS_AND_CONDITIONS = `${API}/terms`;
const API_ACCEPT_TERMS_AND_CONDITIONS = `${API}/auth/accept-terms`;

class TermsAndConditionsService {
  static fetchTermsAndConditions() {
    return axios.get(API_TERMS_AND_CONDITIONS)
      .then(response => response.data);
  }

  static acceptTermsAndConditions() {
    return axios.post(API_ACCEPT_TERMS_AND_CONDITIONS)
      .then(response => response.data);
  }
}

export {TermsAndConditionsService};
