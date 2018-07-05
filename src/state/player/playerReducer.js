import {PLAYER_SONG_SAVE, PLAYER_SONG_SAVE_RECEIVED} from './playerAction';


const playerReducer = (state, action) => {
  state = state || {
      saveSong: {
        update: false,
        folder: ''
      }
    };

  switch (action.type) {

    case PLAYER_SONG_SAVE:
      let folder = action.payload.folder;
      return {...state, saveSong: {update: true, folder}};

    case PLAYER_SONG_SAVE_RECEIVED:
      return {...state, saveSong: {update: false}};

  }

  return state;
};

export default playerReducer;
