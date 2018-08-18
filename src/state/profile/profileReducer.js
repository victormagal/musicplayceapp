import {
  FETCHED_PROFILE,
  PROFILE_START_LOADING,
  PROFILE_FINISH_LOADING,
  SAVE_PROFILE_SUCCESS,
  PROFILE_CREATE_USER_SUCCESS,
  PROFILE_CREATE_USER_ERROR,
  SAVE_PROFILE_ERROR,
  PROFILE_IMAGE_UPLOADED,
  PROFILE_FOLLOWERS_FETCHED,
  PROFILE_FOLLOWING_FETCHED,
  IMAGE_PROFILE_START_LOADING,
  IMAGE_PROFILE_FINISHED_LOADING,
  FETCHED_PROFILE_MY_SONGS,
  FETCHED_PROFILE_MY_FAVORITE_SONGS,
  PROFILE_SONG_FAVORITED_SUCCESS,
  PROFILE_SONG_UNFAVORITED_SUCCESS,
  FETCHED_PROFILE_MY_FAVORITE_SONGS_PARTIAL,
  FETCHED_PROFILE_MY_SONGS_BY_FOLDER_PARTIAL,
  FETCHED_PROFILE_MY_SONGS_WITHOUT_FOLDER
} from './profileAction';
import {
  AUTH_LOGOUT
} from '../auth/authAction';
import {
  USER_FOLLOW_SUCCESS, USER_STOP_FOLLOW_SUCCESS
} from '../user/userTypes';
import { SONG_INDICATE_SUCCESS } from '../songs/songsType';

const appendData = ({folder, data, pagination}, songs) => {
  songs = {...songs};
  let folderRes = songs.data.find(f => f.id === folder.id);
  folderRes.songs = {...folder.songs, data: Object.assign([], folderRes.songs.data)};
  folderRes.songs.data = folder.songs.data.concat(data);
  folderRes.songs.pagination = pagination;
  return songs;
};


const appendDataFollows = ({data, pagination}, result) => {
  result = {...result};
  result.data = Object.assign([], result.data);
  result.data = result.data.concat(data);
  result.pagination = pagination;
  return result;
};

