import axios from 'axios';
import {API, transformResponseData} from './api';

const API_TAG = `${API}/tags`;

class TagService {

  static tags(){
    return axios.get(API_TAG)
      .then(response => {
        let {data} = response.data;
        return transformResponseData(data);
      });
  }

}

export {TagService};
