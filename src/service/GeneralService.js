import axios from 'axios';
import { API_STATES } from "./api";

class GeneralService {
  static fetchCityBrazil(state, city) {
    return axios.get(`${API_STATES}/${state}/cities/${city}`).then(response => {
      return response.data
    });
  }

  static fetchStateBrazil() {
    return axios.get(`${API_STATES}`).then(response =>
      response.data
    );
  }

}

export {GeneralService};
