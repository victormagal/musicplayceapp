import axios from 'axios';
import {StorageService} from './StorageService';


StorageService.getToken().then((token) => {
  console.log("TOKEN", token);
  if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }else{
    delete axios.defaults.headers.common['Authorization'];
  }
});

export const API = 'http://35.226.244.95/api';
