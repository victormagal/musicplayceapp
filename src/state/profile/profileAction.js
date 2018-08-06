import {createAction} from 'redux-actions';
import {UserService} from '../../service';

export const FETCHED_PROFILE = 'FETCHED_PROFILE';
export const FETCHED_MY_INDICATIONS = 'FETCHED_MY_INDICATIONS';
export const FETCHED_MY_FOLLOWERS = 'FETCHED_MY_FOLLOWERS';
export const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS';
export const PROFILE_START_LOADING = 'PROFILE_START_LOADING';
export const PROFILE_FINISH_LOADING = 'PROFILE_FINISH_LOADING';
export const PROFILE_CREATE_USER_SUCCESS = 'PROFILE_CREATE_USER_SUCCESS';
export const PROFILE_CREATE_USER_ERROR = 'PROFILE_CREATE_USER_ERROR';

export const profileStartLoading = createAction(PROFILE_START_LOADING, () => null);
export const profileFinishLoading = createAction(PROFILE_FINISH_LOADING, () => null);
export const fetchedProfile = createAction(FETCHED_PROFILE, (data) => data);
export const fetchedMyIndications = createAction(FETCHED_MY_INDICATIONS, (data) => data);
export const fetchedMyFollowers = createAction(FETCHED_MY_FOLLOWERS, (data) => data);
export const saveProfileSucessfully = createAction(SAVE_PROFILE_SUCCESS, (data) => {
  return {...data};
});
export const createUserSuccess = createAction(PROFILE_CREATE_USER_SUCCESS);
export const createUserError = createAction(PROFILE_CREATE_USER_ERROR);

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

export const fetchProfile = () => {
  return (dispatch) => {
    dispatch(profileStartLoading());

    dispatch(fetchMyIndications());
    dispatch(fetchMyFollowers());

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
      const responseData = response.data.attributes;
      dispatch(saveProfileSucessfully({ section, responseData }));
      dispatch(profileFinishLoading());

    }).catch(e => {
      console.log('error', e);
      dispatch(profileFinishLoading());
    });
  };
};
