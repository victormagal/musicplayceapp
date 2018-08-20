import {SongService} from '../../service';
import {
  fetchedSong,
  songDraftError,
  songDraftSuccess,
  songFavoriteError,
  songFavoriteSuccess,
  songFinishLoading,
  songIndicateError,
  songIndicateSuccess,
  songPublishError,
  songPublishSuccess,
  songRemoveError,
  songRemoveSuccess,
  songStartLoading,
  songUnpublishError,
  songUnpublishSuccess,
  likedCommentSuccess,
  likedCommentError,
  songUnfavoriteSuccess,
  songUnfavoriteError,
  commentSongError,
  commentSongSuccess,
  commentStartLoading
} from "./songsType";
import { profileSongFavoritedSuccess, profileSongUnfavoriteSuccess } from '../profile/profileAction';
import { dispatchAndScheduleRemoveNotifications  } from '../general/generalAction';


export const createPermanentSong = (song) => {
  return (dispatch, getState) => {
    const {profile} = getState().profileReducer;
    song.artist_id = profile.id;

    dispatch(songStartLoading());
    return SongService.createSong(song, true).then(() => {
      dispatchAndScheduleRemoveNotifications(dispatch, songPublishSuccess);
    }).catch(e => {
      dispatch(songPublishError());
      console.log('createPermanentSongError', e);
    });
  };
};

export const createDraftSong = (song) => {
  return (dispatch, getState) => {
    const {profile} = getState().profileReducer;
    song.artist_id = profile.id;

    dispatch(songStartLoading());
    return SongService.createSong(song).then(() => {
      dispatchAndScheduleRemoveNotifications(dispatch, songDraftSuccess);
    }).catch(e => {
      dispatchAndScheduleRemoveNotifications(dispatch, songDraftError);
      console.log('createDraftSongError', e.response);
    });
  };
}

export const updatePermanentSong = (song) => {
  return (dispatch) => {
    dispatch(songStartLoading());

    return SongService.updateSong(song, true).then(() => {
      dispatchAndScheduleRemoveNotifications(dispatch, songPublishSuccess);
    }).catch(e => {
      console.log('updatePermanentSongError', e);
      dispatchAndScheduleRemoveNotifications(dispatch, songPublishError);
    });
  };
};

export const updateDraftSong = (song) => {
  return (dispatch) => {
    dispatch(songStartLoading());
    return SongService.updateSong(song).then(() => {
      dispatchAndScheduleRemoveNotifications(dispatch, songDraftSuccess);
    }).catch(e => {
      dispatchAndScheduleRemoveNotifications(dispatch, songDraftError);
      console.log('updateDraftSong', e.response);
    });
  };
}

export const removeSong = (id) => {
  return (dispatch) => {
    dispatch(songStartLoading());

    return SongService.delete(id).then(() => {
      dispatch(songRemoveSuccess(id));
    }).catch((e) => {
      console.log('removeSongError', e);
      dispatch(songRemoveError())
    });
  };
};

export const unpublishSong = (id) => {
  return (dispatch) => {
    dispatch(songStartLoading());

    return SongService.unpublish(id).then(_ => {
      dispatch(songUnpublishSuccess());
    }).catch((e) => {
      console.log('unpublishSongError', e.response);
      dispatch(songUnpublishError())
    });
  };
};

export const indicateSong = (songId, userId) => {
  return (dispatch) => {
    dispatch(songStartLoading());
    return SongService.indicateSong(songId, userId).then(() => {
      dispatch(songIndicateSuccess());
    }).catch(e => {
      console.log('indicateSongError', e.response);
      dispatch(songIndicateError())
    });
  };
};

export const commentSong = (songId, comment) => {
  return (dispatch) => {
    dispatch(commentStartLoading());
    return SongService.commentSong(songId, comment).then((response) => {
      dispatch(commentSongSuccess(response.data));
    }).catch(e => {
      console.log('commentSongError', e);
      dispatch(commentSongError())
    });
  };
};

export const likeSongComment = (commentId) => {
  return (dispatch) => {
    dispatch(songStartLoading());
    return SongService.likeComment(commentId).then((response) => {
      dispatch(likedCommentSuccess(response.data));
    }).catch(e => {
      dispatch(likedCommentError())
    });
  };
};

export const favoriteSong = (song, folder) => {
  return (dispatch) => {
    dispatch(songStartLoading());
    return SongService.favoriteSong(song.id, folder.id).then(() => {
      dispatchAndScheduleRemoveNotifications(dispatch, songFavoriteSuccess, folder);

      setTimeout(() => {
        dispatch(profileSongFavoritedSuccess({song, folder}));
      }, 2000)
    }).catch(e => {
      console.log('favoriteSongError', e);
      dispatch(songFavoriteError())
    });
  };
};

export const unFavoriteSong = (songId) => {
  return (dispatch) => {
    dispatch(songStartLoading());
    return SongService.unfavoriteSong(songId).then(() => {
      dispatchAndScheduleRemoveNotifications(dispatch, songUnfavoriteSuccess);

      setTimeout(()=> {
        dispatch(profileSongUnfavoriteSuccess(songId));
      }, 2000)
    }).catch(e => {
      dispatch(songUnfavoriteError())
    });
  };
};

export const rateSong = (song, rating) => {
  return (dispatch) => {
    return SongService.rateSong(song, rating);
  };
};

export const fetchOneSong = (song) => {
  return (dispatch) => {
    dispatch(songStartLoading);

    return SongService.getSong(song).then(response => {
      dispatch(fetchedSong(response));
      return response;
    }).catch(e => {
      console.log('fetchOneSongError', e);
      dispatch(songFinishLoading());
    });
  };
};


// export const userSongs = (id, page = 1) => {
//   return (dispatch) => {
//     return SongService.mySongs(id, page, false).then(i => {
//       console.log("MY SONGS WITH FOLDER", i);
//       //TODO: dispatch()
//     });
//   };
// };
