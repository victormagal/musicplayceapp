import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from './ProfileComponent';
import {fetchProfile, fetchUserSongs, logout} from '../../../state/action';
import {songRegisterClear} from "../../../state/songs/songsType";

class ProfileScreenContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchProfile()).then(response => {
      dispatch(fetchUserSongs(response.payload.id));
    });
  }

  componentWillReceiveProps(nextProps){
    const navigationParams = nextProps.navigation.state.params;

    if (navigationParams && navigationParams.backFromPublishedOrDraft) {
      const timer = setTimeout(() => {
        this.props.dispatch(fetchUserSongs(this.props.profile.id));
        clearTimeout(timer);
      }, 500);
      nextProps.navigation.setParams({ backFromPublishedOrDraft: false });
    }

    if (this.props.isUserSaved !== nextProps.isUserSaved && nextProps.isUserSaved) {
      this.props.dispatch(fetchProfile());
    }
  }

  handleFollowersEmptyClick = () => {
    this.props.navigation.navigate('inviteSettings', { profile: true });
  };

  handleSongAddClick = () => {
    this.props.dispatch(songRegisterClear());
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

const mapStateToProps = ({ profileReducer, songsReducer, userReducer }) => {
  const { songCreateSuccess, songRemoveSuccess, songPublishSuccess, songUnpublishSuccess, mySongs } = songsReducer;
  const { isUserSaved } = userReducer;

  return {
    ...profileReducer,
    isUserSaved,
    songCreateSuccess,
    songRemoveSuccess,
    songPublishSuccess,
    songUnpublishSuccess,
    mySongs
  };
};

const ProfileScreen = connect(mapStateToProps)(ProfileScreenContainer);
export { ProfileScreen };
