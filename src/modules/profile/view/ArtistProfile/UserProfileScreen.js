import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from '../ProfileComponent';
import {getUserById, followUser} from "../../../../state/action";


class UserProfileScreenContainer extends React.Component {
  componentDidMount() {
    const { navigation, dispatch } = this.props;
    const navigationParams = navigation.state.params;
    dispatch(getUserById(navigationParams.userId)).then(_ => {
      dispatch(getUserFollowers(this.props.user.id)).then(_ => {
        dispatch(getUserFollowings(this.props.user.id));
      });
    });
  }

  handleFollowUp = () => {
    this.props.dispatch(followUser(this.props.user.id))
  };

  render() {
    console.log(this.props);
    const { navigation } = this.props;
    return (
      <ProfileComponent
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
