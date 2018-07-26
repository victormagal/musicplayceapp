import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from './ProfileComponent';
import {getArtistById, artistFollow} from "../../../state/action";


class ArtistProfileScreenContainer extends React.Component {

  componentDidMount() {
    const { navigation, dispatch } = this.props;
    const navigationParams = navigation.state.params;
    dispatch(getArtistById(navigationParams.artistId));
  }

  handleFollowUp = () => {
    this.props.dispatch(artistFollow(this.props.artist.id));
  };

  render() {
    const { navigation } = this.props;

    return (
      <ProfileComponent
        navigation={navigation}
        profile={this.props.artist}
        onFollowUpClick={this.handleFollowUp}
        mySongs={this.props.artistsSongs} />
    );
  }
}

const mapStateToProps = ({artistReducer}) => {
  return {...artistReducer};
};

const ArtistProfileScreen = connect(mapStateToProps)(ArtistProfileScreenContainer);
export {ArtistProfileScreen};
