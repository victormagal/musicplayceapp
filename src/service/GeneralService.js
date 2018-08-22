import axios from 'axios';
import { GOOGLE_API_KEY, API } from "./api";

class GeneralService {
  static fetchCityBrazil(state) {
    return axios.get(`${API}/states/${state}/cities`).then(response => {
      return response.data
    });
  }

  static fetchStateBrazil() {
    return axios.get(`${API}/states`).then(response =>
      response.data
    );
  }

  // The GOOGLE_API_KEY has to be located at api.js file.
  // In order to get it, go to https://console.developers.google.com and log in with your devsquad credentials.
  // Then, click at the "Enable APIs and Services" button, search for "Geocoding API" and press to enables it.
  // Go to "credentials" tab and copy the API KEY.
  static getAddressFromCoordinates(latitude, longitude) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${ GOOGLE_API_KEY }&latlng=${ latitude },${ longitude}&sensor=true`)
      .then(response => response);
  }
}

export {GeneralService};
