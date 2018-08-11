import {SongService} from '../../service';
import {
  fetchedUserSongs,
  fetchedSong,
  fetchedSongLyrics,
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
  uploadedSongPictureSucess,
  uploadedSongPictureError,
  likedCommentSuccess,
  likedCommentError,
  songUnfavoriteSuccess,
  songUnfavoriteError
} from "./songsType";

export const createPermanentSong = (song, songFile, imageFile) => {
  return (dispatch, getState) => {
    const {profile} = getState().profileReducer;
    song.user_id = profile.id;

    dispatch(songStartLoading());
    return SongService.createAndPublishSong(song, songFile, imageFile).then(() => {
      dispatch(songPublishSuccess());
    }).catch(e => {
      dispatch(songPublishError());
      console.log('createPermanentSongError', e);
      console.log(e.response);
    });
  };
}

export const createDraftSong = (song) => {
  return (dispatch, getState) => {
    const {profile} = getState().profileReducer;
    song.artist_id = profile.id;

    dispatch(songStartLoading());
    return SongService.create(song).then(() => {
      dispatch(songDraftSuccess());
    }).catch(e => {
      dispatch(songDraftError());
      console.log('createDraftSongError', e.response);
    });
  };
}

export const updatePermanentSong = (song, songFile, imageFile) => {
  return (dispatch) => {
    dispatch(songStartLoading());

    return SongService.republishSong(song, songFile, imageFile).then(() => {
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
    return SongService.update(song).then(() => {
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
      dispatch(songRemoveSuccess());
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

export const getSongLyrics = (song) => {
  return (dispatch) => {
    dispatch(songStartLoading);

    return SongService.getSongLyrics(song).then(response => {
      dispatch(fetchedSongLyrics(response));
    }).catch(e => {
      console.log('getSongLyricsError', e.response);
      dispatch(songFinishLoading());
    })
  }
}

export const fetchUserSongs = (userId) => {
  return (dispatch) => {
    dispatch(songStartLoading());
    return SongService.songsByUser(userId).then(response => {
      dispatch(fetchedUserSongs(response));
    }).catch(e => {
      console.log(e);
      dispatch(songFinishLoading(e.response));
    });
  };
};

export const uploadSongPicture = (songId, file) => {
  return (dispatch) => {
    dispatch(songStartLoading());

    return SongService.uploadImage(songId, file).then(response => {
      console.log('uploadSongPictureSuccess', response);
      dispatch(uploadedSongPictureSucess());
    }).catch(e => {
      console.log('uploadSongPictureError', e);
      dispatch(uploadedSongPictureError());
    });
  };
};
