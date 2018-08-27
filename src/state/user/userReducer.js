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
  USER_FOLLOWINGS_FETCHED,
  USER_REPORT_SUCCESS,
  USER_REPORT_ERROR,
  USER_REPORT_STARTED,
  USER_HIDE_NOTIFICATION,
  USER_FOLLOW_NOTIFICATIONS_START_LOADING,
  USER_FOLLOW_NOTIFICATIONS_FINISHED_LOADING,
  USER_SONGS_BY_FOLDER_FETCHED,
  USER_FOLLOWERS_PARTIAL_FETCHED,
  USER_FOLLOWINGS_PARTIAL_FETCHED,
  USER_FOLLOWERS_PARTIAL_START_LOADING,
  USER_FOLLOWINGS_PARTIAL_START_LOADING,
  USER_FOLLOW_PARTIAL_FINISH_LOADING,
  USER_SONGS_START_LOADING,
  USER_SONGS_FINISH_LOADING,
  USER_FOLDER_PAGINATION_LOADING,
  USER_FOLDER_SONGS_PAGINATION_LOADING,
  USER_INVITE_STARTED,
  USER_INVITE_FINISHED,
  USER_INVITE_SUCCESS,
  _appendSongsData,
  _appendFoldersData, USER_START_CHECKING, USER_FINISH_CHECKING
} from './userTypes';


const appendDataUserFollow = ({data, pagination}, result) => {
  result = {...result};
  result.data = Object.assign([], result.data);
  result.data = result.data.concat(data);
  result.pagination = pagination;
  return result;
};

const userReducer = (state, action) => {
  state = state || {
    loading: false,
    user: null,
    isUserSaved: false,
    users: [],
    usersSongs: null,
    followSuccess: false,
    stopFollowSuccess: false,
    userNotifications: null,
    userFollowNotifications: null,
    followingUser: false,
    userFollowers: [],
    userFollowings: [],
    notificationSettings: null,
    isUserNotificationsSaved: false,
    refreshUserFollowings: false,
    refreshNotifications: false,
    userFollowersLoading: false,
    userFollowingLoading: false,
    userFollowingPaginationLoading: false,
    userSongsLoading: false,
    invitationSuccess: false,
    checking: false
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

    case USER_START_CHECKING:
      return {
        ...state,
        checking: true
      };

    case USER_FINISH_CHECKING:
      return {
        ...state,
        checking: false,
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
        refreshNotifications: false,
        loading: false,
      };

    case USER_NOTIFICATIONS_SETTINGS_FINISHED_LOADING:
      return {
        ...state,
        loading: false,
        isUserNotificationsSaved: false
      };

    case USER_FOLLOW_SUCCESS:
      if(state.user) {
        user = {...state.user, isFollowing: true, followingCount: state.user.followingCount + 1};
      }

      //TODO: remover, só serve para o mock de artistas feed screen
      if(state.users && typeof action.payload.user !== 'undefined'){
        let data = Object.assign([], state.users.data);
        const artist = data.find(i => action.payload.user.id === i.id);
        artist.isFollowing = true;
        state.users.data = data;
      }

      if(state.userFollowings && state.userFollowings.data.length > 0) {
        state.userFollowings.data.push(action.payload.user);
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

      if(state.userFollowers && state.userFollowers.data.length > 0) {
        state.userFollowers.splice(state.userFollowers.data.indexOf(state.userFollowers.data.find(i => i.id === user.id)), 1);
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
        userSongsLoading: false,
        usersSongs: _appendFoldersData(action.payload, state.usersSongs)
      };

    case USER_SONGS_BY_FOLDER_FETCHED:
      return {
        ...state,
        userSongsLoading: false,
        usersSongs: _appendSongsData(action.payload, state.usersSongs)
      };

    case USER_REPORT_STARTED:
    case USER_NOTIFICATIONS_SETTINGS_START_LOADING:
      return {
        ...state,
        loading: true,
      };

    case USER_NOTIFICATIONS_START_LOADING:
      return {
        ...state,
        refreshNotifications: true,
      };

    case USER_FOLLOW_NOTIFICATIONS_START_LOADING:
      if(action.payload){
        return {
          ...state,
          userFollowingPaginationLoading: true
        };
      }

      return {
        ...state,
        refreshUserFollowings: true,
      };

    case USER_FOLLOW_NOTIFICATIONS_FINISHED_LOADING:
      return {
        ...state,
        userFollowingPaginationLoading: false,
        refreshUserFollowings: false
      };

    case USER_NOTIFICATIONS_FETCHED:
      let notificationList = action.payload;
      if(state.userNotifications && !action.payload.reset){
        notificationList = {...state.userNotifications};
        if(action.payload.meta.pagination.current_page > 1){
          notificationList.data = Object.assign([], state.userNotifications.data.concat(action.payload.data));
          notificationList.meta = action.payload.meta;
        }
      }
      return {
        ...state,
        loading: false,
        refreshNotifications: false,
        userNotifications: notificationList,
      };

    case USER_NOTIFICATIONS_FOLLOWERS_FETCHED:
      let followNotificationList = action.payload;
      if(state.userFollowNotifications && !action.payload.reset){
        followNotificationList = {...state.userFollowNotifications};
        if(action.payload.meta.pagination.current_page > 1){
          followNotificationList.data = Object.assign([], state.userFollowNotifications.data.concat(action.payload.data));
          followNotificationList.meta = action.payload.meta;
        }
      }
      return {
        ...state,
        loading: false,
        refreshUserFollowings: false,
        userFollowingPaginationLoading: false,
        userFollowNotifications: followNotificationList
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
      };

    case USER_FOLLOWINGS_PARTIAL_FETCHED:
      return{
        ...state,
        userFollowingLoading: false,
        userFollowings: appendDataUserFollow(action.payload, state.userFollowings)
      };

    case USER_FOLLOWERS_PARTIAL_FETCHED:
      return{
        ...state,
        userFollowersLoading: false,
        userFollowers: appendDataUserFollow(action.payload, state.userFollowers)
      };

    case USER_FOLLOWERS_PARTIAL_START_LOADING:
      return {
        ...state,
        userFollowersLoading: true
      };

    case USER_FOLLOWINGS_PARTIAL_START_LOADING:
      return{
        ...state,
        userFollowingLoading: true,
      };

    case USER_FOLLOW_PARTIAL_FINISH_LOADING:
      return {
        ...state,
        userFollowingLoading: false,
        userFollowersLoading: false
      };

    case USER_SONGS_START_LOADING:
      return {
        ...state,
        userSongsLoading: true
      };

    case USER_SONGS_FINISH_LOADING:
      return {
        ...state,
        userSongsLoading: false
      };

    case USER_FOLDER_PAGINATION_LOADING:
      return {
        ...state,
        usersSongs: {...state.usersSongs, loading: true}
      };

    case USER_FOLDER_SONGS_PAGINATION_LOADING:
      let data = Object.assign([], state.usersSongs.data);
      let folder = data.find(f => f.id === action.payload.id);
      folder.loading = true;

      return {
        ...state,
        usersSongs: {...state.usersSongs, data}
      };

    case USER_INVITE_STARTED:
      return {
        ...state,
        loading: true,
      }

    case USER_INVITE_FINISHED:
      return {
        ...state,
        loading: false,
      }

    case USER_INVITE_SUCCESS:
      return {
        ...state,
        loading: false,
        invitationSuccess: true,
      }
  }

  return state;
};

export default userReducer;
