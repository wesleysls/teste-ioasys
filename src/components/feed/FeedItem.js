import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableHighlight } from 'react-native';

export default class EmpresaItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
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
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold' }}>Preço da ação: </Text>
                    <Text>U${this.props.data.share_price}</Text>

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