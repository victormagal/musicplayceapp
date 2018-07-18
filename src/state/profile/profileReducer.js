import {
  FETCHED_PROFILE, PROFILE_START_LOADING, PROFILE_FINISH_LOADING, SAVE_PROFILE_SUCCESS,
  PROFILE_CREATE_USER_SUCCESS, PROFILE_CREATE_USER_ERROR
} from './profileAction';
import {
  AUTH_LOGOUT
} from '../auth/authAction';

const profileReducer = (state, action) => {
  state = state || {
      saveProfileSuccess: null,
      createUserSuccess: false,
      createUserError: false,
      loading: false,
      profile: null,
      user: null
    };

  state.saveProfileSuccess = null;
  state.createUserSuccess = false;
  state.createUserError = false;

  switch (action.type) {
    case FETCHED_PROFILE:
      return {
        ...state,
        ...action.payload
      };
    case PROFILE_START_LOADING:
      return {
        ...state,
        loading: true
      };
    case PROFILE_FINISH_LOADING:
      return {
        ...state,
        loading: false
      };

    case SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        saveProfileSuccess: true
      };

    case PROFILE_CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        createUserSuccess: true
      };

    case PROFILE_CREATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        createUserError: true
      };

    case AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        profile: null
      };
  }

  return state;
};

export default profileReducer;
