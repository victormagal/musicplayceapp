import {createAction} from 'redux-actions';
import {FolderService} from '../../service';


export const FOLDER_START_LOADING = 'FOLDER_START_LOADING';
export const FOLDER_FINISH_LOADING = 'FOLDER_FINISH_LOADING';
export const CREATE_FOLDER_SUCCESS = 'CREATE_FOLDER_SUCCESS';
export const CREATE_FOLDER_ERROR = 'CREATE_FOLDER_ERROR';
export const FETCHED_FOLDERS = 'FETCHED_FOLDERS';

export const folderStartLoading = createAction(FOLDER_START_LOADING);
export const folderFinishLoading = createAction(FOLDER_FINISH_LOADING);
export const createFolderSuccess = createAction(CREATE_FOLDER_SUCCESS);
export const createFolderError = createAction(CREATE_FOLDER_ERROR);

export const fetchedFolders = createAction(FETCHED_FOLDERS, (folders) => {
  return folders;
});

export const fetchFolders = () => {
  return (dispatch, getState) => {
    dispatch(folderStartLoading());

    if(shouldFetchFolders(getState())) {
      return FolderService.folders().then(response => {
        dispatch(fetchedFolders(response));
      }).catch(e => {
        //TODO: handle error
        dispatch(folderFinishLoading());
      });
    }

    return Promise.resolve().then(() => dispatch(folderFinishLoading()));
  };
};

export const getUserSongsFolders = () => {
  return (dispatch, getState) => {
    dispatch(folderStartLoading());

    if(shouldFetchFolders(getState())) {
      return FolderService.getUserSongsFolders().then(response => {
        dispatch(fetchedFolders(response));
      }).catch(e => {
        //TODO: handle error
        dispatch(folderFinishLoading());
      });
    }

    return Promise.resolve().then(() => dispatch(folderFinishLoading()));
  };
};

export const getFavoriteSongsFolders = () => {
  return (dispatch, getState) => {
    dispatch(folderStartLoading());

    if(shouldFetchFolders(getState())) {
      return FolderService.getFavoriteSongsFolders().then(response => {
        dispatch(fetchedFolders(response));
      }).catch(e => {
        //TODO: handle error
        dispatch(folderFinishLoading());
      });
    }

    return Promise.resolve().then(() => dispatch(folderFinishLoading()));
  };
};

export const createFolder = (folder) => {
  return (dispatch) => {
    dispatch(folderStartLoading());
    return FolderService.create(folder).then(response => {
      console.log('response', response);
      dispatch(fetchFolders());
    }).catch(e => {
      console.log(e);
      //TODO: handle error
      dispatch(folderFinishLoading());
    });
  };
};


const shouldFetchFolders = (state) => {
  return !(state.folderReducer.folders && state.folderReducer.folders.data.length > 0);
};
