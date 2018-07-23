import {createAction} from 'redux-actions';
import {ArtistService} from '../../service';


export const ARTIST_START_LOADING = 'ARTIST_START_LOADING';
export const ARTIST_FINISH_LOADING = 'ARTIST_FINISH_LOADING';
export const FETCHED_ARTISTS = 'FETCHED_ARTISTS';
export const ARTIST_SAVE_SUCCESS = 'ARTIST_SAVE_SUCCESS';
export const ARTIST_SAVE_ERROR = 'ARTIST_SAVE_ERROR';

export const fetchedArtists = createAction(FETCHED_ARTISTS, (data) => data);
export const artistStartLoading = createAction(ARTIST_START_LOADING);
export const artistFinishLoading = createAction(ARTIST_FINISH_LOADING);
export const artistSaveSuccess = createAction(ARTIST_SAVE_SUCCESS);
export const artistSaveError = createAction(ARTIST_SAVE_ERROR);


export const fetchArtists = (name) => {
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

    return ArtistService.update(id, artist).then(response => {
      dispatch(artistSaveSuccess());
    }).catch(e => {
      dispatch(artistSaveError());
    });
  };
};
