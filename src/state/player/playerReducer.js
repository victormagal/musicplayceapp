import {
  PLAYER_SONG_SAVE, PLAYER_SONG_SAVE_RECEIVED, PLAYER_SONG_PAUSE, PLAYER_SONG_PLAY, PLAYER_SONG_RESUME,
  PLAYER_SONG_STOP, PLAYER_SONG_UPDATE_PROGRESS
} from './playerAction';


const playerReducer = (state, action) => {
  state = state || {
      player: {
        song: null,
        inProgress: false,
        isPlaying: false,
        progress: 0
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
      let newState = {...state};
      newState.player = {...newState.player, song: {...action.payload}, isPlaying:true, inProgress: true};
      return newState;

    case PLAYER_SONG_RESUME:
      return {...state, player: {...state.player, isPlaying:true}};

    case PLAYER_SONG_PAUSE:
      return {...state, player: {...state.player, isPlaying:false}};

    case PLAYER_SONG_STOP:
      return {...state, player: {song: null, inProgress: false, isPlaying: false, progress: 0}};

    case PLAYER_SONG_UPDATE_PROGRESS:
      return {...state, player: {...state.player, progress: action.payload}};
  }

  return state;
};

export default playerReducer;
