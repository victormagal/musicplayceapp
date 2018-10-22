import axios from 'axios';
import { GOOGLE_API_KEY, API } from "./api";

class GeneralService {
  static fetchCityBrazil(state, city) {
    return axios.get(`${API}/states/${state}/cities/${city}`).then(response => {
      return response.data
    });
  }

  static fetchStateBrazil() {
    return axios.get(`${API}/states`).then(response =>
      response.data
    );
  }

}

export {GeneralService};
