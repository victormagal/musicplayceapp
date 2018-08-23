import { createAction } from "redux-actions";

export const USERS_FETCHED = 'USERS_FETCHED';
export const USER_SONGS_FETCHED = 'USER_SONGS_FETCHED';
export const USER_SONGS_BY_FOLDER_FETCHED = 'USER_SONGS_BY_FOLDER_FETCHED';
export const USER_START_LOADING = 'USER_START_LOADING';
export const USER_FINISH_LOADING = 'USER_FINISH_LOADING';
export const USER_SONGS_START_LOADING = 'USER_SONGS_START_LOADING';
export const USER_SONGS_FINISH_LOADING = 'USER_SONGS_FINISH_LOADING';
export const USER_BY_ID_FETCHED = 'USER_BY_ID_FETCHED';
export const USER_SAVE_SUCCESS = 'USER_SAVE_SUCCESS';
export const USER_SAVE_ERROR = 'USER_SAVE_ERROR';
export const USER_FOLLOW_SUCCESS = 'USER_FOLLOW_SUCCESS';
export const USER_STOP_FOLLOW_SUCCESS = 'USER_STOP_FOLLOW_SUCCESS';
export const USER_FOLLOW_ERROR = 'USER_FOLLOW_ERROR';
export const USER_NOTIFICATIONS_START_LOADING = 'USER_NOTIFICATIONS_START_LOADING';
export const USER_FOLLOW_NOTIFICATIONS_START_LOADING = 'USER_FOLLOW_NOTIFICATIONS_START_LOADING';
export const USER_NOTIFICATIONS_FINISHED_LOADING = 'USER_NOTIFICATIONS_FINISHED_LOADING';
export const USER_FOLLOW_NOTIFICATIONS_FINISHED_LOADING = 'USER_FOLLOW_NOTIFICATIONS_FINISHED_LOADING';
export const USER_NOTIFICATIONS_FETCHED = 'USER_NOTIFICATIONS_FETCHED';
export const USER_NOTIFICATIONS_FOLLOWERS_FETCHED = 'USER_NOTIFICATIONS_FOLLOWERS_FETCHED';
export const USER_NOTIFICATIONS_SETTINGS_START_LOADING = 'USER_NOTIFICATIONS_SETTINGS_START_LOADING';
export const USER_NOTIFICATIONS_SETTINGS_FINISHED_LOADING = 'USER_NOTIFICATIONS_SETTINGS_FINISHED_LOADING';
export const USER_NOTIFICATIONS_SETTINGS_FETCHED = 'USER_NOTIFICATIONS_SETTINGS_FETCHED';
export const USER_NOTIFICATIONS_SETTINGS_PATCHED = 'USER_NOTIFICATIONS_SETTINGS_PATCHED';
export const USER_FOLLOWERS_FETCHED = 'USER_FOLLOWERS_FETCHED';
export const USER_FOLLOWINGS_FETCHED = 'USER_FOLLOWINGS_FETCHED';
export const USER_FOLLOWERS_PARTIAL_START_LOADING = 'USER_FOLLOWERS_PARTIAL_START_LOADING';
export const USER_FOLLOWINGS_PARTIAL_START_LOADING = 'USER_FOLLOWINGS_PARTIAL_START_LOADING';
export const USER_FOLLOW_PARTIAL_FINISH_LOADING = 'USER_FOLLOW_PARTIAL_FINISH_LOADING';
export const USER_FOLLOWERS_PARTIAL_FETCHED = 'USER_FOLLOWERS_PARTIAL_FETCHED';
export const USER_FOLLOWINGS_PARTIAL_FETCHED = 'USER_FOLLOWINGS_PARTIAL_FETCHED';
export const USER_REPORT_STARTED = 'USER_REPORT_STARTED';
export const USER_REPORT_SUCCESS = 'USER_REPORT_SUCCESS';
export const USER_REPORT_ERROR = 'USER_REPORT_ERROR';
export const USER_HIDE_NOTIFICATION = 'USER_HIDE_NOTIFICATION';
export const USER_FOLDER_PAGINATION_LOADING = 'USER_FOLDER_PAGINATION_LOADING';
export const USER_FOLDER_SONGS_PAGINATION_LOADING = 'USER_FOLDER_SONGS_PAGINATION_LOADING';

