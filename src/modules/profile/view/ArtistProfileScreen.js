import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from './ProfileComponent';
import {getArtistById} from "../../../state/artist/artistAction";


class ArtistProfileScreenContainer extends React.Component {

  componentDidMount() {
    const { navigation, dispatch } = this.props;
    const navigationParams = navigation.state.params;
    dispatch(getArtistById(navigationParams.artistId));
  }

  render() {
    const { navigation } = this.props;
    return (
      <ProfileComponent
        navigation={navigation}
        profile={this.props.artists.data.attributes}/>
    );
  }
}

const mapStateToProps = ({artistReducer}) => {
  return {...artistReducer};
};

const ArtistProfileScreen = connect(mapStateToProps)(ArtistProfileScreenContainer);
export {ArtistProfileScreen};
