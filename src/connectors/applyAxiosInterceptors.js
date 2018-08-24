import axios from 'axios';
import {showNetworkError} from '../state/action';

export const applyAxiosInterceptops = (store) => {
  axios.interceptors.request.use(request => {
    if (store.getState().generalReducer.isConnected) {
      return request;
    }

    store.dispatch(showNetworkError());
    return request
  });

  axios.interceptors.response.use(response => {
    return response
  }, (error) => {
    if(error.response.status === 401){
      //TODO: redirect to login
    }
    return Promise.reject(error);
  });
};
