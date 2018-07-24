import {
  PLAYER_SONG_SAVE, PLAYER_SONG_SAVE_RECEIVED, PLAYER_SONG_PAUSE, PLAYER_SONG_PLAY, PLAYER_SONG_RESUME
} from './playerAction';


const playerReducer = (state, action) => {
  state = state || {
      player: {
        song: null,
        inProgress: false,
        isPlaying: false,
      },
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

    case PLAYER_SONG_PLAY:
      return {...state, player: {song: {...action.payload}, isPlaying:true, inProgress: true}};

    case PLAYER_SONG_RESUME:
      return {...state, player: {...state.player, isPlaying:true}};

    case PLAYER_SONG_PAUSE:
      return {...state, player: {...state.player, isPlaying:false}};

  }

  return state;
};

export default playerReducer;
