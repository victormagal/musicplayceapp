import {createAction} from 'redux-actions';
import {FeedService} from '../../service';



export const FEED_START_LOADING = 'FEED_START_LOADING';
export const FEED_FINISH_LOADING = 'FEED_FINISH_LOADING';

export const feedStartLoading = createAction(FEED_START_LOADING);
export const feedFinishLoading = createAction(FEED_FINISH_LOADING);


export const fetchFeeds = () => {
  return (dispatch) => {
    dispatch(feedStartLoading());

    return FeedService.feeds().then(response => {
      console.log(response);
      dispatch(feedFinishLoading());
    }).catch(e => {
      console.log("ERROR FETCH FEED", e.response);
      dispatch(feedFinishLoading());
    })
  };
};
