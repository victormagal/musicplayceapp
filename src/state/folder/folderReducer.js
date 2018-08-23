import {
  FOLDER_START_LOADING, FOLDER_FINISH_LOADING,
  CREATE_FOLDER_ERROR, FETCHED_USER_FOLDERS, FETCHED_FAVORITES_FOLDERS
} from './folderAction';
import {_appendFoldersData} from '../user/userTypes';


const folderReducer = (state, action) => {
  state = state || {
      loading: false,
      favoritesFolder: null,
      userFolders: null
    };

  switch (action.type) {

    case FOLDER_START_LOADING:
      if(action.payload && action.payload.page > 1){
        const propName = action.payload.type === 'favoriteSongs' ? 'favoritesFolder' : 'userFolders';
        const newOb = Object.assign({}, state[propName]);
        newOb.data = Object.assign([], newOb.data);
        newOb.loading = true;
        state[propName] = newOb;

        return {
          ...state
        };
      }

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
      return {
        ...state,
        loading: false,
        userFolders: _appendFoldersData(action.payload, state.userFolders)
      };

    case FETCHED_FAVORITES_FOLDERS:
      return {
        ...state,
        loading: false,
        favoritesFolder: _appendFoldersData(action.payload, state.favoritesFolder)
      };
  }

  return state;
};

export default folderReducer;
