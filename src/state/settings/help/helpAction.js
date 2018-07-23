import {createAction} from 'redux-actions';
import {HelpService} from '../../../service/index';

    export const FAQ_FETCHED = 'FAQ_FETCHED';
    export const FAQ_FETCH_ERROR = 'FAQ_FETCH_ERROR';
    export const FAQ_LOADING_START = 'FAQ_LOADING_START';
    export const FAQ_LOADING_END = 'FAQ_LOADING_END';

  export const faqLoadingStart = createAction(FAQ_LOADING_START);
  export const faqLoadingEnd = createAction(FAQ_LOADING_END);
  export const faqFetched = createAction(FAQ_FETCHED, (data) => {
    return data;
  });
  export const faqFetchError = createAction(FAQ_FETCH_ERROR, (error) => {
    return error;
  });

export const fetchFAQHelp = () => {
  return (dispatch) => {
    dispatch(faqLoadingStart());
    HelpService.fetchFAQ().then(response => {
      dispatch(faqFetched(response.data));
      dispatch(faqLoadingEnd());
    }).catch(e => {
      dispatch(faqFetchError(e));
      dispatch(faqLoadingEnd());
    });
  };
};
