import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from '../ProfileComponent';
import {fetchProfile, fetchUserSongs, logout, getFavoriteSongsWithFolders} from '../../../../state/action';


class MyProfileScreenContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchProfile()).then(response => {
      dispatch(fetchUserSongs(response.payload.id));
      dispatch(getFavoriteSongsWithFolders());
    });
  }

  componentWillReceiveProps(nextProps){
    const navigationParams = nextProps.navigation.state.params;

    if (navigationParams && navigationParams.backFromPublishedOrDraft) {
      const timer = setTimeout(() => {
        this.props.dispatch(getFavoriteSongsWithFolders());
        clearTimeout(timer);
      }, 500);
      nextProps.navigation.setParams({ backFromPublishedOrDraft: false });
    }

    if ((this.props.isUserSaved !== nextProps.isUserSaved && nextProps.isUserSaved) ||
      (this.props.saveProfileSuccess !== nextProps.saveProfileSuccess && nextProps.saveProfileSuccess)
    ) {
      this.props.dispatch(fetchProfile());
    }
  }

  handleFollowersEmptyClick = () => {
    this.props.navigation.navigate('inviteSettings', { profile: true });
  };

  handleSongAddClick = () => {
    this.props.navigation.navigate('RegisterSongScreen');
  };

  handleLogout = () => {
    const { dispatch, navigation } = this.props;

    dispatch(logout());
    navigation.dangerouslyGetParent().dangerouslyGetParent().replace('login');
  };

  render() {
    return (
      <ProfileComponent
        {...this.props}
        me={true}
        onSongAddClick={this.handleSongAddClick}
        onFollowersEmptyClick={this.handleFollowersEmptyClick}
        onLogoutClick={this.handleLogout}
      />
    )
  }
}

const mapStateToProps = ({ profileReducer, songsReducer, userReducer, folderReducer }) => {
  const { songCreateSuccess, songRemoveSuccess, songPublishSuccess, songUnpublishSuccess, mySongs, songDraft, song } = songsReducer;
  const { isUserSaved } = userReducer;

  return {
    ...profileReducer,
    ...folderReducer,
    isUserSaved,
    songCreateSuccess,
    songRemoveSuccess,
    songPublishSuccess,
    songUnpublishSuccess,
    mySongs,
    songDraft,
    song
  };
};

const MyProfileScreen = connect(mapStateToProps)(MyProfileScreenContainer);
export { MyProfileScreen };
