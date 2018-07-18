import {createAction} from 'redux-actions';
import {SongService} from '../../service';

export const UPDATE_SONG_REGISTER_DATA = 'UPDATE_SONG_REGISTER_DATA';

export const updateSongRegisterData = createAction(UPDATE_SONG_REGISTER_DATA, (data) => {
    return {...data};
});

export const createSong = (song) => {
  return (dispatch, getState) => {
    let {profile} = getState().profileReducer;
    song.artist_id = profile.id;
    SongService.create(song).then(response => {
      console.log(response);
    }).catch(e => {
      console.log(e);
      console.log(e.response);
    });
  };
};
