import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {MPFilledStarIcon, MPStarIcon} from '../../assets/svg';

class MPShowRatingComponent extends Component {

  renderStars(){
    let {rating} = this.props;
    let stars = new Array(5);
    stars.fill();

    return (
      <View style={styles.ratingContainer}>

        {stars.map((_, index) => {
          if(index <= rating){
            return  <MPFilledStarIcon style={styles.ratingItem}/>;
          }

          return <MPStarIcon style={styles.ratingItem}/>;
        })}

      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderStars()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ratingContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
    flexDirection: 'row',
  },
  ratingItem: {
    marginEnd: 3,
  }
});

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const MPShowRating = connect(mapStateToProps)(MPShowRatingComponent);
export {MPShowRating};

