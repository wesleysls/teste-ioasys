import React, { Component } from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import { connect } from 'react-redux';
import { getEmpresa } from '../actions/FeedActions';

export class Detalhes extends Component {

    static navigationOptions = {
        title: 'Empresa',
        headerStyle: {
            backgroundColor: 'blue'
        },
        headerTitleStyle: {
            color: '#ffffff',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.getParam('id'),
            enterprise_name: '',
            description: "",
            email_enterprise: "",
            facebook: "",
            twitter: "",
            linkedin: "",
            phone: "",
            own_enterprise: "",
            photo: "",
            value: "",
            shares: "",
            share_price: "",
            own_shares: "",
            city: "",
            country: "",
            id_type: "",
            enterprise_type_name: ""
        };
        this.props.getEmpresa(this.state.id, (json) => {
            let s = this.state;
            s.enterprise_name = json.enterprise["enterprise_name"];
            s.description = json.enterprise["description"];
            s.email_enterprise = json.enterprise["email_enterprise"];
            s.facebook = json.enterprise["facebook"];
            s.twitter = json.enterprise["twitter"];
            s.linkedin = json.enterprise["linkedin"];
            s.phone = json.enterprise["phone"];
            s.own_enterprise = json.enterprise["own_enterprise"];
            s.photo = json.enterprise["photo"];
            s.value = json.enterprise["value"];
            s.shares = json.enterprise["shares"];
            s.share_price = json.enterprise["share_price"];
            s.own_shares = json.enterprise["own_shares"];
            s.city = json.enterprise["city"];
            s.country = json.enterprise["country"];
            s.id_type = json.enterprise.enterprise_type["id"];
            s.enterprise_type_name = json.enterprise.enterprise_type["enterprise_type_name"];
            this.setState(s);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#4da2d8',marginBottom:5 }}>{this.state.enterprise_name}</Text>
                <Text style={{ fontSize: 16 }}>{this.state.description}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10,marginBottom:10,borderBottomWidth:1,borderColor:'#ccc'}}>
                    <View style={{ flexDirection: 'row', marginRight: 20 }}>
                        <Text style={{ fontWeight: 'bold' }}>Cidade: </Text>
                        <Text>{this.state.city}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold' }}>Estado: </Text>
                        <Text>{this.state.country}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' ,borderBottomWidth:1,borderColor:'#ccc',marginBottom:10}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold' }}>Preço da ação: </Text>
                        <Text>U${this.state.share_price}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' ,borderBottomWidth:1,borderColor:'#ccc',marginBottom:10,}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight:'bold' }}>Tipo: </Text>
                        <Text style={{ marginRight: 20 }}>{this.state.enterprise_type_name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight:'bold' }}>Id: </Text>
                        <Text style={{ marginRight: 20 }}>{this.state.id_type}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row',marginBottom:10,borderBottomWidth:1,borderColor:'#ccc'}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight:'bold' }}>Ações: </Text>
                        <Text style={{ marginRight: 20 }}>{this.state.shares}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight:'bold' }}>Valor: </Text>
                        <Text style={{ marginRight: 20 }}>{this.state.value}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row',marginBottom:10 ,borderBottomWidth:1,borderColor:'#ccc'}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight:'bold' }}>Empresa propria: </Text>
                        <Text style={{ marginRight: 20 }}>{this.state.own_enterprise}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight:'bold' }}>ações propias: </Text>
                        <Text style={{ marginRight: 20 }}>{this.state.own_shares}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row',marginBottom:10 ,borderBottomWidth:1,borderColor:'#ccc'}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight:'bold' }}>Email: </Text>
                        <Text style={{ marginRight: 20 }}>{this.state.email_enterprise}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row',marginBottom:10 ,borderBottomWidth:1,borderColor:'#ccc'}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight:'bold' }}>Telefone: </Text>
                        <Text style={{ marginRight: 20 }}>{this.state.phone}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row',marginBottom:10 ,borderBottomWidth:1,borderColor:'#ccc'}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight:'bold' }}>linkedin: </Text>
                        <Text style={{ marginRight: 20 }}>{this.state.linkedin}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' ,marginBottom:10,borderBottomWidth:1,borderColor:'#ccc'}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight:'bold' }}>Twitter: </Text>
                        <Text style={{ marginRight: 20 }}>{this.state.twitter}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row',marginBottom:10 ,borderBottomWidth:1,borderColor:'#ccc'}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight:'bold' }}>Facebook: </Text>
                        <Text style={{ marginRight: 20 }}>{this.state.facebook}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    }
});

const mapStateToProps = (state) => {
    return {
        empresa: state.feed.empresa,
    };
}



const DetalhesConnect = connect(mapStateToProps, { getEmpresa })(Detalhes);
export default DetalhesConnect;