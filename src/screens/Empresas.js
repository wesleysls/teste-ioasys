import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TextInput, Image, KeyboardAvoidingView, TouchableHighlight, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import { enterprises } from '../dados.json'
import EmpresaItem from '../components/feed/FeedItem';
import {getFeed} from '../actions/FeedActions';



export class Empresas extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Empresas'
    });

    constructor(props) {
        super(props);
        this.state = {
        };
        this.props.getFeed();
    }



    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='blue' />
                <FlatList
                    data={this.props.empresas.enterprises}
                    renderItem={({ item }) => <EmpresaItem data={item} onPress={this.verEmpresa} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = (state) => {
    return {
      empresas:state.feed.feed
    };
}



const EmpresasConnect = connect(mapStateToProps, {getFeed})(Empresas);
export default EmpresasConnect;