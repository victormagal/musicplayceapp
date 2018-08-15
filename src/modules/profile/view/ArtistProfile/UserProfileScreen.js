import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from '../ProfileComponent';
import {getUserById, followUser, getUserFollowers, getUserFollowings} from "../../../../state/action";


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
    this.setState({ loadingProfile: true });
    this.props.dispatch(getUserById(user.id));
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
        onStopLoading={() => this.setState({ loadingProfile: false })}
      />
    );
  }
}

const mapStateToProps = ({userReducer}) => {
  return {...userReducer};
};

const UserProfileScreen = connect(mapStateToProps)(UserProfileScreenContainer);
export {UserProfileScreen};
