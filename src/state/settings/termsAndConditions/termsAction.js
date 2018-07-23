import {createAction} from 'redux-actions';
import {TermsAndConditionsService} from "../../../service";

export const TERMS_AND_CONDITIONS_FETCHED = 'TERMS_AND_CONDITIONS_FETCHED';
export const TERMS_AND_CONDITIONS_FETCH_ERROR = 'TERMS_AND_CONDITIONS_FETCH_ERROR';
export const TERMS_AND_CONDITIONS_LOADING_START = 'TERMS_AND_CONDITIONS_LOADING_START';
export const TERMS_AND_CONDITIONS_LOADING_END = 'TERMS_AND_CONDITIONS_LOADING_END';
export const TERMS_AND_CONDITIONS_ACCEPTED = 'TERMS_AND_CONDITIONS_ACCEPTED';

export const termsAndConditionsLoadingStart = createAction(TERMS_AND_CONDITIONS_LOADING_START);
export const termsAndConditionsLoadingEnd = createAction(TERMS_AND_CONDITIONS_LOADING_END);
export const termsAndConditionsAccepted = createAction(TERMS_AND_CONDITIONS_ACCEPTED);
export const termsAndConditionsFetched = createAction(TERMS_AND_CONDITIONS_FETCHED, (data) => {
  return data;
});
export const termsAndConditionsFetchError = createAction(TERMS_AND_CONDITIONS_FETCH_ERROR, (error) => {
  return error;
});

export const fetchTermsAndConditions = () => {
  return (dispatch) => {
    dispatch(termsAndConditionsLoadingStart());
    TermsAndConditionsService.fetchTermsAndConditions().then(response => {
      dispatch(termsAndConditionsFetched(response.data));
      dispatch(termsAndConditionsLoadingEnd());
    }).catch(e => {
      dispatch(termsAndConditionsFetchError(e));
      dispatch(termsAndConditionsLoadingEnd());
    });
  };
};

export const acceptTermsAndConditions = () => {
  return (dispatch) => {
    dispatch(termsAndConditionsLoadingStart());
    TermsAndConditionsService.acceptTermsAndConditions().then(() => {
      dispatch(termsAndConditionsAccepted());
      dispatch(termsAndConditionsLoadingEnd());
    }).catch(e => {
      dispatch(termsAndConditionsFetchError(e));
      dispatch(termsAndConditionsLoadingEnd());
    });
  };
};
