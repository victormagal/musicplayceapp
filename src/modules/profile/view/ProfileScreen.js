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
    if(props.profile && !props.mySongs){
      this.props.dispatch(fetchArtistSongs(props.profile.id));
    }
  }

  handleFollowersEmptyClick = () => {
    this.props.navigation.navigate('inviteSettings', {profile: true});
  };

  handleSongAddClick = () => {
    this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().navigate('RegisterSongScreen');
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
  return {...profileReducer, mySongs: songsReducer.mySongs};
};

const ProfileScreen = connect(mapStateToProps)(ProfileScreenContainer);
export {ProfileScreen};
