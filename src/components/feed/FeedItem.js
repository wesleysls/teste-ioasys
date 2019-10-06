import React, { Component } from 'react';
import { View, StyleSheet, Text,TouchableHighlight } from 'react-native';

export default class EmpresaItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.empresaClick = this.empresaClick.bind(this);
    }

    empresaClick() {
        this.props.nave.navigate('Detalhes', {
            id: this.props.data.id
        });
    }


    render() {
        return (
            <View style={styles.feedContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#4da2d8' }}>{this.props.data.enterprise_name}</Text>
                <Text style={{ fontSize: 14 }}>{this.props.data.description}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', marginRight: 20 }}>
                        <Text style={{ fontWeight: 'bold' }}>Cidade: </Text>
                        <Text>{this.props.data.city}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold' }}>Estado: </Text>
                        <Text>{this.props.data.country}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row',alignItems:'center',justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold' }}>Preço da ação: </Text>
                        <Text>U${this.props.data.share_price}</Text>
                    </View>
                    <TouchableHighlight underlayColor={null} style={{ padding: 5,paddingLeft:10,paddingRight:10, backgroundColor: '#4da2d8',borderRadius:5}} onPress={this.empresaClick}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold',color:'white' }}>Detalhar</Text>
                    </TouchableHighlight>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    feedContainer: {
        width: '100%',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        padding: 15
    },
});