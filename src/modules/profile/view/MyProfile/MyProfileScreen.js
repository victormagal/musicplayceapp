import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from '../ProfileComponent';
import {fetchProfile, logout, getFavoriteSongsWithFolders} from '../../../../state/action';
import {songRegisterClear} from '../../../../state/songs/songsType';


class MyProfileScreenContainer extends React.Component {

  timerSuccess = null;

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchProfile()).then(_ => {
      dispatch(getFavoriteSongsWithFolders());
    });
  }

  componentWillReceiveProps(nextProps) {
    const navigationParams = nextProps.navigation.state.params;

    if (navigationParams && navigationParams.backFromPublishedOrDraft) {
      const timer = setTimeout(() => {
        this.props.dispatch(getFavoriteSongsWithFolders());
        clearTimeout(timer);
      }, 500);
      nextProps.navigation.setParams({backFromPublishedOrDraft: false});
    }

    if(nextProps.songDraftSuccess) {
      this.timerSuccess = setTimeout(() => {
        this.props.dispatch(fetchProfile());
        clearTimeout(this.timerSuccess);
      }, 3000);
    }

    if ((this.props.isUserSaved !== nextProps.isUserSaved && nextProps.isUserSaved) ||
      (this.props.saveProfileSuccess !== nextProps.saveProfileSuccess && nextProps.saveProfileSuccess)
    ) {
      this.props.dispatch(fetchProfile());
    }
  }

  componentWillUnmount(){
    if(this.timerSuccess){
      clearTimeout(this.timerSuccess);
    }
  }

  handleFollowersEmptyClick = () => {
    this.props.navigation.navigate('inviteSettings', {profile: true});
  };

  handleSongAddClick = () => {
    if (this.props.song.id) {
      this.props.dispatch(songRegisterClear());
    }
    this.props.navigation.navigate('RegisterSongScreen');
  };

  handleLogout = () => {
    const {dispatch, navigation} = this.props;

    dispatch(logout());
    navigation.dangerouslyGetParent().dangerouslyGetParent().replace('login');
  };

  handleFollowerFollowingClick = (user) => {
    this.props.navigation.navigate('UserProfileScreen', {userId: user.id});
  };

  render() {
    return (
      <ProfileComponent
        {...this.props}
        me={true}
        userFollowers={this.props.followers}
        userFollowings={this.props.following}
        onSongAddClick={this.handleSongAddClick}
        onFollowersEmptyClick={this.handleFollowersEmptyClick}
        onFollowerFollowingClick={this.handleFollowerFollowingClick}
        onLogoutClick={this.handleLogout}
      />
    )
  }
}

const mapStateToProps = ({profileReducer, songsReducer, userReducer, folderReducer}) => {
  const {
    songCreateSuccess, songRemoveSuccess, songPublishSuccess, songUnpublishSuccess,
    songDraftSuccess, mySongs, songDraft, song
  } = songsReducer;
  const {isUserSaved} = userReducer;

  return {
    ...profileReducer,
    ...folderReducer,
    isUserSaved,
    songCreateSuccess,
    songRemoveSuccess,
    songPublishSuccess,
    songUnpublishSuccess,
    songDraftSuccess,
    mySongs,
    songDraft,
    song
  };
};

const MyProfileScreen = connect(mapStateToProps)(MyProfileScreenContainer);
export {MyProfileScreen};