export const usersFetched = createAction(USERS_FETCHED, (data) => data);
export const userByIdFetched = createAction(USER_BY_ID_FETCHED, (data) => data);
export const userStartLoading = createAction(USER_START_LOADING);
export const userFinishLoading = createAction(USER_FINISH_LOADING);
export const userSongsStartLoading = createAction(USER_SONGS_START_LOADING);
export const userSongsFinishLoading = createAction(USER_SONGS_FINISH_LOADING);
export const userSaveSuccess = createAction(USER_SAVE_SUCCESS);
export const userSaveError = createAction(USER_SAVE_ERROR);
export const userStopFollowSuccess = createAction(USER_STOP_FOLLOW_SUCCESS, data => data);
export const userFollowSuccess = createAction(USER_FOLLOW_SUCCESS, data => data);
export const userFollowError = createAction(USER_FOLLOW_ERROR);
export const userSongsFetched = createAction(USER_SONGS_FETCHED, (data) => data);
export const userSongsByFolderFetched = createAction(USER_SONGS_BY_FOLDER_FETCHED, (data) => data);
export const userNotificationsStartLoading = createAction(USER_NOTIFICATIONS_START_LOADING);
export const userFollowNotificationsStartLoading = createAction(USER_FOLLOW_NOTIFICATIONS_START_LOADING, data => data);
export const userNotificationsFetched = createAction(USER_NOTIFICATIONS_FETCHED, (data) => data);
export const userNotificationsFollowersFetched = createAction(USER_NOTIFICATIONS_FOLLOWERS_FETCHED, (data) => data);
export const userNotificationsFinishedLoading = createAction(USER_NOTIFICATIONS_FINISHED_LOADING);
export const userFollowNotificationsFinishedLoading = createAction(USER_FOLLOW_NOTIFICATIONS_FINISHED_LOADING);
export const userNotificationsSettingsStartLoading = createAction(USER_NOTIFICATIONS_SETTINGS_START_LOADING);
export const userNotificationsSettingsFinishedLoading = createAction(USER_NOTIFICATIONS_SETTINGS_FINISHED_LOADING);
export const userFollowersFetched = createAction(USER_FOLLOWERS_FETCHED, (data) => data);
export const userFollowingsFetched = createAction(USER_FOLLOWINGS_FETCHED, (data) => data);
export const userFollowersPartialStartLoading = createAction(USER_FOLLOWERS_PARTIAL_START_LOADING);
export const userFollowingsPartialStartLoading = createAction(USER_FOLLOWINGS_PARTIAL_START_LOADING);
export const userFollowPartialFinishLoading = createAction(USER_FOLLOW_PARTIAL_FINISH_LOADING);
export const userFollowingsPartialFetched = createAction(USER_FOLLOWINGS_PARTIAL_FETCHED, (data) => data);
export const userFollowersPartialFetched = createAction(USER_FOLLOWERS_PARTIAL_FETCHED, (data) => data);
export const userReportStarted = createAction(USER_REPORT_STARTED);
export const userReportSuccess = createAction(USER_REPORT_SUCCESS, data => data);
export const userReportError = createAction(USER_REPORT_ERROR);
export const userNotificationsSettingsFetched = createAction(USER_NOTIFICATIONS_SETTINGS_FETCHED, (data) => data);
export const userNotificationsSettingsPatched = createAction(USER_NOTIFICATIONS_SETTINGS_PATCHED, (data) => data);
export const userHiddenNotification = createAction(USER_HIDE_NOTIFICATION);
export const userFolderPaginationLoading = createAction(USER_FOLDER_PAGINATION_LOADING);
export const userFolderSongsPaginationLoading = createAction(USER_FOLDER_SONGS_PAGINATION_LOADING, data => data);


export const _fetchFollowersFollowing = (promise, action, actionStartLoading) => {
  return (dispatch) => {
    dispatch(actionStartLoading());
    return promise.then((response) => {
      dispatch(action(response));
      dispatch(userFollowPartialFinishLoading());
    }).catch(e => {
      dispatch(userFollowPartialFinishLoading());
    });
  };
};

export const _appendSongsData = ({folder, data, pagination}, songs) => {
  if(songs != null) {
    songs = {...songs};
    let folderRes = songs.data.find(f => f.id === folder.id);
    folderRes.loading = false;
    folderRes.songs = {...folder.songs, data: Object.assign([], folderRes.songs.data)};
    folderRes.songs.data = folder.songs.data.concat(data);
    folderRes.songs.pagination = pagination;
    return songs;
  }

  return {data, pagination}
};


export const _appendFoldersData = ({data, pagination}, folders) => {

  if(pagination.current_page === 1){
    return {data, pagination, loading: false};
  }

  folders.data =  folders.data.concat(data);
  folders.pagination = pagination;
  return {...folders, loading: false};
};
