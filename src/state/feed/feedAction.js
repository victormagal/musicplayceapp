import {createAction} from 'redux-actions';
import {FeedService} from '../../service';



export const FEED_START_LOADING = 'FEED_START_LOADING';
export const FEED_FINISH_LOADING = 'FEED_FINISH_LOADING';
export const FETCHED_FEED_SEARCH = 'FETCHED_FEED_SEARCH';

export const feedStartLoading = createAction(FEED_START_LOADING);
export const feedFinishLoading = createAction(FEED_FINISH_LOADING);
export const fetchedFeedSearch = createAction(FETCHED_FEED_SEARCH, (data) => data);


export const fetchFeeds = (text) => {
  return (dispatch) => {
    dispatch(feedStartLoading());

    return FeedService.feeds(text).then(response => {
      dispatch(fetchedFeedSearch(response));
    }).catch(e => {
      dispatch(feedFinishLoading(e.response));
    })
  };
};
