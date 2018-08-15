import {
  FOLDER_START_LOADING, FOLDER_FINISH_LOADING,
  CREATE_FOLDER_ERROR, FETCHED_USER_FOLDERS, FETCHED_FAVORITES_FOLDERS
} from './folderAction';


const folderReducer = (state, action) => {
  state = state || {
      loading: false,
      favoritesFolder: null,
      userFolders: null
    };

  switch (action.type) {

    case FOLDER_START_LOADING:
      return {
        ...state,
        loading: true
      };

    case CREATE_FOLDER_ERROR:
    case FOLDER_FINISH_LOADING:
      return {
        ...state,
        loading: false
      };

    case FETCHED_USER_FOLDERS:
      let folders = action.payload;
      if(state.userFolders) {
        folders = {...state.userFolders};
        if (action.payload.pagination.current_page > 1) {
          folders.data = folders.data.concat(action.payload.data);
          folders.pagination = action.payload.pagination;
        }
      }

      return {
        ...state,
        loading: false,
        userFolders: folders
      };

    case FETCHED_FAVORITES_FOLDERS:
      return {
        ...state,
        loading: false,
        favoritesFolder: action.payload
      };
  }

  return state;
};

export default folderReducer;
