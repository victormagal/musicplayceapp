import {
  FETCHED_PROFILE,
  PROFILE_START_LOADING,
  PROFILE_FINISH_LOADING,
  SAVE_PROFILE_SUCCESS,
  PROFILE_CREATE_USER_SUCCESS,
  PROFILE_CREATE_USER_ERROR,
  SAVE_PROFILE_ERROR,
  PROFILE_IMAGE_UPLOADED,
  PROFILE_FOLLOWERS_FETCHED,
  PROFILE_FOLLOWING_FETCHED,
  IMAGE_PROFILE_START_LOADING,
  IMAGE_PROFILE_FINISHED_LOADING,
  FETCHED_PROFILE_MY_SONGS,
  FETCHED_PROFILE_MY_FAVORITE_SONGS,
  FETCHED_PROFILE_MY_SONGS_WITHOUT_FOLDER
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
      imageLoading: false,
      mySongs: null,
      myFavoriteSongs: null
    };

  let folder = null;

  switch (action.type) {
    case USER_FOLLOW_SUCCESS:
      if (state.following) {
        state.following.push(action.payload.user);
        return {
          ...state
        };
      }
      break;

    case USER_STOP_FOLLOW_SUCCESS:
      if (state.following && typeof action.payload.user !== 'undefined') {
        let data = Object.assign([], state.following);
        data.splice(state.following.indexOf(data.find(i => i.id === action.payload.user.id)), 1);
        return {
          ...state,
          following: data
        };
      }
      break;

    case FETCHED_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case FETCHED_PROFILE_MY_FAVORITE_SONGS:
      return {
        ...state,
        myFavoriteSongs: action.payload
      };

    case FETCHED_PROFILE_MY_SONGS:
      return {
        ...state,
        mySongs: action.payload
      };

    case FETCHED_PROFILE_MY_SONGS_WITHOUT_FOLDER:
      let mySongs = {...state.mySongs};
      folder = mySongs.data.find(f => f.id === action.payload.folder.id);
      folder.songs = {...folder.songs, data: Object.assign([], folder.songs.data)}
      folder.songs.data = folder.songs.data.concat(action.payload.data);
      folder.songs.pagination = action.payload.pagination;

      return {
        ...state,
        mySongs
      };

    case PROFILE_START_LOADING:
      return {
        ...state,
        loading: true
      };

    case IMAGE_PROFILE_START_LOADING:
      return {
        ...state,
        imageLoading: true
      };

    case IMAGE_PROFILE_FINISHED_LOADING:
      return {
        ...state,
        imageLoading: false,
        saveProfileSuccess: false
      };

    case PROFILE_IMAGE_UPLOADED:
      return {
        ...state,
        saveProfileSuccess: true
      }

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

    case AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        profile: null
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
