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
});

export default Home;