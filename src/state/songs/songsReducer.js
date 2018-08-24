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
  SONG_REGISTER_DATA,
  SONG_REGISTER_CLEAR,
  FETCHED_ARTIST_SONGS,
  SONG_LIKE_COMMENT_ERROR,
  SONG_LIKE_COMMENT_SUCCESS,
  SONG_UNFAVORITE_SUCCESS,
  SONG_NOTIFICATION_REMOVE,
  SONG_COMMENT_ERROR,
  SONG_COMMENT_SUCCESS,
  SONG_COMMENT_START_LOADING
} from './songsType';
import {REMOVE_NOTIFICATION} from '../general/generalAction';

const defaultSong = {
  name: '',
  lyrics: '',
  description: '',
  interpreter_name: null,
  indicationCount: null,
  coAuthors: null,
  folder: null,
  tags: null,
  path: '',
};

const defaultStateCallback = {
  songPublishSuccess: false,
  songDraftSuccess: false,
  songDraftError: false,
  songRemoveSuccess: false,
  songUnpublishSuccess: false,
  songIndicateSuccess: false,
  songFavoriteSuccess: false,
  songUploadedPictureSuccess: false,
  likedCommentSuccess: false,
  songCommentedSuccess: false
};

const songsReducer = (state, action) => {
  state = state || {
    loading: false,
    fetchedSong: null,
    mySongs: null,
    song: {...defaultSong},
    songDraft: false,
    ...defaultStateCallback
  };

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

    case SONG_DRAFT_ERROR:
      return {
        ...state,
        loading: false,
        songDraftError: true
      };

    case SONG_FAVORITE_ERROR:
    case SONG_INDICATE_ERROR:
    case SONG_LIKE_COMMENT_ERROR:
    case SONG_PUBLISH_ERROR:
    case SONG_UNPUBLISH_ERROR:
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
        fetchedSong: action.payload,
        song: {...defaultSong},
        songDraft: false
      };
    
    case SONG_INDICATE_SUCCESS:
      let indicatedSong = {...state.fetchedSong};
      indicatedSong.indications_count = indicatedSong.indications_count + 1;
      return {
        ...state,
        loading: false,
        songIndicateSuccess: true,
        fetchedSong: indicatedSong,
        indicationCount: action.payload,
      };
    
    case SONG_LIKE_COMMENT_SUCCESS:
      let playerSong = {...state.fetchedSong}
      let playerComment = action.payload.attributes;
      playerComment.id = action.payload.id;
      playerSong.comments = Object.assign([], playerSong.comments);
      playerSong.comments = playerSong.comments.map((element) => {
          return element.id == playerComment.id ? playerComment : element;
      });
      return {
        ...state,
        loading: false,
        likedCommentSuccess: true,
        fetchedSong: playerSong,
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
      };

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

    case REMOVE_NOTIFICATION:
      return {
        ...state,
        ...defaultStateCallback
      }
  }

  return state;
};

export default songsReducer;
