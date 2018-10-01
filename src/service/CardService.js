import axios from 'axios';
import {API, transformResponseData} from './api';

const API_CARD = `${API}/cards`;

class CardService {

  static create(card){
    let data = {
      data: {
        type: "cards",
        attributes: {...card}
      }
    };
    return axios.post(API_CARD, data);
  }

  static getCards()
  {
    return axios.get(`${API_CARD}/user/${id}`, {params}).then(response => {
      let {data, meta} = response.data;
      data = transformResponseData(data);
      return {data, ...meta};
    });
  }

}

export {CardService};
