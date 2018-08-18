import {SongService, UserService} from '../../service';
import {
  userStartLoading,
  userFinishLoading,
  usersFetched,
  userSaveSuccess,
  userSaveError,
  userByIdFetched,
  userSongsFetched,
  userStopFollowSuccess,
  userFollowSuccess,
  userFollowError,
  userNotificationsStartLoading,
  userNotificationsFinishedLoading,
  userNotificationsFetched,
  userNotificationsFollowersFetched,
  userNotificationsSettingsStartLoading,
  userNotificationsSettingsFinishedLoading,
  userNotificationsSettingsFetched,
  userNotificationsSettingsPatched,
  userFollowersFetched,
  userFollowingsFetched,
  userReportStarted,
  userReportSuccess,
  userReportError,
  userFollowNotificationsStartLoading,
  userFollowNotificationsFinishedLoading,
  userSongsByFolderFetched,
  userFollowingsPartialFetched,
  userFollowersPartialFetched,
  userFollowersPartialStartLoading,
  userFollowingsPartialStartLoading,
  _fetchFollowersFollowing
} from './userTypes';


export const searchUsers = (name) => {
  return (dispatch) => {
    dispatch(userStartLoading());

    return UserService.fetchUsers(name).then(response => {
      dispatch(usersFetched(response));
    }).catch(e => {
      console.log('searchUsersError', e);
      dispatch(userFinishLoading());
    });
  };
};

export const updateUser = (user) => {
  return (dispatch) => {
    dispatch(userStartLoading());

    return UserService.updateUser(user).then(() => {
      dispatch(userSaveSuccess());
      dispatch(userFinishLoading());
    }).catch(e => {
      console.log('updateUserError', e.response);
      dispatch(userSaveError());
    });
  };
};

export const getUserById = (id) => {
  return (dispatch) => {
    dispatch(userStartLoading());

    return UserService.getUserById(id).then(userResponse => {
      return UserService.getUserFollowers(id).then(userFollowers => {
        dispatch(userFollowersFetched(userFollowers));
        return UserService.getUserFollowings(id).then(userFollowings => {
          dispatch(userFollowingsFetched(userFollowings));
          return userResponse;
        });
      }).then(userResponse => {
        dispatch(userByIdFetched(userResponse));
        dispatch(userSongs(id));
      });
    }).catch(e => {
      console.log('getUserByIdError', e);
      dispatch(userFinishLoading());
    });
  };
};

export const userSongs = (id, page = 1) => {
  return (dispatch) => {
    return SongService.mySongs(id, page).then(response => {
      dispatch(userSongsFetched(response));
    }).catch(e => {
      console.log('userSongsError', e.response);
    });
  };
};

export const userSongsByFolder= (id, folder, page = 1) => {
  return (dispatch) => {
    if(folder.id === -1) {
      return SongService.userSongsWithoutFolder(id, page).then(response => {
        dispatch(userSongsByFolderFetched({folder, ...response}));
      });
    }

    return SongService.songsByFolder(folder.id, page).then(response => {
      dispatch(userSongsByFolderFetched({folder, ...response}));
    });
  };
};


export const followUser = (user, from) => {
  return (dispatch) => {
    dispatch(userStartLoading());

    return UserService.followUser(user.id).then(_ => {
      dispatch(userFollowSuccess({user, from}));
    }).catch(e => {
      dispatch(userFollowError());
    });
  };
};

export const stopFollowUser = (user, from) => {
  return (dispatch) => {
    dispatch(userStartLoading());

    return UserService.stopFollowUser(user.id).then(() => {
      dispatch(userStopFollowSuccess({user, from}));
    }).catch(e => {
      console.log('stopFollowUserError', e);
      dispatch(userFollowError());
    });
  };
};

export const getFollowNotifications = (page = 1,reset = false) => {
  return (dispatch) => {
        
    page = reset ? 1 : page;
    if(reset) dispatch(userFollowNotificationsStartLoading());
    if(!reset) dispatch(userStartLoading());

    return UserService.getFollowNotifications(page).then(response => {
      dispatch(userNotificationsFollowersFetched({...response, reset}));
    }).catch(e => {
      console.log('getFollowNotificationsError', e.response);
      dispatch(userFollowNotificationsFinishedLoading());
    });
  };
};

export const getNotifications = (page = 1, reset = false) => {
  return (dispatch) => {
    
    page = reset ? 1 : page;
    if(reset) dispatch(userNotificationsStartLoading());
    if(!reset) dispatch(userStartLoading());
    
    return UserService.getNotifications(page).then(response => {
      dispatch(userNotificationsFetched({...response, reset}));
    }).catch(e => {
      console.log('getNotificationsError', e.response);
      dispatch(userNotificationsFinishedLoading());
    });
  };
};

export const getNotificationsSettings = () => {
  return (dispatch) => {
    dispatch(userNotificationsSettingsStartLoading());

    return UserService.getNotificationSettings().then(response => {
      dispatch(userNotificationsSettingsFetched(response));
      dispatch(userNotificationsSettingsFinishedLoading());
    }).catch(e => {
      console.log('getNotificationsSettingsError', e);
      dispatch(userNotificationsSettingsFinishedLoading());
    });
  };
};

export const patchNotificationSettings = (settings) => {
  return (dispatch, getState) => {
    dispatch(userNotificationsSettingsStartLoading());

    const {notificationSettings} = getState().userReducer;
    const newSettings = {...notificationSettings, ...settings};

    return UserService.patchNotificationSettings(newSettings).then(response => {
      dispatch(userNotificationsSettingsPatched(response));
      dispatch(userNotificationsSettingsFinishedLoading());
    }).catch(e => {
      console.log('getNotificationsSettingsError', e.response);
      dispatch(userNotificationsSettingsFinishedLoading());
    });
  };
};

export const userFollowings = (id, page = 1) => {
  return _fetchFollowersFollowing(
    UserService.getUserFollowings(id, page),
    userFollowingsPartialFetched,
    userFollowingsPartialStartLoading
  );
};

export const userFollowers = (id, page = 1) => {
  return _fetchFollowersFollowing(
    UserService.getUserFollowers(id, page),
    userFollowersPartialFetched,
    userFollowersPartialStartLoading
  );
};

export const reportProfile = (report) => {
  return (dispatch) => {
    dispatch(userReportStarted());

    return UserService.reportProfile(report).then(_ => {
      dispatch(userReportSuccess());
    }).catch(e => {
      console.log(e);
      dispatch(userReportError());
    })
  };
};
