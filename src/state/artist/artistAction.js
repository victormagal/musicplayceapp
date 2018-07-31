import {createAction} from 'redux-actions';
import {ArtistService, SongService, UserService} from '../../service';

export const FETCHED_ARTISTS = 'FETCHED_ARTISTS';
export const FETCHED_ARTIST_SONGS = 'FETCHED_ARTIST_SONGS';
export const ARTIST_START_LOADING = 'ARTIST_START_LOADING';
export const ARTIST_FINISH_LOADING = 'ARTIST_FINISH_LOADING';
export const ARTIST_BY_ID_FETCHED = 'ARTIST_BY_ID_FETCHED';
export const ARTIST_SAVE_SUCCESS = 'ARTIST_SAVE_SUCCESS';
export const ARTIST_SAVE_ERROR = 'ARTIST_SAVE_ERROR';
export const ARTIST_FOLLOW_SUCCESS = 'ARTIST_FOLLOW_SUCCESS';
export const ARTIST_STOP_FOLLOW_SUCCESS = 'ARTIST_STOP_FOLLOW_SUCCESS';
export const ARTIST_FOLLOW_ERROR = 'ARTIST_FOLLOW_ERROR';
export const NOTIFICATIONS_START_LOADING = 'NOTIFICATIONS_START_LOADING';
export const FETCHED_NOTIFICATIONS = 'FETCHED NOTIFICATIONS';
export const FETCHED_FOLLOWERS_NOTIFICATIONS = 'FETCHED FOLLOWERS NOTIFICATIONS';
export const NOTIFICATIONS_FINISHED_LOADING = 'NOTIFICATIONS_FINISHED_LOADING';

export const fetchedArtists = createAction(FETCHED_ARTISTS, (data) => data);
export const artistByIdFetched = createAction(ARTIST_BY_ID_FETCHED, (data) => data);
export const artistStartLoading = createAction(ARTIST_START_LOADING);
export const artistFinishLoading = createAction(ARTIST_FINISH_LOADING);
export const artistSaveSuccess = createAction(ARTIST_SAVE_SUCCESS);
export const artistSaveError = createAction(ARTIST_SAVE_ERROR);
export const artistStopFollowSuccess = createAction(ARTIST_STOP_FOLLOW_SUCCESS);
export const artistFollowSuccess = createAction(ARTIST_FOLLOW_SUCCESS);
export const artistFollowError = createAction(ARTIST_FOLLOW_ERROR);
export const fetchedArtistSongs = createAction(FETCHED_ARTIST_SONGS, (data) => data);
export const notificationsStartLoading = createAction(NOTIFICATIONS_START_LOADING);
export const fetchedNotifications = createAction(FETCHED_NOTIFICATIONS, data => data);
export const fetchedFollowersNotifications = createAction(FETCHED_FOLLOWERS_NOTIFICATIONS, data => data);
export const notificationsFinishedLoading = createAction(NOTIFICATIONS_FINISHED_LOADING)

export const searchArtists = (name) => {
  return (dispatch) => {
    dispatch(artistStartLoading());

    return ArtistService.artists(name).then(response => {
      dispatch(fetchedArtists(response));
    }).catch(e => {
      console.log(e.response);
      dispatch(artistFinishLoading());
    });
  };
};

export const updateArtist = (id, artist) => {
  return (dispatch) => {
    dispatch(artistStartLoading());

    return ArtistService.update(id, artist).then(() => {
      dispatch(artistSaveSuccess());
    }).catch(e => {
      console.log('error', e);
      dispatch(artistSaveError());
    });
  };
};

export const getArtistById = (id) => {
  return (dispatch) => {
    dispatch(artistStartLoading());

    return ArtistService.getArtistById(id).then(response => {
      dispatch(artistByIdFetched(response));
      dispatch(artistsSongs(id));
      dispatch(artistFinishLoading());
    }).catch(e => {
      console.log('error', e);
      dispatch(artistFinishLoading());
    });
  };
};

export const artistsSongs = (id) => {
  return (dispatch) => {
    return SongService.artistSongs(id).then(response => {
      dispatch(fetchedArtistSongs(response));
    }).catch(e => {
      console.log('error', e);
    });
  };
};

export const artistFollow = (id) => {
  return (dispatch) => {
    dispatch(artistStartLoading());

    return UserService.followArtist(id).then(_ => {
      dispatch(artistFollowSuccess());
    }).catch(e => {
      dispatch(artistFollowError());
    });
  };
};

export const artistStopFollow = (id) => {
  return (dispatch) => {
    dispatch(artistStartLoading());

    return UserService.stopFollowArtist(id).then(_ => {
      dispatch(artistStopFollowSuccess());
    }).catch(e => {
      dispatch(artistFollowError());
    });
  };
};

export const getNotifications = () => {
  return (dispatch) => {
    dispatch(notificationsStartLoading());

    return UserService.getNotifications().then(response => {
      dispatch(fetchedNotifications(response.data));
    }).catch(e => {
      dispatch(notificationsFinishedLoading());
    });
  };
};

export const getFollowNotifications = () => {
  return (dispatch) => {
    dispatch(notificationsStartLoading());

    return UserService.getFollowNotifications().then(response => {
      dispatch(fetchedFollowersNotifications(response.data));
    }).catch(e => {
      dispatch(notificationsFinishedLoading());
    });
  };
};
