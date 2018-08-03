import axios from 'axios';
import {API} from './api';

const API_PLANS = `${API}/plans`;

class PlansService {

  static getPlans() {
    return axios.get(API_PLANS)
      .then(response => {
        return response.data.data;
      });
  }
}

export {PlansService};
