import axios from 'axios';
import {showNetworkError} from '../state/action';

export const checkConnection = (store) => {
  axios.interceptors.request.use(request => {
    if (store.getState().generalReducer.isConnected) {
      return request;
    }

    store.dispatch(showNetworkError());
    return request
  });
};
