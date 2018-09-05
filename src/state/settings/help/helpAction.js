import {createAction} from 'redux-actions';
import {HelpService} from '../../../service/index';

    export const FAQ_FETCHED = 'FAQ_FETCHED';
    export const FAQ_SENT_SUCCESS = 'FAQ_SENT_SUCCESS';
    export const FAQ_SENT_ERROR = 'FAQ_SENT_ERROR'
;    export const FAQ_FETCH_ERROR = 'FAQ_FETCH_ERROR';
    export const FAQ_LOADING_START = 'FAQ_LOADING_START';
    export const FAQ_LOADING_END = 'FAQ_LOADING_END';

  export const faqLoadingStart = createAction(FAQ_LOADING_START);
  export const faqLoadingEnd = createAction(FAQ_LOADING_END);
  export const faqSentSuccess = createAction(FAQ_SENT_SUCCESS);
  export const faqSentError = createAction(FAQ_SENT_ERROR);
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

export const sendQuestion = (data) => {
  return (dispatch) => {
    dispatch(faqLoadingStart());
    HelpService.sendAQuestion(data).then(() => {
      dispatch(faqSentSuccess());
      dispatch(faqLoadingEnd());
    }).catch(e => {
      console.log('sendQuestionError', e);
      console.log('sendQuestionError', e.response);
      dispatch(faqSentError());
      dispatch(faqLoadingEnd());
    })
  }
}
