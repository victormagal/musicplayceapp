import { SongService, UserService } from '../../service';
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
  userFollowingsFetched
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

    return UserService.getUserById(id).then(response => {
      dispatch(userByIdFetched(response));
      dispatch(userSongs(id));
      dispatch(userFinishLoading());
    }).catch(e => {
      console.log('getUserByIdError', e.response);
      dispatch(userFinishLoading());
    });
  };
};

export const userSongs = (id) => {
  return (dispatch) => {
    return SongService.songsByUser(id).then(response => {
      dispatch(userSongsFetched(response));
    }).catch(e => {
      console.log('userSongsError', e.response);
    });
  };
};

export const followUser = (id) => {
  return (dispatch) => {
    dispatch(userStartLoading());

    return UserService.followUser(id).then(_ => {
      dispatch(userFollowSuccess());
    }).catch(e => {
      console.log('userFollowError', e.response);
      dispatch(userFollowError());
    });
  };
};

export const stopFollowUser = (id) => {
  return (dispatch) => {
    dispatch(userStartLoading());

    return UserService.stopFollowUser(id).then(() => {
      dispatch(userStopFollowSuccess());
    }).catch(e => {
      console.log('stopFollowUserError', e.response);
      dispatch(userFollowError());
    });
  };
};

export const getNotifications = () => {
  return (dispatch) => {
    dispatch(userNotificationsStartLoading());

    return UserService.getNotifications().then(response => {
      dispatch(userNotificationsFetched(response));
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
    }).catch(e => {
      console.log('getNotificationsSettingsError', e.response);
      dispatch(userNotificationsSettingsFinishedLoading());
    });
  };
};

export const patchNotificationSettings = (settings) => {
  return (dispatch) => {
    dispatch(userNotificationsSettingsStartLoading());

    return UserService.patchNotificationSettings(settings).then(response => {
      dispatch(userNotificationsSettingsPatched(response));
    }).catch(e => {
      console.log('getNotificationsSettingsError', e.response);
      dispatch(userNotificationsSettingsFinishedLoading());
    });
  };
};

export const getFollowNotifications = () => {
  return (dispatch) => {
    dispatch(userNotificationsStartLoading());

    return UserService.getFollowNotifications().then(response => {
      dispatch(userNotificationsFollowersFetched(response));
    }).catch(e => {
      console.log('getFollowNotificationsError', e.response);
      dispatch(userNotificationsFinishedLoading());
    });
  };
};

export const getUserFollowers = (user) => {
  return (dispatch) => {
    dispatch(userStartLoading());

    return UserService.getUserFollowers(user).then(response => {
      dispatch(userFollowersFetched(response));
    }).catch(e => {
      console.log(e.response);
      dispatch(userFinishLoading());
    })
  };
};

export const getUserFollowings = (user) => {
  return (dispatch) => {
    dispatch(userStartLoading());

    return UserService.getUserFollowings(user).then(response => {
      dispatch(userFollowingsFetched(response));
    }).catch(e => {
      console.log(e.response);
      dispatch(userFinishLoading());
    })
  };
};
