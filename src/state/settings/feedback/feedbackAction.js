import {createAction} from 'redux-actions';
import {scheduleRemoveNotifications} from '../../general/generalAction';
import {FeedbackService} from '../../../service';


export const FEEDBACK_START_LOADING = 'FEEDBACK_START_LOADING';
export const FEEDBACK_FINISH_LOADING = 'FEEDBACK_FINISH_LOADING';
export const FEEDBACK_SAVE_SUCCESS = 'FEEDBACK_SAVE_SUCCESS';
export const FEEDBACK_SAVE_ERROR = 'FEEDBACK_SAVE_ERROR';

export const feedbackStartLoading = createAction(FEEDBACK_START_LOADING);
export const feedbackEndLoading = createAction(FEEDBACK_FINISH_LOADING);
export const sendFeedbackSuccess = createAction(FEEDBACK_SAVE_SUCCESS);
export const sendFeedbackError = createAction(FEEDBACK_SAVE_ERROR);


export const createFeedback = (feedback) => {
  return (dispatch) => {
    dispatch(feedbackStartLoading());
    return FeedbackService.createFeedback(feedback).then(response => {
      dispatch(sendFeedbackSuccess());
      dispatch(feedbackEndLoading());
      dispatch(scheduleRemoveNotifications());
      return response;
    }).catch(e => {
      console.log('error', e);
      dispatch(sendFeedbackError());
      dispatch(feedbackEndLoading());
    });
  };
};
