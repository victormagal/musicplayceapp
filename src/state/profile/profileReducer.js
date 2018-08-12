import {
  FETCHED_PROFILE,
  FETCHED_MY_INDICATIONS,
  PROFILE_START_LOADING,
  PROFILE_FINISH_LOADING,
  SAVE_PROFILE_SUCCESS,
  PROFILE_CREATE_USER_SUCCESS,
  PROFILE_CREATE_USER_ERROR,
  SAVE_PROFILE_ERROR,
  UPDATE_PROFILE_DATA,
  PROFILE_IMAGE_UPLOADED,
  PROFILE_FOLLOWERS_FETCHED,
  PROFILE_FOLLOWING_FETCHED
} from './profileAction';
import {
  AUTH_LOGOUT
} from '../auth/authAction';
import {
  USER_FOLLOW_SUCCESS, USER_STOP_FOLLOW_SUCCESS
} from '../user/userTypes';


const profileReducer = (state, action) => {
  state = state || {
    saveProfileError: null,
    imageUploadedSuccess: false,
    saveProfileSuccess: null,
    createUserSuccess: false,
    createUserError: false,
    loading: false,
    profile: null,
    followers: null,
    following: null,
    indications: null
  };

  switch (action.type) {
    case USER_FOLLOW_SUCCESS:
      if(state.following){
        state.following.push(action.payload);
        return {
          ...state
        };
      }
      break;

      //TODO: update following list when user stops following
    // case USER_STOP_FOLLOW_SUCCESS:
    //   if(state.profile) {
    //     user = {...state.user, isFollowing: false, followerCount: state.user.followerCount - 1};
    //   }
    //   state.userFollowers.splice(state.userFollowers.indexOf(state.userFollowers.find(i => i.id === user.id)), 1);
    //
    //   if(state.following){
    //     state.following.push(action.payload);
    //     return {
    //       ...state
    //     };
    //   }
    //   break;

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
    case PROFILE_IMAGE_UPLOADED:
      return {
        ...state,
        ...action.payload,
        saveProfileSuccess: true,
      };

    case SAVE_PROFILE_ERROR:
      return {
        ...state,
        saveProfileError: action.payload,
        saveProfileSuccess: false,
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

    case UPDATE_PROFILE_DATA:
      return {
        ...state,
        profile: {...action.payload}
      };

    case PROFILE_FOLLOWERS_FETCHED:
      return {
        ...state,
        followers: action.payload
      };

    case PROFILE_FOLLOWING_FETCHED:
      return {
        ...state,
        following: action.payload
      }
}
  return state;
};

export default profileReducer;
