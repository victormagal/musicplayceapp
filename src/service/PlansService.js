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

  static addCard(card){
    //TODO: MOCK, call API here
    return Promise.resolve(card);
  }

  static removeCard(card){
    //TODO: MOCK, call API here
    return Promise.resolve(card);
  }
}

export {PlansService};
