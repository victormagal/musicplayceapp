import React, {Component} from 'react';
import {StyleSheet, View } from 'react-native';
import {connect} from 'react-redux';
import { MPFilledStartIcon,MPStarIcon } from '../../assets/svg';

class MPShowRatingComponent extends Component{

    render() {
        let { rating } = this.props;
        
        return (
            <View>
            {
                rating == null && (
                    <View style={styles.ratingContainer}>
                        <MPStarIcon style={styles.ratingItem} />
                        <MPStarIcon style={styles.ratingItem} />
                        <MPStarIcon style={styles.ratingItem} />
                        <MPStarIcon style={styles.ratingItem} />
                        <MPStarIcon style={styles.ratingItem} />
                    </View>
                )
            }
            {
                rating == 1 && (
                    <View style={styles.ratingContainer}>
                        <MPFilledStartIcon style={styles.ratingItem} />
                        <MPStarIcon style={styles.ratingItem} />
                        <MPStarIcon style={styles.ratingItem} />
                        <MPStarIcon style={styles.ratingItem} />
                        <MPStarIcon style={styles.ratingItem} />
                    </View>
                )
            }
            {
                rating == 2 && (
                    <View style={styles.ratingContainer}>
                        <MPFilledStartIcon style={styles.ratingItem} />
                        <MPFilledStartIcon style={styles.ratingItem} />
                        <MPStarIcon style={styles.ratingItem} />
                        <MPStarIcon style={styles.ratingItem} />
                        <MPStarIcon style={styles.ratingItem} />
                    </View>
                )
            }
            {
                rating == 3 && (
                    <View style={styles.ratingContainer}>
                        <MPFilledStartIcon style={styles.ratingItem} />
                        <MPFilledStartIcon style={styles.ratingItem} />
                        <MPFilledStartIcon style={styles.ratingItem} />
                        <MPStarIcon style={styles.ratingItem} />
                        <MPStarIcon style={styles.ratingItem} />
                    </View>
                )
            }
            {
                rating == 4 && (
                    <View style={styles.ratingContainer}>
                        <MPFilledStartIcon style={styles.ratingItem} />
                        <MPFilledStartIcon style={styles.ratingItem} />
                        <MPFilledStartIcon style={styles.ratingItem} />
                        <MPFilledStartIcon style={styles.ratingItem} />
                        <MPStarIcon style={styles.ratingItem} />
                    </View>
                )
            }
            {
                rating == 5 && (
                    <View style={styles.ratingContainer}>
                        <MPFilledStartIcon style={styles.ratingItem} /> 
                        <MPFilledStartIcon style={styles.ratingItem} />
                        <MPFilledStartIcon style={styles.ratingItem} />
                        <MPFilledStartIcon style={styles.ratingItem} />
                        <MPFilledStartIcon style={styles.ratingItem} />
                    </View>
                )
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ratingContainer: {
        marginHorizontal : 10,
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
export { MPShowRating };

