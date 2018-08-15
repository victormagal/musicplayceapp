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

export const createPermanentSong = (song) => {
  return (dispatch, getState) => {
    const {profile} = getState().profileReducer;
    song.artist_id = profile.id;

    dispatch(songStartLoading());
    return SongService.createSong(song, true).then(() => {
      dispatch(songPublishSuccess());
    }).catch(e => {
      dispatch(songPublishError());
      console.log('createPermanentSongError', e);
      console.log(e.response);
    });
  };
};

export const createDraftSong = (song) => {
  return (dispatch, getState) => {
    const {profile} = getState().profileReducer;
    song.artist_id = profile.id;

    dispatch(songStartLoading());
    return SongService.createSong(song).then(() => {
      dispatch(songDraftSuccess());
    }).catch(e => {
      dispatch(songDraftError());
      console.log('createDraftSongError', e.response);
    });
  };
}

export const updatePermanentSong = (song) => {
  return (dispatch) => {
    dispatch(songStartLoading());

    return SongService.updateSong(song, true).then(() => {
      dispatch(songPublishSuccess());
    }).catch(e => {
      console.log('updatePermanentSongError', e);
      dispatch(songPublishError())
    });
  };
};

export const updateDraftSong = (song) => {
  return (dispatch) => {
    dispatch(songStartLoading());
    return SongService.updateSong(song).then(() => {
      dispatch(songDraftSuccess());
    }).catch(e => {
      dispatch(songDraftError());
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
      console.log('removeSongError', e.response);
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
      dispatch(likedCommentSuccess());
    }).catch(e => {
      dispatch(likedCommentError())
    });
  };
};

export const favoriteSong = (songId, folder) => {
  return (dispatch) => {
    dispatch(songStartLoading());
    return SongService.favoriteSong(songId, folder.id).then(() => {
      dispatch(songFavoriteSuccess(folder));
    }).catch(e => {
      console.log('favoriteSongError', e.response);
      dispatch(songFavoriteError())
    });
  };
};

export const unFavoriteSong = (songId) => {
  return (dispatch) => {
    dispatch(songStartLoading());
    return SongService.unfavoriteSong(songId).then(() => {
      dispatch(songUnfavoriteSuccess());
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