const profileReducer = (state, action) => {
  state = state || {
      saveProfileError: null,
      imageUploadedSuccess: false,
      saveProfileSuccess: null,
      createUserSuccess: false,
      createUserError: false,
      loading: false,
      profile: null,
      followers: null,
      following: null,
      imageLoading: false,
      mySongs: null,
      myFavoriteSongs: null
    };

  switch (action.type) {
    case USER_FOLLOW_SUCCESS:
      if (state.following) {
        state.following.data.push(action.payload.user);
        return {
          ...state
        };
      }
      break;

    case USER_STOP_FOLLOW_SUCCESS:
      if (state.following && typeof action.payload.user !== 'undefined') {
        let data = Object.assign([], state.following.data);
        data.splice(data.indexOf(data.find(i => i.id === action.payload.user.id)), 1);
        return {
          ...state,
          following: {...state.following, data}
        };
      }
      break;

    case FETCHED_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case FETCHED_PROFILE_MY_FAVORITE_SONGS:
      return {
        ...state,
        myFavoriteSongs: action.payload
      };

    case FETCHED_PROFILE_MY_SONGS_BY_FOLDER_PARTIAL:
      return {
        ...state,
        mySongs: appendData(action.payload, state.mySongs)
      };

    case FETCHED_PROFILE_MY_FAVORITE_SONGS_PARTIAL:
      return {
        ...state,
        myFavoriteSongs: appendData(action.payload, state.myFavoriteSongs)
      };

    case FETCHED_PROFILE_MY_SONGS:
      return {
        ...state,
        mySongs: action.payload
      };

    case FETCHED_PROFILE_MY_SONGS_WITHOUT_FOLDER:
      return {
        ...state,
        mySongs: appendData(action.payload, state.mySongs)
      };

    case SONG_INDICATE_SUCCESS:
      if(state.profile){
        let profile = {...state.profile, indicationsCount: state.profile.indicationsCount + 1}
        return {
          ...state,
          profile
        };
      }
      break;

    case PROFILE_SONG_FAVORITED_SUCCESS:
      let myFavoriteSongs = {...state.myFavoriteSongs};
      let folderList = Object.assign([], myFavoriteSongs);
      
      if(myFavoriteSongs && myFavoriteSongs.data && myFavoriteSongs.data.length > 0){
        let song = action.payload.song;
        song.is_favorited = true;
        let favoritedFolder = action.payload.folder;
        if(myFavoriteSongs.data.find((obj) => {return obj.id === favoritedFolder.id})){
          let idx = myFavoriteSongs.data.map((obj) => {return obj.id}).indexOf(favoritedFolder.id);
          if(folderList.data[idx].songs.data){
            folderList.data[idx].songs.data.push(song);
          }else{
            folderList.data[idx].songs.data = [song];
          }
        }else{
          let newFavoriteFolder = favoritedFolder;
          newFavoriteFolder.song_count = 1;
          newFavoriteFolder.editable = true;
          newFavoriteFolder.songs = {data: [song], pagination: {current_page: 1, total_pages: 1}};
          folderList.data.push(newFavoriteFolder);
        }
        return {
          ...state,
          myFavoriteSongs: folderList,
        }
      } 
      break;

      case PROFILE_SONG_UNFAVORITED_SUCCESS:
      let pMyFavoriteSongs = {...state.myFavoriteSongs};
      let pFolderList = Object.assign([], pMyFavoriteSongs);
      
      if(pMyFavoriteSongs && pMyFavoriteSongs.data && pMyFavoriteSongs.data.length > 0){
        let song = action.payload;
        let folderIndex = -1;
        let songIndex = -1;
        let curFolder = pFolderList.data.filter((folder, fIndex) =>{
          if(folder.songs && folder.songs.data && folder.songs.data.length > 0 && folder.songs.data.filter((currSong, index) => {
            if(currSong.id == song){
              songIndex = index;
              folderIndex = fIndex;
            }
            return currSong.id == song;
          }).length > 0){
              return true;
            }
        });

        if(curFolder[0].songs.data.length > 1){
          curFolder[0].songs.data.splice(songIndex, 1);
        }else if (curFolder[0].songs.data.length == 1){
          pFolderList.data.splice(folderIndex, 1);
        }

        return {
          ...state,
          myFavoriteSongs: pFolderList,
        }
      } 
      break;

    case PROFILE_START_LOADING:
      return {
        ...state,
        loading: true
      };

    case IMAGE_PROFILE_START_LOADING:
      return {
        ...state,
        imageLoading: true
      };

    case IMAGE_PROFILE_FINISHED_LOADING:
      return {
        ...state,
        imageLoading: false,
        saveProfileSuccess: false
      };

    case PROFILE_IMAGE_UPLOADED:
      return {
        ...state,
        saveProfileSuccess: true
      };

    case PROFILE_FINISH_LOADING:
      return {
        ...state,
        loading: false,
        saveProfileSuccess: false
      };

    case SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        saveProfileSuccess: true,
      };

    case SAVE_PROFILE_ERROR:
      return {
        ...state,
        saveProfileError: action.payload,
        saveProfileSuccess: false,
      };

    case PROFILE_CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        createUserSuccess: true
      };

    case PROFILE_CREATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        createUserError: true
      };

    case AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        profile: null
      };

    case PROFILE_FOLLOWERS_FETCHED:
      let followers = action.payload;

      if(action.payload.pagination.current_page > 1){
        followers = appendDataFollows(action.payload, state.followers)
      }

      return {
        ...state,
        followers
      };

    case PROFILE_FOLLOWING_FETCHED:
      let following = action.payload;

      if(action.payload.pagination.current_page > 1){
        following = appendDataFollows(action.payload, state.following)
      }

      return {
        ...state,
        following
      };
  }
  return state;
};

export default profileReducer;
