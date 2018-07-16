import {createAction} from 'redux-actions';
import {UserService, AuthService} from '../../service';


export const FETCHED_PROFILE = 'FETCHED_PROFILE';
export const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS';
export const PROFILE_START_LOADING = 'PROFILE_START_LOADING';
export const PROFILE_FINISH_LOADING = 'PROFILE_FINISH_LOADING';
export const PROFILE_CREATE_USER_SUCCESS = 'PROFILE_CREATE_USER_SUCCESS';
export const PROFILE_CREATE_USER_ERROR = 'PROFILE_CREATE_USER_ERROR';

export const profileStartLoading = createAction(PROFILE_START_LOADING, () => null);
export const profileFinishLoading = createAction(PROFILE_FINISH_LOADING, () => null);

export const fetchedProfile = createAction(FETCHED_PROFILE, (data) => {
  return {profile: data};
});

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
      dispatch(createUserError());
    });
  };
};

export const fetchProfile = () => {
    return (dispatch, getState) => {
        dispatch(profileStartLoading());
        if(shouldFetchProfile(getState())) {
            return AuthService.me()
                              .then(response => dispatch(fetchedProfile((response))));
        }

        dispatch(profileFinishLoading());
        return Promise.resolve();
    };
};

export const saveProfile = (data, page) => {
  return (dispatch, getState) => {
    dispatch(profileStartLoading());
    return Promise.resolve().then(() => {
        setTimeout(() => {
          dispatch(saveProfileSucessfully({page}));
          dispatch(profileFinishLoading());
        }, 1000);
    });
  };
};

const shouldFetchProfile = (state) => {
  return (!state.profileReducer.profile || !state.profileReducer.profile.name);
};
