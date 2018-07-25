import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from './ProfileComponent';
import {fetchProfile, fetchArtistSongs, logout} from '../../../state/action';


class ProfileScreenContainer extends React.Component {

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch(fetchProfile());
    this.setup(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.setup(nextProps);
  }

  setup(props){
    if((props.profile && !props.mySongs)){
      this.props.dispatch(fetchArtistSongs(props.profile.id));
    }

    if(props.songCreateSuccess || props.songRemoveSuccess ||
       props.songPublishSuccess || props.songUnpublishSuccess){
      let timer = setTimeout(() => {
        this.props.dispatch(fetchArtistSongs(props.profile.id));
        clearTimeout(timer);
      }, 1000);
    }
  }

  handleFollowersEmptyClick = () => {
    this.props.navigation.navigate('inviteSettings', {profile: true});
  };

  handleSongAddClick = () => {
    this.props.navigation.navigate('RegisterSongScreen');
  };

  handleLogout = () => {
    this.props.dispatch(logout());
    this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().replace('login');
  };

  render() {
    return (
      <ProfileComponent {...this.props}
                        me={true}
                        onSongAddClick={this.handleSongAddClick}
                        onFollowersEmptyClick={this.handleFollowersEmptyClick}
                        onLogoutClick={this.handleLogout}/>
    )
  }
}

const mapStateToProps = ({profileReducer, songsReducer}) => {
  let {songCreateSuccess, songRemoveSuccess, songPublishSuccess, songUnpublishSuccess, mySongs} = songsReducer;

  return {
    ...profileReducer, songCreateSuccess, songRemoveSuccess,
    songPublishSuccess, songUnpublishSuccess, mySongs
  };
};

const ProfileScreen = connect(mapStateToProps)(ProfileScreenContainer);
export {ProfileScreen};
