import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from '../ProfileComponent';
import {getUserById, followUser, getUserFollowers, getUserFollowings} from "../../../../state/action";


class UserProfileScreenContainer extends React.Component {
  componentDidMount() {
    const { navigation, dispatch } = this.props;
    const navigationParams = navigation.state.params;
    dispatch(getUserById(navigationParams.userId))
  }

  handleFollowUp = () => {
    this.props.dispatch(followUser(this.props.user));
  };

  handleFollowerFollowingClick = (user) => {
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
        mySongs={this.props.usersSongs}/>
    );
  }
}

const mapStateToProps = ({userReducer}) => {
  return {...userReducer};
};

const UserProfileScreen = connect(mapStateToProps)(UserProfileScreenContainer);
export {UserProfileScreen};
