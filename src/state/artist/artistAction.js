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
export const ARTIST_FOLLOW_ERROR = 'ARTIST_FOLLOW_ERROR';

export const fetchedArtists = createAction(FETCHED_ARTISTS, (data) => data);
export const artistByIdFetched = createAction(ARTIST_BY_ID_FETCHED, (data) => data);
export const artistStartLoading = createAction(ARTIST_START_LOADING);
export const artistFinishLoading = createAction(ARTIST_FINISH_LOADING);
export const artistSaveSuccess = createAction(ARTIST_SAVE_SUCCESS);
export const artistSaveError = createAction(ARTIST_SAVE_ERROR);
export const artistFollowSuccess = createAction(ARTIST_FOLLOW_SUCCESS);
export const artistFollowError = createAction(ARTIST_FOLLOW_ERROR);
export const fetchedArtistSongs = createAction(FETCHED_ARTIST_SONGS, (data) => data);


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
    return UserService.followArtist(id).then(_ => {
      dispatch(artistFollowSuccess());
    }).catch(e => {
      dispatch(artistFollowError());
    });
  };
};
