import axios from 'axios';
import {API_PLANS, API_USER} from './api';

class PlansService {

  static choosePlan(planId){
    return axios.post(`${API_USER}/me/choose-plan/${planId}`);
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
