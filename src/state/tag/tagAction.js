import {createAction} from 'redux-actions';
import {TagService} from '../../service';


export const TAG_START_LOADING = 'TAG_START_LOADING';
export const TAG_FINISH_LOADING = 'TAG_FINISH_LOADING';
export const FETCHED_TAGS = 'FETCHED_TAGS';

export const tagStartLoading = createAction(TAG_START_LOADING);
export const tagFinishLoading = createAction(TAG_FINISH_LOADING);
export const fetchedTags = createAction(FETCHED_TAGS, (data) => data);


export const fetchTags = () => {
  return (dispatch, getState) => {
    dispatch(tagStartLoading());

    if(shouldFetchTags(getState())) {
      return TagService.tags().then(response => {
        console.log(response);
        dispatch(fetchedTags(response));
      }).catch(_ => {
        dispatch(tagFinishLoading());
      });
    }

    return Promise.resolve().then(_ => dispatch(tagFinishLoading()));
  };
};


const shouldFetchTags = (state) => {
  return !(state.tagReducer.tags && state.tagReducer.tags.length > 0);
};
