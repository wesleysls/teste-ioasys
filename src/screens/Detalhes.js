import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Image, KeyboardAvoidingView, TouchableHighlight, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

export class Detalhes extends Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
           <View style={styles.container}>
              <Text>Detalhes</Text>
           </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
});

const mapStateToProps = (state) => {
    return {
        
    };
}



const DetalhesConnect = connect(mapStateToProps, {})(Detalhes);
export default DetalhesConnect;