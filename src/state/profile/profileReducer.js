import {
  FETCHED_PROFILE, FETCHED_MY_FOLLOWERS, FETCHED_MY_INDICATIONS, PROFILE_START_LOADING, PROFILE_FINISH_LOADING,
  SAVE_PROFILE_SUCCESS, PROFILE_CREATE_USER_SUCCESS, PROFILE_CREATE_USER_ERROR, UPDATE_PROFILE_DATA,
  PROFILE_IMAGE_UPLOADED
} from './profileAction';
import {
  AUTH_LOGOUT
} from '../auth/authAction';


const profileReducer = (state, action) => {
  state = state || {
    imageUploadedSuccess: false,
    saveProfileSuccess: null,
    createUserSuccess: false,
    createUserError: false,
    loading: false,
    profile: null,
    user: null,
    myFollowers: null,
    myIndications: null
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

    case FETCHED_MY_FOLLOWERS:
      return {
        ...state,
        myFollowers: action.payload
      };

    case FETCHED_MY_INDICATIONS:
      return {
        ...state,
        myIndications: action.payload
      };

    case AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        profile: null,
        user: null
      };

    case UPDATE_PROFILE_DATA:
      return {
        ...state,
        profile: {...action.payload}
      };

    case PROFILE_IMAGE_UPLOADED:
      return {
        ...state,
        imageUploadedSuccess: true
      }
}

  return state;
};

export default profileReducer;
