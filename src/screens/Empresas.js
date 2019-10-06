import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList,Modal, TextInput, Image, TouchableHighlight, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import EmpresaItem from '../components/feed/FeedItem';
import { getFeed, getFilteredIdFeed } from '../actions/FeedActions';
import {logout } from '../actions/AuthActions';



export class Empresas extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            isVisible:false
        };
        this.props.getFeed();
        this.filtro = this.filtro.bind(this);
        this.sair = this.sair.bind(this);
		this.abrirModal = this.abrirModal.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
    }

    filtro(id) {
        if (id != '') {
            this.props.getFilteredIdFeed(id);
        }else{
            this.props.getFeed();
        }
    }
    abrirModal() {
		let s = this.state;
		s.isVisible = true;
		this.setState(s);
    }

    fecharModal() {
		let s = this.state;
		s.isVisible = false;
		this.setState(s);
    }
    
    sair() {
		this.fecharModal();
		this.props.logout();
        //window.globalNavigator.navigate('Login');
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' })
            ]
        }));

	}


    render() {
        return (
            <View style={styles.container}>
                <Modal transparent={true} visible={this.state.isVisible} onRequestClose={this.closeModal}>
					<View style={styles.ModalTela}>
						<View style={styles.ModalArea}>
							<View style={{ marginBottom: 40 }}>
								<Text style={{ fontSize: 18 }}>Sair do aplicativo?</Text>
							</View>
							<View style={styles.botoes}>
								<TouchableHighlight onPress={this.fecharModal}>
									<View style={styles.ModalButton}>
										<Text style={{ color: 'white' }}>Cancelar</Text>
									</View>
								</TouchableHighlight>
								<TouchableHighlight onPress={this.sair}>
									<View style={styles.ModalButton}>
										<Text style={{ color: 'white' }}>Confirmar</Text>
									</View>
								</TouchableHighlight>
							</View>
						</View>
					</View>
				</Modal>
                <StatusBar backgroundColor='#2921bf' />
                <View style={styles.header}>
                    <View style={{ flexDirection: "row", paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/search.png')} style={{ width: 26, height: 26, marginRight: 10, marginLeft: 10 }} />
                        <TextInput style={styles.imput} placeholder="Nome ou tipo da empresa..." placeholderTextColor="#FFF" onChangeText={this.filtro} />
                        <TouchableHighlight style={{marginLeft:10}} onPress={this.abrirModal}>
                            <Image style={{width:26,height:26}} source={require('../assets/sair.png')}/> 
                        </TouchableHighlight>
                    </View>

                </View>
                <FlatList
                    data={this.props.empresas.enterprises}
                    renderItem={({ item }) => <EmpresaItem data={item} nave={this.props.navigation}/>}
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
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: 'blue',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    imput: {
        flex: 1,
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.20)',
        borderRadius: 5,
        color: '#FFF',
        fontSize: 16,
        paddingLeft: 10,
    },
    ModalTela: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00000090',
	},
	ModalArea: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: 250,
		height: 200,
		backgroundColor: 'white',
		borderRadius: 5,
		paddingBottom: 20
	},
	ModalButton: {
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		width: 95,
		height: 30,
		borderRadius: 5,
		backgroundColor: 'blue',
	},
	ModalButton2: {
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		width: 30,
		height: 30,
		borderRadius: 5,
		backgroundColor: '#CCC',
	},
	botoes: {
		flexDirection: 'row',
		width: '100%',
		height: 40,
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 20,
		padding: 16

	}
});

const mapStateToProps = (state) => {
    return {
        empresas: state.feed.feed,
    };
}



const EmpresasConnect = connect(mapStateToProps, { getFeed, getFilteredIdFeed,logout})(Empresas);
export default EmpresasConnect;