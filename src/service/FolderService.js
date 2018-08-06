import axios from 'axios';
import {API, transformResponseData} from './api';

const API_FOLDER = `${API}/folders`;

//PLAYLIST
class FolderService {

  static create(folder){
    let data = {
      data: {
        type: "folders",
        attributes: {...folder}
      }
    };

    return axios.post(API_FOLDER, data);
  }

  static folders(){
    return axios.get(API_FOLDER)
                 .then(response => {
                   let {data} = response.data;
                   data = transformResponseData(data);
                   return {data};
                 });
  }
}

export {FolderService};
