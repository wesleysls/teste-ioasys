import React, { Componet } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Detalhes from './Detalhes';
import Empresas from './Empresas';

const Home = createStackNavigator({
    Empresas: {
        screen: Empresas
    },
    Detalhes: {
        screen: Detalhes
    }
},{
    defaultNavigationOptions:{
       headerStyle:{
           backgroundColor:'#4da2d8'
       },
       headerTitleStyle:{
           color:'#ffffff',
           flex:1,
           textAlign:'center'
       }
    }
});

export default Home;