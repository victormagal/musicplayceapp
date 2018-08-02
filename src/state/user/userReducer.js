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
  USER_SAVE_ERROR
} from './userTypes';

const userReducer = (state, action) => {
  state = state || {
    loading: false,
    user: null,
    isUserSaved: false,
    usersSongs: [],
    userNotifications: [],
    userFollowNotifications: [],
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
        loading: false
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
        loading: false,
        isUserSaved: true
      };
    
    case USER_NOTIFICATIONS_FINISHED_LOADING:
    case USER_FOLLOW_SUCCESS:
    case USER_FOLLOW_ERROR:
    case USER_SAVE_ERROR:
      return {
        ...state,
        loading: false
      };

    case USER_SONGS_FETCHED:
      return {
        ...state,
        usersSongs: action.payload
      };

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
      }
  }

  return state;
};

export default userReducer;
