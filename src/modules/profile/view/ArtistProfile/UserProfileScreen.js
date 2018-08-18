import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from '../ProfileComponent';
import {
  getUserById, followUser, userSongsByFolder, userFollowers, userFollowings
} from "../../../../state/action";


class UserProfileScreenContainer extends React.Component {
  state = {
    loadingProfile: true
  };

  componentDidMount() {
    const { navigation, dispatch } = this.props;
    const navigationParams = navigation.state.params;
    this.setState({ loadingProfile: true });
    dispatch(getUserById(navigationParams.userId));
  }

  handleFollowUp = () => {
    this.props.dispatch(followUser(this.props.user));
  };

  handleFollowerFollowingClick = (user) => {

    if(user.id === this.props.loggedUser.id){
      this.props.navigation.navigate('MyProfileScreen');
    }else {
      this.setState({loadingProfile: true});
      this.props.dispatch(getUserById(user.id));
    }
  };

  handleSongPagination = (folder) => {
    let {current_page, total_pages} = folder.songs.pagination;

    if(current_page < total_pages){
      this.props.dispatch(userSongsByFolder(this.props.user.id, folder, current_page + 1));
    }
  };

  handleFollowerPagination = () => {
    let {current_page, total_pages} = this.props.followers.pagination;

    if(current_page < total_pages) {
      this.props.dispatch(userFollowers(this.props.user.id, current_page + 1));
    }
  };

  handleFollowingPagination = () => {
    let {current_page, total_pages} = this.props.following.pagination;

    if(current_page < total_pages) {
      this.props.dispatch(userFollowings(this.props.user.id, current_page + 1));
    }
  };

  render() {
    const { user } = this.props;
    return (
      <ProfileComponent
       {...this.props}
        profile={this.props.user}
        followingUser={user ? user.isFollowing : false}
        onFollowUpClick={this.handleFollowUp}
        onFollowerFollowingClick={this.handleFollowerFollowingClick}
        mySongs={this.props.usersSongs}
        loadingProfile={this.state.loadingProfile}
        onSongPagination={this.handleSongPagination}
        onStopLoading={() => this.setState({ loadingProfile: false })}
        onFollowersPagination={this.handleFollowerPagination}
        onFollowingsPagination={this.handleFollowingPagination}
      />
    );
  }
}

const mapStateToProps = ({userReducer, authReducer}) => {
  return {...userReducer, loggedUser: authReducer.loggedUser};
};

const UserProfileScreen = connect(mapStateToProps)(UserProfileScreenContainer);
export {UserProfileScreen};
