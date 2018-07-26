import {createAction} from 'redux-actions';
import {ArtistService, SongService} from '../../service';


export const ARTIST_START_LOADING = 'ARTIST_START_LOADING';
export const ARTIST_FINISH_LOADING = 'ARTIST_FINISH_LOADING';
export const FETCHED_ARTISTS = 'FETCHED_ARTISTS';
export const ARTIST_BY_ID_FETCHED = 'ARTIST_BY_ID_FETCHED';
export const ARTIST_SAVE_SUCCESS = 'ARTIST_SAVE_SUCCESS';
export const ARTIST_SAVE_ERROR = 'ARTIST_SAVE_ERROR';
export const FETCHED_ARTIST_SONGS = 'FETCHED_ARTIST_SONGS';

export const fetchedArtists = createAction(FETCHED_ARTISTS, (data) => data);
export const artistByIdFetched = createAction(ARTIST_BY_ID_FETCHED, (data) => data);
export const artistStartLoading = createAction(ARTIST_START_LOADING);
export const artistFinishLoading = createAction(ARTIST_FINISH_LOADING);
export const artistSaveSuccess = createAction(ARTIST_SAVE_SUCCESS);
export const artistSaveError = createAction(ARTIST_SAVE_ERROR);
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
