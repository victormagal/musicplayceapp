import {
  SONG_START_LOADING,
  SONG_FINISH_LOADING,
  SONG_DRAFT_SUCCESS,
  SONG_DRAFT_ERROR,
  SONG_REMOVE_SUCCESS,
  SONG_REMOVE_ERROR,
  SONG_INDICATE_SUCCESS,
  SONG_INDICATE_ERROR,
  SONG_FAVORITE_SUCCESS,
  SONG_FAVORITE_ERROR,
  SONG_PUBLISH_SUCCESS,
  SONG_PUBLISH_ERROR,
  SONG_UNPUBLISH_SUCCESS,
  SONG_UNPUBLISH_ERROR,
  FETCHED_SONG,
  FETCHED_SONG_LYRICS,
  SONG_REGISTER_DATA,
  SONG_REGISTER_CLEAR,
  FETCHED_ARTIST_SONGS,
  SONG_UPLOADED_PICTURE_ERROR,
  SONG_UPLOADED_PICTURE_SUCCESS,
  SONG_LIKE_COMMENT_ERROR,
  SONG_LIKE_COMMENT_SUCCESS,
  SONG_UNFAVORITE_SUCCESS,
  SONG_NOTIFICATION_REMOVE,
  SONG_COMMENT_ERROR,
  SONG_COMMENT_SUCCESS,
  SONG_COMMENT_START_LOADING
} from './songsType';

const defaultSong = {
  name: '',
  lyrics: '',
  description: '',
  interpreter_name: '',
  coAuthors: null,
  folder: null,
  tags: null,
  path: '',
};

const songsReducer = (state, action) => {
  state = state || {
    loading: false,
    fetchedSong: null,
    mySongs: null,
    song: {...defaultSong}
  };

  state.songPublishSuccess = false;
  state.songDraftSuccess = false;
  state.songRemoveSuccess = false;
  state.songPublishSuccess = false;
  state.songUnpublishSuccess = false;
  state.songIndicateSuccess = false;
  state.songFavoriteSuccess = false;
  state.songUploadedPictureSuccess = false;
  state.likedCommentSuccess = false;
  state.songDraft = false;
  state.songCommentedSuccess = false;

  switch (action.type) {
    case SONG_REGISTER_DATA:
      return {
        ...state,
        song: {...action.payload},
        songDraft: true
      };

    case SONG_REGISTER_CLEAR:
      return {
        ...state,
        song: {...defaultSong},
        songDraft: false
      };

    case SONG_START_LOADING:
    case SONG_COMMENT_START_LOADING:
      return {
        ...state,
        loading: true
      };

    case SONG_UPLOADED_PICTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        songUploadedPictureSuccess: true
      };

    case SONG_DRAFT_ERROR:
    case SONG_FAVORITE_ERROR:
    case SONG_INDICATE_ERROR:
    case SONG_LIKE_COMMENT_ERROR:
    case SONG_PUBLISH_ERROR:
    case SONG_UNPUBLISH_ERROR:
    case SONG_UPLOADED_PICTURE_ERROR:
    case SONG_FINISH_LOADING:
    case SONG_NOTIFICATION_REMOVE:
    case SONG_COMMENT_ERROR:
      return {
        ...state,
        loading: false
      };

    case SONG_DRAFT_SUCCESS:
      return {
        ...state,
        songDraftSuccess: true,
        song: {...defaultSong},
        songDraft: false,
        loading: false
      };

    case SONG_REMOVE_SUCCESS:
      let songs = {...state.mySongs};
      songs.data.forEach(function(folder){
        folder.songs = folder.songs.filter(song => song.id !== action.payload);
      });

      return {
        ...state,
        loading: false,
        songRemoveSuccess: true
      };

    case SONG_REMOVE_ERROR:
      return {
        ...state,
        loading: false
      };

    case SONG_PUBLISH_SUCCESS:
      return {
        ...state,
        loading: false,
        songPublishSuccess: true,
        song: {...defaultSong},
        songDraft: false
      };
    
    case SONG_INDICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        songIndicateSuccess: true
      };
    
    case SONG_LIKE_COMMENT_SUCCESS:
    console.log(action);
      return {
        ...state,
        loading: false,
        likedCommentSuccess: true
      };

    case SONG_COMMENT_SUCCESS:
      let song = {...state.fetchedSong}
      let comment = action.payload.attributes;
      comment.id = action.payload.id;
      song.comments = Object.assign([], song.comments)
      song.comments.unshift(comment);
      return {
        ...state,
        loading: false,
        fetchedSong: song,
        songCommentedSuccess: true,
      }

    case SONG_FAVORITE_SUCCESS:
      let fetchedSong = {...state.fetchedSong};
      fetchedSong.is_favorited = true;
      fetchedSong.folder = action.payload.name;

      return {
        ...state,
        loading: false,
        songFavoriteSuccess: true,
        fetchedSong
      };

    case SONG_UNFAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
        songUnfavoriteSuccess: true,
        fetchedSong: {...state.fetchedSong, is_favorited: false}
      };

    case SONG_UNPUBLISH_SUCCESS:
      return {
        ...state,
        loading: false,
        songUnpublishSuccess: true
      };

    case FETCHED_ARTIST_SONGS:
      return {
        ...state,
        mySongs: action.payload,
        loading: false
      };

    case FETCHED_SONG:
      return {
        ...state,
        fetchedSong: action.payload,
        loading: false
      };

    case FETCHED_SONG_LYRICS:
      return {
        ...state,
        songLyrics: action.payload,
        loading: false
      };
  }

  return state;
};

export default songsReducer;
