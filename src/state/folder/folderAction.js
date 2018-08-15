import {createAction} from 'redux-actions';
import {FolderService} from '../../service';


export const FOLDER_START_LOADING = 'FOLDER_START_LOADING';
export const FOLDER_FINISH_LOADING = 'FOLDER_FINISH_LOADING';
export const CREATE_FOLDER_ERROR = 'CREATE_FOLDER_ERROR';
export const FETCHED_FAVORITES_FOLDERS = 'FETCHED_FAVORITES_FOLDERS';
export const FETCHED_USER_FOLDERS = 'FETCHED_USER_FOLDERS';

export const folderStartLoading = createAction(FOLDER_START_LOADING);
export const folderFinishLoading = createAction(FOLDER_FINISH_LOADING);
export const createFolderError = createAction(CREATE_FOLDER_ERROR);
export const fetchedUserFolders = createAction(FETCHED_USER_FOLDERS, data => data);
export const fetchedFavoriteFolders = createAction(FETCHED_FAVORITES_FOLDERS, data => data);


export const getUserSongsFolders = (page = 0) => {
  return (dispatch, getState) => {
    const id = getState().profileReducer.profile.id;
    dispatch(folderStartLoading());

    return FolderService.getUserSongsFolders(id, page).then(response => {
      dispatch(fetchedUserFolders(response));
    }).catch(e => {
      dispatch(folderFinishLoading());
    });
  };
};

export const getFavoriteSongsFolders = (page = 0) => {
  return (dispatch) => {
    dispatch(folderStartLoading());

    return FolderService.getFavoriteSongsFolders().then(response => {
      dispatch(fetchedFavoriteFolders(response));
    }).catch(e => {
      dispatch(folderFinishLoading());
    });
  };
};

export const createFolder = (folder) => {
  return (dispatch) => {
    dispatch(folderStartLoading());
    return FolderService.create(folder).then(_ => {
      if(folder.type === 'favoriteSongs') dispatch(getFavoriteSongsFolders());
      if(folder.type === 'userSongs') dispatch(getUserSongsFolders());
    }).catch(_ => {
      dispatch(createFolderError());
    });
  };
};

export const updateFolderName = (folderId, newName) => {
  return (dispatch) => {
    dispatch(folderStartLoading());
    return FolderService.updateFolderName(folderId, newName).then(response => {
      if(response.data.data.attributes.type == 'userSongs'){
        // TODO
      }

      if(response.data.data.attributes.type == 'favoriteSongs'){
        // TODO
      }
    }).catch(e => {
      console.log(e);
    })
  }
};
