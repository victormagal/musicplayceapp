import {UPDATE_SONG_REGISTER_DATA} from './songsAction';

const songsReducer = (state, action) => {
    state = state || {
        song: {
            name: '',
            letter: '',
            genres: '',
            description: '',
            authors: '',
            interpreters: '',
            folders: ''
        }
    };

    switch (action.type){
      case UPDATE_SONG_REGISTER_DATA:
            return {
                ...state,
                song: {...action.payload}
            };
    }

    return state;
};

export default songsReducer;
