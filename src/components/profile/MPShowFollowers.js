import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import { MPTabBar, MPArtist } from '../../components'
import images from '../../assets/img';

class MPShowFollowersComponent extends Component{

    renderArtists = ({item}) => (
        <MPArtist artist={item.artistName} imagePath={item.imagePath} onPress={()=>{}} isFollowing={item.isFollowing}/>
    )

    render() {
        // let { followersObj } = this.props;
        // let following = followersObj.following;
        // let followers = followersObj.followers;

        let followerObj = {
                following: [
                    {
                        id: '00',
                        artistName: 'Michel Teló',
                        imagePath: images.daftPunk100,
                        isFollowing: true,
                    },
                    {
                        id: '01',
                        artistName: 'Paula Fernandes',
                        imagePath: images.daftPunk100,
                        isFollowing: true,
                    },
                    {
                        id: '02',
                        artistName: 'Almir Sater',
                        imagePath: images.daftPunk100,
                        isFollowing: true,
                    },
                    {
                        id: '03',
                        artistName: 'Sérgio Reis',
                        imagePath: images.daftPunk100,
                        isFollowing: true,
                    },
                ],
                followers: [
                    {
                        id: '00',
                        artistName: 'Michel Teló',
                        imagePath: images.bjork100,
                        isFollowing: false,
                    },
                    {
                        id: '01',
                        artistName: 'Paula Fernandes',
                        imagePath: images.bjork100,
                        isFollowing: false,
                    },
                    {
                        id: '02',
                        artistName: 'Almir Sater',
                        imagePath: images.bjork100,
                        isFollowing: false,
                    },
                    {
                        id: '03',
                        artistName: 'Sérgio Reis',
                        imagePath: images.bjork100,
                        isFollowing: false,
                    },
                ]
            }
        
        return (
            <MPTabBar firstTabTitle={'SEGUINDO'} secondTabTitle={'SEGUIDORES'} secondLayout={true}>
                <View style={styles.sliderContainer}>
                    <FlatList
                    data={followerObj.following}
                    keyExtractor={(item) => item.id}
                    renderItem={this.renderArtists}
                    horizontal={true}
                    />
                </View>
                <View style={styles.sliderContainer}>
                    <FlatList
                    data={followerObj.followers}
                    keyExtractor={(item) => item.id}
                    renderItem={this.renderArtists}
                    horizontal={true}
                    />
                </View>
            </MPTabBar>
        )
    }
}

const styles = StyleSheet.create({
    sliderContainer:{
        flex: 1,
        backgroundColor: '#FCFCFC',
        paddingVertical: 20,
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPShowFollowers = connect(mapStateToProps)(MPShowFollowersComponent);
export { MPShowFollowers };

