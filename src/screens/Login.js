import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Image, KeyboardAvoidingView, TouchableHighlight, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import { changeEmail, changePassword, userLogin } from '../actions/AuthActions';

export class Login extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.verifyStatus = this.verifyStatus.bind(this);
        this.loginAction = this.loginAction.bind(this);
    }

   

    componentDidUpdate() {
        this.verifyStatus();
    }

    verifyStatus() {
        if (this.props.status === 1) {
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home' })
                ]
            }));
        }
    }

    loginAction() {
        
        this.props.userLogin(
            this.props.email,
            this.props.password
        )
        
    }

    render() {
        let buttonOpacity = 0.2;
        if (this.props.passwordValid && this.props.emailValid) {
            buttonOpacity = 1;
        }
        return (
            <ImageBackground source={require('../assets/bg.jpg')} style={styles.container}>
                <StatusBar backgroundColor='#0A5360' />
                <Image style={styles.header}source={require('../assets/logo_ioasys.png')}/>
                <TextInput style={styles.imput} value={this.props.email} placeholder="Digite seu email" placeholderTextColor="#FFF" keyboardType="email-address" onChangeText={this.props.changeEmail} />
                <TextInput style={styles.imput} value={this.props.password} secureTextEntry={true} placeholder="Digite sua senha" placeholderTextColor="#FFF" onChangeText={this.props.changePassword} />
                <TouchableHighlight onPress={this.loginAction} style={styles.actionButton} underlayColor="#307EAF">
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableHighlight>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        width:200,
        height:60,
        marginBottom: 30
    },
    imput: {
        width: '90%',
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 5,
        color: '#FFF',
        fontSize: 14,
        paddingLeft: 10,
        marginBottom: 10
    },
    actionButton: {
        width: "90%",
        height: 50,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 15
    },
    cadastroButton: {
        width: "90%",
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    cadastroButtonText: {
        color: '#FFF',
        fontSize: 13
    }
});

const mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        status: state.auth.status,
        password: state.auth.password,
    };
}



const LoginConnect = connect(mapStateToProps, { changeEmail, changePassword, userLogin })(Login);
export default LoginConnect;