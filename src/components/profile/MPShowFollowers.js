import React, {Component} from 'react';
import {StyleSheet, View, FlatList, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import { MPArtist, MPText } from '../../components'
import images from '../../assets/img';

class MPShowFollowersComponent extends Component{
    state = {
        tabIndex: 0,
    };

    changeTabIndex = (index) => {
        this.setState({tabIndex: index});
    };

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
            <View>
                {
                    this.state.tabIndex == 0 ? (
                        <View>
                            <View style={ styles.secondTabTitlesContainer }>
                            <TouchableHighlight underlayColor="transparent" onPress={ this.changeTabIndex.bind(this, 0)} style={ [styles.secondSelectedTitleContainer, {marginEnd: 20}] }>
                                <MPText style={ styles.selectedTitleText }>SEGUINDO</MPText>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="transparent" onPress={ this.changeTabIndex.bind(this, 1)} style={ styles.secondNotSeletecTitleContainer }>
                                <MPText style={ styles.notSeletecTitleText}>SEGUIDORES</MPText>
                            </TouchableHighlight>
                            </View>
                            <View style={styles.sliderContainer}>
                                <FlatList
                                data={followerObj.following}
                                keyExtractor={(item) => item.id}
                                renderItem={this.renderArtists}
                                horizontal={true}
                                />
                            </View>
                        </View>
                      ) : (
                        <View>
                            <View style={ styles.secondTabTitlesContainer }>
                            <TouchableHighlight underlayColor="transparent" onPress={this.changeTabIndex.bind(this, 0)} style={ [styles.secondNotSeletecTitleContainer, {marginEnd: 20}] }>
                                <MPText style={ styles.notSeletecTitleText }>SEGUINDO</MPText>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="transparent" onPress={this.changeTabIndex.bind(this, 1)} style={ styles.secondSelectedTitleContainer }>
                                <MPText style={ styles.selectedTitleText}>SEGUIDORES</MPText>
                            </TouchableHighlight>
                            </View>
                            <View style={styles.sliderContainer}>
                                <FlatList
                                data={followerObj.followers}
                                keyExtractor={(item) => item.id}
                                renderItem={this.renderArtists}
                                horizontal={true}
                                />
                            </View>
                        </View>
                      )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    secondTabTitlesContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FCFCFC',
        paddingTop: 30,
        paddingBottom: 10,
    },
    secondSelectedTitleContainer: {
        alignSelf: 'center',
        paddingVertical: 5,
        borderBottomWidth: 3,
        borderColor: '#e13223',
    },
    secondNotSeletecTitleContainer: {
        alignSelf: 'center',
        paddingVertical: 5,
    },
    sliderContainer:{
        height: 200,
        paddingTop: 20,
        backgroundColor: '#FCFCFC',
    },
    notSeletecTitleText: {
      flex: 1,
      color: '#626262',
      fontSize: 12,
      textAlign: 'center',
      alignSelf: 'center',
      fontFamily: 'Montserrat-Regular'
    },
    selectedTitleText: {
      color: '#000',
      fontSize: 12,
      textAlign: 'center',
      alignSelf: 'center',
      fontFamily: 'Montserrat-Bold',
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPShowFollowers = connect(mapStateToProps)(MPShowFollowersComponent);
export { MPShowFollowers };

