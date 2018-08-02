import { createAction } from "redux-actions";

export const USERS_FETCHED = 'USERS_FETCHED';
export const USER_SONGS_FETCHED = 'USER_SONGS_FETCHED';
export const USER_START_LOADING = 'USER_START_LOADING';
export const USER_FINISH_LOADING = 'USER_FINISH_LOADING';
export const USER_BY_ID_FETCHED = 'USER_BY_ID_FETCHED';
export const USER_SAVE_SUCCESS = 'USER_SAVE_SUCCESS';
export const USER_SAVE_ERROR = 'USER_SAVE_ERROR';
export const USER_FOLLOW_SUCCESS = 'USER_FOLLOW_SUCCESS';
export const USER_STOP_FOLLOW_SUCCESS = 'USER_STOP_FOLLOW_SUCCESS';
export const USER_FOLLOW_ERROR = 'USER_FOLLOW_ERROR';
export const USER_NOTIFICATIONS_START_LOADING = 'USER_NOTIFICATIONS_START_LOADING';
export const USER_NOTIFICATIONS_FINISHED_LOADING = 'USER_NOTIFICATIONS_FINISHED_LOADING';
export const USER_NOTIFICATIONS_FETCHED = 'USER_NOTIFICATIONS_FETCHED';
export const USER_NOTIFICATIONS_FOLLOWERS_FETCHED = 'USER_NOTIFICATIONS_FOLLOWERS_FETCHED';

export const usersFetched = createAction(USERS_FETCHED, (data) => data);
export const userByIdFetched = createAction(USER_BY_ID_FETCHED, (data) => data);
export const userStartLoading = createAction(USER_START_LOADING);
export const userFinishLoading = createAction(USER_FINISH_LOADING);
export const userSaveSuccess = createAction(USER_SAVE_SUCCESS);
export const userSaveError = createAction(USER_SAVE_ERROR);
export const userStopFollowSuccess = createAction(USER_STOP_FOLLOW_SUCCESS);
export const userFollowSuccess = createAction(USER_FOLLOW_SUCCESS);
export const userFollowError = createAction(USER_FOLLOW_ERROR);
export const userSongsFetched = createAction(USER_SONGS_FETCHED, (data) => data);
export const userNotificationsStartLoading = createAction(USER_NOTIFICATIONS_START_LOADING);
export const userNotificationsFetched = createAction(USER_NOTIFICATIONS_FETCHED, (data) => data);
export const userNotificationsFollowersFetched = createAction(USER_NOTIFICATIONS_FOLLOWERS_FETCHED, (data) => data);
export const userNotificationsFinishedLoading = createAction(USER_NOTIFICATIONS_FINISHED_LOADING);
