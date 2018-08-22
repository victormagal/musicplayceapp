import {
  PLAYER_SONG_SAVE,
  PLAYER_SONG_PAUSE,
  PLAYER_SONG_PLAY,
  PLAYER_SONG_RESUME,
  PLAYER_SONG_STOP,
  PLAYER_START_FETCH_ARTISTS_SONGS,
  PLAYER_FETCH_ARTISTS_SONGS_SUCCESS,
  PLAYER_FETCH_ARTISTS_SONGS_ERROR,
  PLAYER_SONG_UPDATE_PROGRESS,
  PLAYER_FETCHED_SONGS_PAGINATION
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
      },
      loading: false,
      userSongs: [],  
    };

  switch (action.type) {

    case PLAYER_SONG_SAVE:
      let folder = action.payload.folder;
      return {...state, saveSong: {update: true, folder}};

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

    case PLAYER_START_FETCH_ARTISTS_SONGS:
      if(typeof action.payload !== 'undefined'){
        let newSongsUser = state.userSongs[action.payload];
        newSongsUser = {...newSongsUser, loading: true};
        state.userSongs.splice(action.payload, 1, newSongsUser);
        state.userSongs = Object.assign([], state.userSongs);

        return {
          ...state
        };
      }

      return {...state, loading: true};

    case PLAYER_FETCHED_SONGS_PAGINATION:
      let newSongsUser = state.userSongs[action.payload.listIndex];
      newSongsUser.data = newSongsUser.data.concat(action.payload.data);
      newSongsUser.pagination = action.payload.pagination;
      newSongsUser.loading = false;
      state.userSongs.splice(action.payload.listIndex, 1, newSongsUser);
      state.userSongs = Object.assign([], state.userSongs);
      return {...state};

    case PLAYER_FETCH_ARTISTS_SONGS_SUCCESS:
      return {...state, loading: false, userSongs: action.payload};
    
    case PLAYER_FETCH_ARTISTS_SONGS_ERROR:
     return {...state, loading: false};

    case PLAYER_SONG_UPDATE_PROGRESS:
      return {...state, player: {...state.player, progress: action.payload}};
  }

  return state;
};

export default playerReducer;
