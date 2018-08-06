import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from '../ProfileComponent';
import {getUserById, userFollow} from "../../../../state/action";


class UserProfileScreenContainer extends React.Component {

  componentDidMount() {
    const { navigation, dispatch } = this.props;
    const navigationParams = navigation.state.params;
    dispatch(getUserById(navigationParams.userId));
  }

  handleFollowUp = () => {
    this.props.dispatch(userFollow(this.props.user.id));
  };

  render() {
    const { navigation } = this.props;

    return (
      <ProfileComponent
        navigation={navigation}
        profile={this.props.user}
        onFollowUpClick={this.handleFollowUp}
        mySongs={this.props.usersSongs} />
    );
  }
}

const mapStateToProps = ({userReducer}) => {
  return {...userReducer};
};

const UserProfileScreen = connect(mapStateToProps)(UserProfileScreenContainer);
export {UserProfileScreen};
