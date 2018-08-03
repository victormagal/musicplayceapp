import {
  FETCHED_PROFILE,
  FETCHED_MY_FOLLOWERS,
  FETCHED_MY_INDICATIONS,
  PROFILE_START_LOADING,
  PROFILE_FINISH_LOADING,
  SAVE_PROFILE_SUCCESS,
  PROFILE_CREATE_USER_SUCCESS,
  PROFILE_CREATE_USER_ERROR
} from './profileAction';
import {
  AUTH_LOGOUT
} from '../auth/authAction';


const profileReducer = (state, action) => {
  state = state || {
      saveProfileSuccess: false,
      createUserSuccess: false,
      createUserError: false,
      loading: false,
      profile: null,
      followers: null,
      indications: null
    };

  switch (action.type) {
    case FETCHED_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case PROFILE_START_LOADING:
      return {
        ...state,
        loading: true
      };

    case PROFILE_FINISH_LOADING:
      return {
        ...state,
        loading: false,
        saveProfileSuccess: false
      };

    case SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        saveProfileSuccess: true,
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

    case FETCHED_MY_FOLLOWERS:
      return {
        ...state,
        followers: action.payload
      };

    case FETCHED_MY_INDICATIONS:
      return {
        ...state,
        indications: action.payload
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
