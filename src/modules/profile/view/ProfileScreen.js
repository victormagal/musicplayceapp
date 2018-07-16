import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from './ProfileComponent';
import {fetchProfile} from '../../../state/action';

class ProfileScreenContainer extends React.Component {

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch(fetchProfile());
  }

  handleFollowersEmptyClick = () => {
    this.props.navigation.navigate('inviteSettings', {profile: true});
  };

  handleSongAddClick = () => {
    this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().navigate('UploadMediaEmptyScreen');
  };

  render() {
    return (
      <ProfileComponent {...this.props} me={true}
                        onSongAddClick={this.handleSongAddClick}
                        onFollowersEmptyClick={this.handleFollowersEmptyClick}/>
    )
  }
}

const mapStateToProps = ({profileReducer}) => {
  return {...profileReducer};
};

const ProfileScreen = connect(mapStateToProps)(ProfileScreenContainer);
export {ProfileScreen};
