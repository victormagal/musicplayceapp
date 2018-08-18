import {
  FEEDBACK_SAVE_SUCCESS,
  FEEDBACK_SAVE_ERROR,
  FEEDBACK_START_LOADING,
  FEEDBACK_FINISH_LOADING
} from './feedbackAction';
import {REMOVE_NOTIFICATION} from '../../general/generalAction'

const feedbackReducer = (state, action) => {
  state = state || {
    feedbackSaveSuccess: false,
    feedbackSaveError: false,
    loading: false
  };

  switch (action.type) {
    case FEEDBACK_START_LOADING:
      return {
        ...state,
        loading: true
      };
    case FEEDBACK_FINISH_LOADING:
      return {
        ...state,
        loading: false
      };
    case FEEDBACK_SAVE_SUCCESS:
      return {
        ...state,
        feedbackSaveSuccess: true
      };
    case FEEDBACK_SAVE_ERROR:
      return {
        ...state,
        feedbackSaveError: true
      };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        feedbackSaveSuccess: false
      };
  }

  return state;
};

export default feedbackReducer;
