import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from '../ProfileComponent';
import {
  fetchProfile, logout, fechyMySongsByFolder, fechyMyFavoriteSongsByFolder,
  fetchMyFollowers, fetchMyFollowings
} from '../../../../state/action';
import {songRegisterClear} from '../../../../state/songs/songsType';


class MyProfileScreenContainer extends React.Component {
  timerSuccess = null;

  state = {
    loadingProfile: true
  };

  componentDidMount() {
    const {dispatch} = this.props;
    this.setState({loadingProfile: true});
    dispatch(fetchProfile());
  }

  componentWillReceiveProps(nextProps) {
    const navigationParams = nextProps.navigation.state.params;

    if (navigationParams && navigationParams.backFromPublishedOrDraft) {
      const timer = setTimeout(() => {
        //this.props.dispatch(getFavoriteSongs());
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

  handleSongFavoritePagination = (folder) => {
    let {current_page, total_pages} = folder.songs.pagination;

    if(current_page < total_pages){
      this.props.dispatch(fechyMyFavoriteSongsByFolder(folder, current_page + 1));
    }
  };

  handleSongPagination = (folder) => {
    let {current_page, total_pages} = folder.songs.pagination;

    if(current_page < total_pages){
      this.props.dispatch(fechyMySongsByFolder(folder, current_page + 1));
    }
  };

  handleFollowerPagination = () => {
    let {current_page, total_pages} = this.props.followers.pagination;

    if(current_page < total_pages) {
      this.props.dispatch(fetchMyFollowers(this.props.profile.id, current_page + 1));
    }
  };

  handleFollowingPagination = () => {
    let {current_page, total_pages} = this.props.following.pagination;

    if(current_page < total_pages) {
      this.props.dispatch(fetchMyFollowings(this.props.profile.id, current_page + 1));
    }
  };

  render() {
    return (
      <ProfileComponent
        {...this.props}
        me={true}
        songsLoading={this.props.profileSongsLoading}
        favoritesFolder={this.props.myFavoriteSongs && this.props.myFavoriteSongs.data}
        userFollowers={this.props.followers}
        userFollowings={this.props.following}
        onSongAddClick={this.handleSongAddClick}
        onFollowersEmptyClick={this.handleFollowersEmptyClick}
        onFollowerFollowingClick={this.handleFollowerFollowingClick}
        onLogoutClick={this.handleLogout}
        loadingProfile={this.state.loadingProfile}
        onStopLoading={() => this.setState({ loadingProfile: false })}
        onFavoriteSongPagination={this.handleSongFavoritePagination}
        onSongPagination={this.handleSongPagination}
        onFollowersPagination={this.handleFollowerPagination}
        onFollowingsPagination={this.handleFollowingPagination}
      />
    )
  }
}

const mapStateToProps = ({profileReducer, songsReducer, userReducer, folderReducer}) => {
  const {
    songCreateSuccess, songRemoveSuccess, songPublishSuccess, songUnpublishSuccess,
    songDraftSuccess, songDraft, song
  } = songsReducer;
  const {isUserSaved, userFollowingLoading, userFollowersLoading} = userReducer;

  return {
    ...profileReducer,
    ...folderReducer,
    isUserSaved,
    userFollowingLoading,
    userFollowersLoading,
    songCreateSuccess,
    songRemoveSuccess,
    songPublishSuccess,
    songUnpublishSuccess,
    songDraftSuccess,
    songDraft,
    song
  };
};

const MyProfileScreen = connect(mapStateToProps)(MyProfileScreenContainer);
export {MyProfileScreen};
