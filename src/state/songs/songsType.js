import { createAction } from "redux-actions";

export const SONG_START_LOADING = 'SONG_START_LOADING';
export const SONG_FINISH_LOADING = 'SONG_FINISH_LOADING';
export const SONG_REGISTER_DATA = 'SONG_REGISTER_DATA';
export const SONG_REGISTER_CLEAR = 'SONG_REGISTER_CLEAR';
export const SONG_DRAFT_SUCCESS = 'SONG_DRAFT_SUCCESS';
export const SONG_DRAFT_ERROR = 'SONG_DRAFT_ERROR';
export const SONG_REMOVE_SUCCESS = 'SONG_REMOVE_SUCCESS';
export const SONG_REMOVE_ERROR = 'SONG_REMOVE_ERROR';
export const SONG_PUBLISH_SUCCESS = 'SONG_PUBLISH_SUCCESS';
export const SONG_PUBLISH_ERROR = 'SONG_PUBLISH_ERROR';
export const SONG_UNPUBLISH_SUCCESS = 'SONG_UNPUBLISH_SUCCESS';
export const SONG_UNPUBLISH_ERROR = 'SONG_UNPUBLISH_ERROR';
export const FETCHED_ARTIST_SONGS = 'FETCHED_ARTIST_SONGS';
export const FETCHED_SONG = 'FETCHED_SONG';
export const FETCHED_SONG_LYRICS = 'FETCHED_SONG_LYRICS';
export const SONG_INDICATE_SUCCESS = 'SONG_INDICATE_SUCCESS';
export const SONG_INDICATE_ERROR = 'SONG_INDICATE_ERROR';
export const SONG_FAVORITE_SUCCESS = 'SONG_FAVORITE_SUCCESS';
export const SONG_FAVORITE_ERROR = 'SONG_FAVORITE_ERROR';
export const SONG_UNFAVORITE_SUCCESS = 'SONG_UNFAVORITE_SUCCESS';
export const SONG_UNFAVORITE_ERROR = 'SONG_UNFAVORITE_ERROR';
export const SONG_NOTIFICATION_REMOVE = 'SONG_NOTIFICATION_REMOVE';

export const SONG_UPLOADED_PICTURE_SUCCESS = 'SONG_UPLOADED_PICTURE_SUCCESS';
export const SONG_UPLOADED_PICTURE_ERROR = 'SONG_UPLOADED_PICTURE_ERROR';
export const SONG_LIKE_COMMENT_SUCCESS = 'SONG_LIKE_COMMENT_SUCCESS';
export const SONG_LIKE_COMMENT_ERROR = 'SONG_LIKE_COMMENT_ERROR';
export const SONG_COMMENT_START_LOADING = 'SONG_COMMENT_START_LOADING';
export const SONG_COMMENT_SUCCESS = 'SONG_COMMENT_SUCCESS';
export const SONG_COMMENT_ERROR = 'SONG_COMMENT_ERROR';


export const updateSongRegisterData = createAction(SONG_REGISTER_DATA, data => ({ ...data }));
export const songRegisterClear = createAction(SONG_REGISTER_CLEAR);
export const songStartLoading = createAction(SONG_START_LOADING);
export const songFinishLoading = createAction(SONG_FINISH_LOADING);
export const songDraftSuccess = createAction(SONG_DRAFT_SUCCESS);
export const songDraftError = createAction(SONG_DRAFT_ERROR);
export const songRemoveSuccess = createAction(SONG_REMOVE_SUCCESS, id => id);
export const songRemoveError = createAction(SONG_REMOVE_ERROR);
export const songPublishSuccess = createAction(SONG_PUBLISH_SUCCESS, data => data);
export const songPublishError = createAction(SONG_PUBLISH_ERROR);
export const songUnpublishSuccess = createAction(SONG_UNPUBLISH_SUCCESS);
export const songUnpublishError = createAction(SONG_UNPUBLISH_ERROR);
export const fetchedUserSongs = createAction(FETCHED_ARTIST_SONGS, data => data);
export const fetchedSong = createAction(FETCHED_SONG, data => data);
export const fetchedSongLyrics = createAction(FETCHED_SONG_LYRICS, data => data);
export const songFavoriteSuccess = createAction(SONG_FAVORITE_SUCCESS, data => data);
export const songFavoriteError = createAction(SONG_FAVORITE_ERROR);
export const songUnfavoriteError = createAction(SONG_UNFAVORITE_ERROR);
export const songUnfavoriteSuccess = createAction(SONG_UNFAVORITE_SUCCESS);
export const songIndicateSuccess = createAction(SONG_INDICATE_SUCCESS);
export const songNotificationRemove = createAction(SONG_NOTIFICATION_REMOVE);
export const songIndicateError = createAction(SONG_INDICATE_ERROR);
export const uploadedSongPictureSucess = createAction(SONG_UPLOADED_PICTURE_SUCCESS);
export const uploadedSongPictureError = createAction(SONG_UPLOADED_PICTURE_ERROR);
export const likedCommentSuccess = createAction(SONG_LIKE_COMMENT_SUCCESS);
export const likedCommentError = createAction(SONG_LIKE_COMMENT_ERROR);
export const commentStartLoading = createAction(SONG_COMMENT_START_LOADING);
export const commentSongError = createAction(SONG_COMMENT_ERROR);
export const commentSongSuccess = createAction(SONG_COMMENT_SUCCESS);




