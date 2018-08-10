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
    this.props.dispatch(followUser(this.props.user.id))
  };

  render() {
    const { navigation } = this.props;
    console.log(this.props);
    return (
      <ProfileComponent
       {...this.props}
        navigation={navigation}
        profile={this.props.user}
        followingUser={this.props.followingUser}
        onFollowUpClick={this.handleFollowUp}
        mySongs={this.props.usersSongs}/>
    );
  }
}

const mapStateToProps = ({userReducer}) => {
  return {...userReducer};
};

const UserProfileScreen = connect(mapStateToProps)(UserProfileScreenContainer);
export {UserProfileScreen};
