import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Image, KeyboardAvoidingView, TouchableHighlight, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

export class Empresas extends Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
           <View style={styles.container}>
              <Text>Empresas</Text>
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



const EmpresasConnect = connect(mapStateToProps, {})(Empresas);
export default EmpresasConnect;