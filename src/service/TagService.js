import axios from 'axios';
import {API_TAG, transformResponseData} from './api';

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
