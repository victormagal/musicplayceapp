import {createAction} from 'redux-actions';
import {UserService, SongService} from '../../service';
import { fetchedUserSongs } from '../songs/songsType';

export const FETCHED_PROFILE = 'FETCHED_PROFILE';
export const FETCHED_PROFILE_MY_SONGS = 'FETCHED_PROFILE_MY_SONGS';
export const FETCHED_PROFILE_MY_FAVORITE_SONGS = 'FETCHED_PROFILE_MY_FAVORITE_SONGS';
export const FETCHED_PROFILE_MY_SONGS_WITHOUT_FOLDER = 'FETCHED_PROFILE_MY_SONGS_WITHOUT_FOLDER';
export const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS';
export const SAVE_PROFILE_ERROR = 'SAVE_PROFILE_ERROR';
export const PROFILE_START_LOADING = 'PROFILE_START_LOADING';
export const IMAGE_PROFILE_START_LOADING = 'IMAGE_PROFILE_START_LOADING';
export const IMAGE_PROFILE_FINISHED_LOADING = 'IMAGE_PROFILE_FINISHED_LOADING';
export const PROFILE_FINISH_LOADING = 'PROFILE_FINISH_LOADING';
export const PROFILE_CREATE_USER_SUCCESS = 'PROFILE_CREATE_USER_SUCCESS';
export const PROFILE_CREATE_USER_ERROR = 'PROFILE_CREATE_USER_ERROR';
export const PROFILE_IMAGE_UPLOADED = 'PROFILE_IMAGE_UPLOADED';
export const PROFILE_FOLLOWERS_FETCHED = 'PROFILE_FOLLOWERS_FETCHED';
export const PROFILE_FOLLOWING_FETCHED = 'PROFILE_FOLLOWING_FETCHED';
export const PROFILE_SONG_FAVORITED_SUCCESS = 'PROFILE_SONG_FAVORITED_SUCCESS';

export const profileStartLoading = createAction(PROFILE_START_LOADING);
export const profileFinishLoading = createAction(PROFILE_FINISH_LOADING);
export const fetchedProfile= createAction(FETCHED_PROFILE, (data) => data);
export const fetchedProfileSongs= createAction(FETCHED_PROFILE_MY_SONGS, (data) => data);
export const fetchedProfileMySongsWithoutFolder= createAction(FETCHED_PROFILE_MY_SONGS_WITHOUT_FOLDER, (data) => data);
export const fetchedProfileFavoriteSongs= createAction(FETCHED_PROFILE_MY_FAVORITE_SONGS, (data) => data);
export const fetchedProfileFollowers = createAction(PROFILE_FOLLOWERS_FETCHED, (data) => data);
export const fetchedProfileFollowing = createAction(PROFILE_FOLLOWING_FETCHED, (data) => data);
export const saveProfileSucessfully = createAction(SAVE_PROFILE_SUCCESS, (data) => {
  return {...data};
});
export const saveProfileError = createAction(SAVE_PROFILE_ERROR, (error) => error);
export const createUserSuccess = createAction(PROFILE_CREATE_USER_SUCCESS);
export const createUserError = createAction(PROFILE_CREATE_USER_ERROR);

export const imageProfileStartLoading = createAction(IMAGE_PROFILE_START_LOADING);
export const profileImageUploaded = createAction(PROFILE_IMAGE_UPLOADED);
export const imageProfileFinishedLoading = createAction(IMAGE_PROFILE_FINISHED_LOADING);
export const profileSongFavoritedSuccess = createAction(PROFILE_SONG_FAVORITED_SUCCESS, data => data);

export const createUser = (user) => {
  return (dispatch) => {
    dispatch(profileStartLoading());
    return UserService.createUser(user).then(response => {
      dispatch(createUserSuccess());
      return response;
    }).catch(e => {
      console.log(e);
      dispatch(createUserError());
    });
  };
};

export const uploadImage = (picture) => {
  return (dispatch) => {
    dispatch(imageProfileStartLoading());
    return UserService.uploadImage(picture).then(() => {
      dispatch(profileImageUploaded());
      dispatch(imageProfileFinishedLoading());
    }).catch(e => {
      console.log('uploadImageError', e);
      dispatch(imageProfileFinishedLoading());
    })
  }
};

export const fetchProfile = () => {
  return (dispatch) => {
    dispatch(profileStartLoading());

    return UserService.me()
      .then(response =>{
        dispatch(fetchedProfile((response)));
        UserService.getUserFollowers(response.id).then(responseFollowers => dispatch(fetchedProfileFollowers(responseFollowers)));
        UserService.getUserFollowings(response.id).then(responseFollowings => dispatch(fetchedProfileFollowing(responseFollowings)));
        dispatch(fetchMySongs(response.id));
        dispatch(fetchMyFavoriteSongs());
        return response;
      })
      .catch((e) => {
        console.log('fetchProfileError', e);
        dispatch(profileFinishLoading());
      });
  };
};

export const fetchMySongs = (id, page = 1) => {
  return (dispatch) => {
    return SongService.mySongs(id, page, true).then(response => {
      dispatch(fetchedProfileSongs(response));
      //TODO: dispatch()
      //TODO: dispatch page === 1 replace
      //TODO: dispatch page > 1 append
    });
  };
};

export const fechyMySongsByFolder = (folder, page = 1) => {
  return (dispatch) => {
    if(folder.id === -1) {
      return SongService.mySongsWithoutFolder(page).then(response => {
        dispatch(fetchedProfileMySongsWithoutFolder({folder, ...response}));
      });
    }

    return SongService.songsByFolder(folder.id, page).then(response => {
      //TODO: finish
       console.log("FETCHED ANOTHER SONGS", response);
    });
  };
};

export const fetchMyFavoriteSongs = (page = 1) => {
  return (dispatch) => {
    return SongService.mySongsFavorites(page).then(response => {
      dispatch(fetchedProfileFavoriteSongs(response));
    });
  };
};

export const saveProfile = (data, section) => {
  return (dispatch) => {
    dispatch(profileStartLoading());

    UserService.updateUser(data).then((response) => {
      if (response.error) {
        dispatch(saveProfileError(response.error));
      } else {
        const responseData = response.data.attributes;
        dispatch(saveProfileSucessfully({ section, responseData }));
      }
      dispatch(profileFinishLoading());

    }).catch(e => {
      console.log('error', e);
      console.log(e.response);
      dispatch(profileFinishLoading());
    });
  };
};
