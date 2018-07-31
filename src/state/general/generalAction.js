import { createAction } from 'redux-actions';
import { GeneralService } from '../../service/GeneralService';

export const LOAD_FONT = 'LOAD_FONT';
export const UPDATE_NETWORK = 'UPDATE_NETWORK';
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
export const generalStartLoading = createAction(GENERAL_START_LOADING);
export const generalFinishLoading = createAction(GENERAL_FINISH_LOADING);
export const fetchedCityBrazil = createAction(FETCHED_CITY_BRAZIL, data => data);
export const fetchedStateBrazil = createAction(FETCHED_STATE_BRAZIL, data => data);

export const fetchCityBrazil = (state) => {
  return (dispatch) => {
    dispatch(generalStartLoading());
    return GeneralService.fetchCityBrazil(state).then(response => {
      dispatch(fetchedCityBrazil(response.data));
    }).catch(() => {
      dispatch(generalFinishLoading());
    })
  };
};

export const fetchStateBrazil = () => {
  return (dispatch) => {
    dispatch(generalStartLoading());
    return GeneralService.fetchStateBrazil().then(response => {
      dispatch(fetchedStateBrazil(response.data));
    }).catch(() => {
      dispatch(generalFinishLoading());
    })
  };
};
