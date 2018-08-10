import {createAction} from 'redux-actions';
import {UserService} from '../../service';

export const FETCHED_PROFILE = 'FETCHED_PROFILE';
export const FETCHED_MY_INDICATIONS = 'FETCHED_MY_INDICATIONS';
export const FETCHED_MY_FOLLOWERS = 'FETCHED_MY_FOLLOWERS';
export const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS';
export const SAVE_PROFILE_ERROR = 'SAVE_PROFILE_ERROR';
export const PROFILE_START_LOADING = 'PROFILE_START_LOADING';
export const PROFILE_FINISH_LOADING = 'PROFILE_FINISH_LOADING';
export const PROFILE_CREATE_USER_SUCCESS = 'PROFILE_CREATE_USER_SUCCESS';
export const PROFILE_CREATE_USER_ERROR = 'PROFILE_CREATE_USER_ERROR';
export const UPDATE_PROFILE_DATA = 'UPDATE_PROFILE_DATA';
export const PROFILE_IMAGE_UPLOADED = 'PROFILE_IMAGE_UPLOADED';

export const profileStartLoading = createAction(PROFILE_START_LOADING);
export const profileFinishLoading = createAction(PROFILE_FINISH_LOADING);
export const fetchedProfile = createAction(FETCHED_PROFILE, (data) => data);
export const fetchedMyIndications = createAction(FETCHED_MY_INDICATIONS, (data) => data);
export const fetchedMyFollowers = createAction(FETCHED_MY_FOLLOWERS, (data) => data);
export const saveProfileSucessfully = createAction(SAVE_PROFILE_SUCCESS, (data) => {
  return {...data};
});
export const saveProfileError = createAction(SAVE_PROFILE_ERROR, (error) => error);
export const createUserSuccess = createAction(PROFILE_CREATE_USER_SUCCESS);
export const createUserError = createAction(PROFILE_CREATE_USER_ERROR);
export const updateProfileData = createAction(UPDATE_PROFILE_DATA, (data) => {
  return {...data};
});
export const profileImageUploaded = createAction(PROFILE_IMAGE_UPLOADED);

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
    dispatch(profileStartLoading());
    return UserService.uploadImage(picture).then(response => {
      console.log('response', response);
      dispatch(profileImageUploaded());
      dispatch(profileFinishLoading());
    }).catch(e => {
      console.log('uploadImageError', e);
      dispatch(profileFinishLoading());
    })
  }
}

export const fetchProfile = () => {
  return (dispatch) => {
    dispatch(profileStartLoading());
    dispatch(fetchMyIndications());

    return UserService.me()
      .then(response => dispatch(fetchedProfile((response))))
      .catch((e) => {
        console.log('fetchProfileError', e);
        dispatch(profileFinishLoading());
      });
  };
};

export const fetchMyIndications = () => {
  return (dispatch) => {
    return UserService.indications()
      .then(response => {
        dispatch(fetchedMyIndications(response))
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const fetchMyFollowers = () => {
  return (dispatch) => {
    return UserService.followers()
      .then(response => {
        dispatch(fetchedMyFollowers(response.followers))
      })
      .catch((e) => {
        console.log(e);
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
