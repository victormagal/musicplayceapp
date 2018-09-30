import axios from 'axios';
import {API} from './api';

const API_PLANS = `${API}/plans`;

class PlansService {

  static choosePlan(planId){
    return axios.post(`${API}/users/me/choose-plan/${planId}`);
  }

  static getPlans() {
    return axios.get(API_PLANS)
      .then(response => {
        return response.data.data;
      });
  }

  static addCard(card){
    //return axios.post(`${API}/subscription/assign`, {card});
    return Promise.resolve(card);
  }

  static removeCard(card){
    //TODO: MOCK, call API here
    return Promise.resolve(card);
  }
}

export {PlansService};
