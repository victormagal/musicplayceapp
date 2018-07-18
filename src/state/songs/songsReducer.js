import {UPDATE_SONG_REGISTER_DATA} from './songsAction';

const songsReducer = (state, action) => {
  state = state || {
      song: {
        name: '',
        lyrics: '',
        description: '',
        interpreter_name: '',
        coAuthors: null,
        folder: null,
        tags: null,
      }
    };

  switch (action.type) {
    case UPDATE_SONG_REGISTER_DATA:
      return {
        ...state,
        song: {...action.payload}
      };
  }

  return state;
};

export default songsReducer;
