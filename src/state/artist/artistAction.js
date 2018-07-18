import {createAction} from 'redux-actions';
import {ArtistService} from '../../service';


export const ARTIST_START_LOADING = 'ARTIST_START_LOADING';
export const ARTIST_FINISH_LOADING = 'ARTIST_FINISH_LOADING';
export const FETCHED_ARTISTS = 'FETCHED_ARTISTS';

export const fetchedArtists = createAction(FETCHED_ARTISTS, (data) => data);
export const artistStartLoading = createAction(ARTIST_START_LOADING);
export const artistFinishLoading = createAction(ARTIST_FINISH_LOADING);


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
