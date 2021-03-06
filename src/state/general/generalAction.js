import { createAction } from 'redux-actions';
import { GeneralService } from '../../service/GeneralService';

export const LOAD_FONT = 'LOAD_FONT';
export const UPDATE_NETWORK = 'UPDATE_NETWORK';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const SHOW_NETWORK_ERROR = 'SHOW_NETWORK_ERROR';
export const HIDE_NETWORK_ERROR = 'HIDE_NETWORK_ERROR';
export const GENERAL_START_LOADING = 'GENERAL_START_LOADING';
export const GENERAL_FINISH_LOADING = 'GENERAL_FINISH_LOADING';
export const FETCHED_CITY_BRAZIL = 'FETCHED_CITY_BRAZIL';
export const FETCHED_STATE_BRAZIL = 'FETCHED_STATE_BRAZIL';

export const loadFont = createAction(LOAD_FONT, (fontLoaded = false) => {
    return { fontLoaded };
});
export const updateNetwork = createAction(UPDATE_NETWORK, (isConnected = false) => {
  return { isConnected };
});
export const showNetworkError = createAction(SHOW_NETWORK_ERROR, data => data);
export const hideNetworkError = createAction(HIDE_NETWORK_ERROR, data => data);
export const generalStartLoading = createAction(GENERAL_START_LOADING);
export const generalFinishLoading = createAction(GENERAL_FINISH_LOADING);
export const fetchedCityBrazil = createAction(FETCHED_CITY_BRAZIL, data => data);
export const fetchedStateBrazil = createAction(FETCHED_STATE_BRAZIL, data => data);
export const generalRemoveNotification = createAction(REMOVE_NOTIFICATION);

export const fetchCityBrazil = (state, city) => {
  return (dispatch) => {
    dispatch(generalStartLoading());
    return GeneralService.fetchCityBrazil(state, city).then(response => {
      dispatch(fetchedCityBrazil(response.data));
      return response;
    }).catch(() => {
      dispatch(generalFinishLoading());
    })
  };
};

export const fetchStateBrazil = () => {
  return (dispatch) => {
    dispatch(generalStartLoading());
    return GeneralService.fetchStateBrazil().then(response => {
      dispatch(fetchedStateBrazil(response));
    }).catch(() => {
      dispatch(generalFinishLoading());
    })
  };
};

export const scheduleRemoveNotifications = () => {
  return (dispatch) => {
    let timer = setTimeout(() => {
      dispatch(generalRemoveNotification());
      clearTimeout(timer);
    }, 3000);
  }
};

/**
 * dispatch action error and schedule task to remove notification
 */
export const dispatchAndScheduleRemoveNotifications = (dispatch, action, ...params) => {
  dispatch(action(...params));
  dispatch(scheduleRemoveNotifications());
};
