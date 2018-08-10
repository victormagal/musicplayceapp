import {
  USER_START_LOADING,
  USER_FINISH_LOADING,
  USERS_FETCHED,
  USER_SAVE_SUCCESS,
  USER_BY_ID_FETCHED,
  USER_SONGS_FETCHED,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_ERROR,
  USER_NOTIFICATIONS_START_LOADING,
  USER_NOTIFICATIONS_FETCHED,
  USER_NOTIFICATIONS_FOLLOWERS_FETCHED,
  USER_NOTIFICATIONS_FINISHED_LOADING,
  USER_SAVE_ERROR,
  USER_NOTIFICATIONS_SETTINGS_START_LOADING,
  USER_NOTIFICATIONS_SETTINGS_FINISHED_LOADING,
  USER_NOTIFICATIONS_SETTINGS_FETCHED,
  USER_NOTIFICATIONS_SETTINGS_PATCHED,
  USER_STOP_FOLLOW_SUCCESS,
  USER_FOLLOWERS_FETCHED,
  USER_FOLLOWINGS_FETCHED
} from './userTypes';

const userReducer = (state, action) => {
  state = state || {
    loading: false,
    user: null,
    isUserSaved: false,
    users: [],
    usersSongs: null,
    userNotifications: [],
    userFollowNotifications: [],
    followingUser: false,
    userFollowers: [],
    userFollowings: [],
  };

  switch (action.type) {
    case USER_START_LOADING:
      return {
        ...state,
        loading: true
      };

    case USER_FINISH_LOADING:
      return {
        ...state,
        loading: false,
        isUserSaved: false
      };

    case USER_BY_ID_FETCHED:
      return {
        ...state,
        loading: false,
        user: action.payload
      };

    case USERS_FETCHED:
      return {
        ...state,
        loading: false,
        users: action.payload
      };

    case USER_SAVE_SUCCESS:
      return {
        ...state,
        isUserSaved: true
      };
    
    case USER_NOTIFICATIONS_FINISHED_LOADING:
    case USER_NOTIFICATIONS_SETTINGS_FINISHED_LOADING:
    case USER_FOLLOW_ERROR:
    case USER_SAVE_ERROR:
      return {
        ...state,
        loading: false
      };

    case USER_FOLLOW_SUCCESS:
      return {
        ...state,
        followingUser: true,
        loading: false,
      };

    case USER_STOP_FOLLOW_SUCCESS:
      return {
        ...state,
        followingUser: false,
        loading: false,
      };

    case USER_SONGS_FETCHED:
      return {
        ...state,
        usersSongs: action.payload
      };

    case USER_NOTIFICATIONS_SETTINGS_START_LOADING:
    case USER_NOTIFICATIONS_START_LOADING:
      return {
        ...state,
        loading: true
      };
    
    case USER_NOTIFICATIONS_FETCHED:
      return {
        ...state,
        loading: false,
        userNotifications: action.payload,
      };

    case USER_NOTIFICATIONS_FOLLOWERS_FETCHED:
      return {
        ...state,
        loading: false,
        userFollowNotifications: action.payload,
      };

    case USER_NOTIFICATIONS_SETTINGS_PATCHED:
    case USER_NOTIFICATIONS_SETTINGS_FETCHED:
      return {
        ...state,
        loading: false,
        notificationSettings: action.payload,
      };

    case USER_FOLLOWERS_FETCHED:
      return {
        ...state,
        loading: false,
        userFollowers: action.payload,
      };

    case USER_FOLLOWINGS_FETCHED:
      return {
        ...state,
        loading: false,
        userFollowings: action.payload,
      };
  }

  return state;
};

export default userReducer;
