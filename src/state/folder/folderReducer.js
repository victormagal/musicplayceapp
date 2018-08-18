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
      if(state.userFolders && action.payload.pagination.current_page > 1) {
        folders = {...state.userFolders};
        folders.data = folders.data.concat(action.payload.data);
        folders.pagination = action.payload.pagination;
      }

      return {
        ...state,
        loading: false,
        userFolders: folders
      };

    case FETCHED_FAVORITES_FOLDERS:
      let favoriteFolders = action.payload;
      if(state.favoritesFolder && action.payload.pagination.current_page > 1) {
        favoriteFolders = {...state.favoritesFolder};
        favoriteFolders.data = favoriteFolders.data.concat(action.payload.data);
        favoriteFolders.pagination = action.payload.pagination;
      }
      return {
        ...state,
        loading: false,
        favoritesFolder: favoriteFolders
      };
  }

  return state;
};

export default folderReducer;
