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
export const SONG_UPLOADED_PICTURE_SUCCESS = 'SONG_UPLOADED_PICTURE_SUCCESS';
export const SONG_UPLOADED_PICTURE_ERROR = 'SONG_UPLOADED_PICTURE_ERROR';

export const updateSongRegisterData = createAction(SONG_REGISTER_DATA, data => ({ ...data }));
export const songRegisterClear = createAction(SONG_REGISTER_CLEAR);
export const songStartLoading = createAction(SONG_START_LOADING);
export const songFinishLoading = createAction(SONG_FINISH_LOADING);
export const songDraftSuccess = createAction(SONG_DRAFT_SUCCESS);
export const songDraftError = createAction(SONG_DRAFT_ERROR);
export const songRemoveSuccess = createAction(SONG_REMOVE_SUCCESS);
export const songRemoveError = createAction(SONG_REMOVE_ERROR);
export const songPublishSuccess = createAction(SONG_PUBLISH_SUCCESS);
export const songPublishError = createAction(SONG_PUBLISH_ERROR);
export const songUnpublishSuccess = createAction(SONG_UNPUBLISH_SUCCESS);
export const songUnpublishError = createAction(SONG_UNPUBLISH_ERROR);
export const fetchedArtistSongs = createAction(FETCHED_ARTIST_SONGS, data => data);
export const fetchedSong = createAction(FETCHED_SONG, data => data);
export const fetchedSongLyrics = createAction(FETCHED_SONG_LYRICS, data => data);
export const songFavoriteSuccess = createAction(SONG_FAVORITE_SUCCESS);
export const songFavoriteError = createAction(SONG_FAVORITE_ERROR);
export const songIndicateSuccess = createAction(SONG_INDICATE_SUCCESS);
export const songIndicateError = createAction(SONG_INDICATE_ERROR);
export const uploadedSongPictureSucess = createAction(SONG_UPLOADED_PICTURE_SUCCESS);
export const uploadedSongPictureError = createAction(SONG_UPLOADED_PICTURE_ERROR)




