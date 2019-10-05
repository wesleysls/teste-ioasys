import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableHighlight } from 'react-native';

export default class FeedItem extends Component {
    constructor(props) {
        super(props);

        let rawDate = this.props.data.date_posted.split(' ');
        let date = rawDate[0].split('-');
        date = date[2] + '/' + date[1] + '/' + date[0];

        let time = rawDate[1].split(':');
        time = time[0] + ':' + time[1];


        this.state = {
            dateFormatted: date + ' ' + time,
            screenWidth: Dimensions.get('window').width,
            photoClickCount: 0,
        };
        this.userClick = this.userClick.bind(this);
        this.photoClick = this.photoClick.bind(this);
        this.directLikeClick = this.directLikeClick.bind(this);
        this.toggleCommentArea = this.toggleCommentArea.bind(this);
        this.commentUserClick = this.commentUserClick.bind(this);
    }

    userClick() {
        this.props.nave.navigate('Profile', {
            name: this.props.data.name,
            id: this.props.data.id_user
        });
        //alert('clicou no usuario'+this.props.data.id_user);
    }
    commentUserClick(id, name) {
        this.props.nave.navigate('Profile', {
            name: name,
            id: id
        });
    }
    photoClick() {
        let state = this.state;
        state.photoClickCount++
        this.setState(state);

        if (state.photoClickCount == 2) {
            this.directLikeClick();
        }
        setTimeout(() => {
            let state = this.state;
            state.photoClickCount = 0;
            this.setState(state);
        }, 500);
    }
    directLikeClick() {
        this.props.likeAction(this.props.data.id, this.props.data.is_liked);
    }
    toggleCommentArea() {
        alert('clicou no comentario')
    }
    render() {

        let likeImage;

        if (this.props.data.is_liked)
            likeImage = require('../../assets/like_on.png')
        else
            likeImage = require('../../assets/like_off.png')

        return (
            <View style={styles.feedContainer}>
                <View style={styles.feedHeader}>
                    <View style={styles.avatar}>
                        <TouchableHighlight underlayColor={null} onPress={this.userClick}>
                            <Image source={{ uri: this.props.data.avatar }} style={styles.avatarImg} />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.userName}>
                        <TouchableHighlight underlayColor={null} onPress={this.userClick}>
                            <Text>{this.props.data.name}</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.dateArea}>
                        <Image source={require('../../assets/clock.png')} style={styles.clockIcon} />
                        <Text style={styles.postDate}>{this.state.dateFormatted}</Text>
                    </View>
                </View>
                <View style={styles.feedBody}>
                    <TouchableHighlight activeOpacity={1} underlayColor={null} onPress={this.photoClick}>
                        <Image resizeMode='cover' source={{ uri: this.props.data.url }} style={{ width: this.state.screenWidth, height: this.state.screenWidth }} />
                    </TouchableHighlight>
                </View>
                <View style={styles.feedFooter}>
                    <TouchableHighlight underlayColor={null} onPress={this.directLikeClick}>
                        <View style={styles.likeArea}>
                            <Image source={likeImage} style={styles.footerIcon} />
                            <Text style={styles.likeText}>{this.props.data.like_count}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={null} onPress={this.toggleCommentArea}>
                        <View style={styles.commentArea}>
                            <Image source={require('../../assets/comments.png')} style={styles.footerIcon} />
                            <Text style={styles.likeText}>{this.props.data.comments.length}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                {this.props.data.comments.length > 0 &&
                    <View style={styles.commentContainer}>
                        {this.props.data.comments.map((citem) => {
                            return (
                                <View style={styles.commentItem}>
                                    <TouchableHighlight underlayColor={null} onPress={() => { this.commentUserClick(citem.id_user, citem.name) }} style={styles.commentItemUser}>
                                        <Text>{citem.name}:</Text>
                                    </TouchableHighlight>
                                    <Text>{citem.txt}</Text>
                                </View>
                            );
                        })}
                    </View>
                }
                <View style={styles.feedLineEnd}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    feedContainer: {
        width: '100%',
    },
    feedHeader: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#dddddd',
        marginLeft: 10,
        marginRight: 15
    },
    avatarImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    userName: {
        width: 150,
        height: 15,
        fontSize: 14
    },
    postDate: {
        height: 20,
        marginRight: 10,
        fontSize: 14
    },
    dateArea: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    clockIcon: {
        width: 15,
        height: 15,
        marginRight: 5
    },
    feedBody: {
        flex: 1,
        backgroundColor: '#eeeeee'
    },
    feedFooter: {
        height: 60,
        flexDirection: 'row',
        justifyContent: "flex-end"
    },
    likeArea: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    commentArea: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    commentContainer: {
        padding: 10
    },
    commentItem: {
        flexDirection: 'row'
    },
    commentItemUser: {
        marginRight: 5,
    },
    feedLineEnd: {
        height: 2,
        backgroundColor: '#ccc'
    },
    likeText: {
        fontSize: 18
    },
    footerIcon: {
        width: 25,
        height: 25,
        marginRight: 10
    }
});