import {
  USER_START_LOADING, USER_FINISH_LOADING, USERS_FETCHED, USER_SAVE_SUCCESS, USER_BY_ID_FETCHED,
  USER_SONGS_FETCHED, USER_FOLLOW_SUCCESS, USER_FOLLOW_ERROR, USER_NOTIFICATIONS_START_LOADING,
  USER_NOTIFICATIONS_FETCHED, USER_NOTIFICATIONS_FOLLOWERS_FETCHED, USER_NOTIFICATIONS_FINISHED_LOADING,
  USER_SAVE_ERROR, USER_NOTIFICATIONS_SETTINGS_START_LOADING, USER_NOTIFICATIONS_SETTINGS_FINISHED_LOADING,
  USER_NOTIFICATIONS_SETTINGS_FETCHED, USER_NOTIFICATIONS_SETTINGS_PATCHED, USER_STOP_FOLLOW_SUCCESS,
  USER_FOLLOWERS_FETCHED, USER_FOLLOWINGS_FETCHED, USER_REPORT_SUCCESS, USER_REPORT_ERROR,
  USER_REPORT_STARTED, USER_HIDE_NOTIFICATION, USER_FOLLOW_NOTIFICATIONS_START_LOADING, USER_FOLLOW_NOTIFICATIONS_FINISHED_LOADING
} from './userTypes';

const userReducer = (state, action) => {
  state = state || {
    loading: false,
    user: null,
    isUserSaved: false,
    users: [],
    usersSongs: null,
    followSuccess: false,
    stopFollowSuccess: false,
    userNotifications: [],
    userFollowNotifications: [],
    followingUser: false,
    userFollowers: [],
    userFollowings: [],
    notificationSettings: null,
    isUserNotificationsSaved: false,
    refreshUserFollowings: false,
    refreshNotifications: false,
  };

  let user = {};

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

    case USER_FOLLOW_ERROR:
    case USER_SAVE_ERROR:
      return {
        ...state,
        loading: false,
      }
    case USER_NOTIFICATIONS_FINISHED_LOADING:
      return {
        ...state,
        refreshNotifications: false
      };

    case USER_NOTIFICATIONS_SETTINGS_FINISHED_LOADING:
      return {
        ...state,
        loading: false,
        isUserNotificationsSaved: false
      };

    case USER_FOLLOW_SUCCESS:
      if(state.user) {
        //TODO: review increase follower count instead of following count
        user = {...state.user, isFollowing: true, followingCount: state.user.followingCount + 1};
      }

      //TODO: remover, só serve para o mock de artistas feed screen
      if(state.users && typeof action.payload.user !== 'undefined'){
        let data = Object.assign([], state.users.data);
        const artist = data.find(i => action.payload.user.id === i.id);
        artist.isFollowing = true;
        state.users.data = data;
      }

      if(state.userFollowings && state.userFollowings.length > 0) {
        state.userFollowings.push(action.payload.user);
      }

      return {
        ...state,
        user,
        followSuccess: true,
        loading: false,
      };

    case USER_STOP_FOLLOW_SUCCESS:
      if(state.user) {
        user = {...state.user, isFollowing: false, followerCount: state.user.followerCount - 1};
      }

      //TODO: remover, só serve para o mock de artistas feed screen
      if(state.users && typeof action.payload.user !== 'undefined'){
        let data = Object.assign([], state.users.data);
        const artist = data.find(i => action.payload.user.id === i.id);
        artist.isFollowing = false;
        state.users.data = data;
      }

      if(state.userFollowers && state.userFollowers.length > 0) {
        state.userFollowers.splice(state.userFollowers.indexOf(state.userFollowers.find(i => i.id === user.id)), 1);
      }

      return {
        ...state,
        user,
        stopFollowSuccess: true,
        loading: false,
      };

    case USER_SONGS_FETCHED:
      return {
        ...state,
        usersSongs: action.payload
      };
    
    case USER_REPORT_STARTED:
    case USER_NOTIFICATIONS_SETTINGS_START_LOADING:
      return {
        ...state,
        loading: true,
      }

    case USER_NOTIFICATIONS_START_LOADING:
      return {
        ...state,
        refreshNotifications: true,
      };
    
    case USER_FOLLOW_NOTIFICATIONS_START_LOADING: 
      return {
        ...state,
        refreshUserFollowings: true,
      }

    case USER_FOLLOW_NOTIFICATIONS_FINISHED_LOADING:
      return {
        ...state,
        refreshUserFollowings: false,
      }

    case USER_NOTIFICATIONS_FETCHED:
    console.log(action);
      let userNotifications = action.payload;
      if(state.userNotifications && action.payload.reset == false){
        userNotifications = {...state.userNotifications};
        if(action.payload.meta.pagination.current_page > 1){
          userNotifications.data = userNotifications.data.concat(action.payload.data);
          userNotifications.meta = action.payload.meta;
        }
      }
      return {
        ...state,
        loading: false,
        refreshNotifications: false,
        userNotifications: action.payload,
      };

    case USER_NOTIFICATIONS_FOLLOWERS_FETCHED:
      let userFollowNotifications = action.payload;
      if(state.userFollowNotifications && action.payload.reset == false){
        userFollowNotifications = {...state.userFollowNotifications};
        if(action.payload.meta.pagination.current_page > 1){
          userFollowNotifications.data = userFollowNotifications.data.concat(action.payload.data);
          userFollowNotifications.meta = action.payload.meta;
        }
      }
      return {
        ...state,
        loading: false,
        refreshUserFollowings: false,
        userFollowNotifications: action.payload,
      };

    case USER_NOTIFICATIONS_SETTINGS_PATCHED:
      return {
        ...state,
        isUserNotificationsSaved: true,
        notificationSettings: action.payload,
      };

    case USER_NOTIFICATIONS_SETTINGS_FETCHED:
      return {
        ...state,
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

    case USER_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        reportSuccess: true,
      };

    case USER_REPORT_ERROR:
      return {
        ...state,
        loading: false,
        reportSuccess: false,
      };

    case USER_HIDE_NOTIFICATION:
      return {
        ...state,
        followSuccess: false,
        stopFollowSuccess: false
      }
  }

  return state;
};

export default userReducer;
