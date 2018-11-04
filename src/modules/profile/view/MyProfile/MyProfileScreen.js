import React from 'react';
import { Alert, Share } from 'react-native';
import {connect} from 'react-redux';
import {ProfileComponent} from '../ProfileComponent';
import {
  fetchProfile, logout, fechyMySongsByFolder, fechyMyFavoriteSongsByFolder,
  fetchMyFollowers, fetchMyFollowings, fetchMyFavoriteSongs
} from '../../../../state/action';
import {songRegisterClear} from '../../../../state/songs/songsType';
import {fetchMySongs} from "../../../../state/profile/profileAction";


class MyProfileScreenContainer extends React.Component {
  state = {
    loadingProfile: true
  };

  componentDidMount() {
    const {dispatch} = this.props;
    this.setState({loadingProfile: true});
    dispatch(fetchProfile());
  }

  componentWillReceiveProps(nextProps) {
    const { profile } = this.props;
    const navigationParams = nextProps.navigation.state.params;

    if (navigationParams && navigationParams.backFromPublishedOrDraft) {
      this.props.dispatch(fetchMySongs(profile.id));
      nextProps.navigation.setParams({backFromPublishedOrDraft: false});
    }

    if ((this.props.isUserSaved !== nextProps.isUserSaved && nextProps.isUserSaved) ||
      (this.props.saveProfileSuccess !== nextProps.saveProfileSuccess && nextProps.saveProfileSuccess)
    ) {
      this.props.dispatch(fetchProfile());
    }
  }

  handleFollowersEmptyClick = () => {
    const link =  'https://www.musicplayce.com.br/';

    Share.share({
      title: 'MusicPlayce',
      message: `Gostaria de te convidar a participar do MusicPlayce ${link}`,
      dialogTitle: 'Convidar amigos',
    });
    // this.props.navigation.navigate('inviteSettings', {profile: true});
  };

  handleSongAddClick = () => {
    if (this.props.song.id) {
      this.props.dispatch(songRegisterClear());
    }
    this.props.navigation.navigate('RegisterSongScreen');
  };

  handleLogout = () => {
    Alert.alert(
      '',
      'Deseja realmente sair do MusicPlayce?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {        
            const {dispatch, navigation} = this.props;

            dispatch(logout());
            navigation.dangerouslyGetParent().dangerouslyGetParent().replace('login');
          }
        },
      ]
    );
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

    if(current_page < total_pages && !folder.loading){
      this.props.dispatch(fechyMySongsByFolder(folder, current_page + 1));
    }
  };

  handleFollowerPagination = () => {
    this._handlePagination('followers', fetchMyFollowers);
  };

  handleFollowingPagination = () => {
    this._handlePagination('following', fetchMyFollowings);
  };

  handleFolderPagination = () => {
    this._handlePagination('mySongs', fetchMySongs);
  };

  handleFavoriteFolderPagination = () => {
    this._handlePagination('myFavoriteSongs', fetchMyFavoriteSongs);
  };

  _handlePagination = (propName, fetchAction) => {
    let {current_page, total_pages} = this.props[propName].pagination;

    if(current_page < total_pages && !this.props[propName].loading){
      this.props.dispatch(fetchAction(this.props.profile.id, current_page + 1));
    }
  };

  render() {
    return (
      <ProfileComponent
        {...this.props}
        me={true}
        songsLoading={this.props.profileSongsLoading}
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
        onFolderPagination={this.handleFolderPagination}
        onFavoriteFolderPagination={this.handleFavoriteFolderPagination}
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
