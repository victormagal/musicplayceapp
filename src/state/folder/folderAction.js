import {createAction} from 'redux-actions';
import {FolderService} from '../../service';


export const FOLDER_START_LOADING = 'FOLDER_START_LOADING';
export const FOLDER_FINISH_LOADING = 'FOLDER_FINISH_LOADING';
export const CREATE_FOLDER_SUCCESS = 'CREATE_FOLDER_SUCCESS';
export const CREATE_FOLDER_ERROR = 'CREATE_FOLDER_ERROR';
export const FETCHED_FOLDERS = 'FETCHED_FOLDERS';
export const FETCHED_FAVORITES_FOLDERS_SONGS = 'FETCHED_FAVORITES_FOLDERS_SONGS';
export const FETCHED_USER_FOLDERS_SONGS = 'FETCHED_USER_FOLDERS_SONGS';

export const folderStartLoading = createAction(FOLDER_START_LOADING);
export const folderFinishLoading = createAction(FOLDER_FINISH_LOADING);
export const createFolderSuccess = createAction(CREATE_FOLDER_SUCCESS);
export const createFolderError = createAction(CREATE_FOLDER_ERROR);

export const fetchedFavoriteFolderWithSongs = createAction( FETCHED_FAVORITES_FOLDERS_SONGS, (folders) => {
  return folders;
})

export const fetchedUserFolderWithSongs = createAction( FETCHED_USER_FOLDERS_SONGS, (folders) => {
  return folders;
})

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

export const getUserSongsWithFolders = () => {
  return (dispatch) => {
    dispatch(folderStartLoading());

    return FolderService.getUserSongsWithFolders().then(response => {
      dispatch(fetchedUserFolderWithSongs(response));
    }).catch(e => console.log(e));
  }
}

export const getUserSongsFolders = () => {
  return (dispatch, getState) => {
    dispatch(folderStartLoading());

    return FolderService.getUserSongsFolders().then(response => {
      dispatch(fetchedFolders(response));
    }).catch(e => {
      //TODO: handle error
      dispatch(folderFinishLoading());
    });
    // if(shouldFetchFolders(getState())) {
    //   return FolderService.getUserSongsFolders().then(response => {
    //     dispatch(fetchedFolders(response));
    //   }).catch(e => {
    //     //TODO: handle error
    //     dispatch(folderFinishLoading());
    //   });
    // }

    return Promise.resolve().then(() => dispatch(folderFinishLoading()));
  };
};

export const getFavoriteSongsWithFolders = () => {
  return (dispatch) => {
    dispatch(folderStartLoading());

    return FolderService.getFavoriteSongsWithFolders().then(response => {
      dispatch(fetchedFavoriteFolderWithSongs(response));
    }).catch(e => console.log(e));
  }
}

export const getFavoriteSongsFolders = () => {
  return (dispatch, getState) => {
    dispatch(folderStartLoading());

      return FolderService.getFavoriteSongsFolders().then(response => {
        dispatch(fetchedFolders(response));
      }).catch(e => {
        //TODO: handle error
        dispatch(folderFinishLoading());
      });
    // if(shouldFetchFolders(getState())) {
    //   return FolderService.getFavoriteSongsFolders().then(response => {
    //     dispatch(fetchedFolders(response));
    //   }).catch(e => {
    //     //TODO: handle error
    //     dispatch(folderFinishLoading());
    //   });
    // }

    return Promise.resolve().then(() => dispatch(folderFinishLoading()));
  };
};

export const createFolder = (folder) => {
  return (dispatch) => {
    dispatch(folderStartLoading());
    return FolderService.create(folder).then(response => {
      dispatch(getUserSongsFolders());
    }).catch(e => {
      dispatch(folderFinishLoading());
    });
  };
};

export const updateFolderName = (folderId, newName) => {
  return (dispatch, getState) => {
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
}

const shouldFetchFolders = (state) => {
  return !(state.folderReducer.folders && state.folderReducer.folders.data.length > 0);
};
