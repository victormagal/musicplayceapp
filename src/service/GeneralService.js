import axios from 'axios';

class GeneralService {
  static fetchCityBrazil() {
    return axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios').then(response => (
      response
    ))
  }

  static fetchStateBrazil() {
    return axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => (
      response
    ))
  }
}

export {GeneralService};
