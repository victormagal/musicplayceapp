import {
  FOLDER_START_LOADING, FOLDER_FINISH_LOADING, FETCHED_FOLDERS, FETCHED_FAVORITES_FOLDERS_SONGS, FETCHED_USER_FOLDERS_SONGS
} from './folderAction';


const folderReducer = (state, action) => {
  state = state || {
      loading: false,
      folders: null
    };

  switch (action.type) {

    case FOLDER_START_LOADING:
      return {
        ...state,
        loading: true
      };

    case FOLDER_FINISH_LOADING:
      return {
        ...state,
        loading: false
      };

    case FETCHED_FOLDERS:
      return {
        ...state,
        loading: false,
        folders: action.payload
      };

    case FETCHED_FAVORITES_FOLDERS_SONGS:
      return {
        ...state,
        loading: false,
        favoritesFolder: action.payload
      };

    case FETCHED_USER_FOLDERS_SONGS:
      return {
        ...state,
        loading: false,
        userFolder: action.payload
      };
  }

  return state;
};

export default folderReducer;
