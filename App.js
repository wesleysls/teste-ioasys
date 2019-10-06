import React, { Component } from 'react';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/Reducers';
import Preload from './src/screens/Preload';
import Login from './src/screens/Login';
import Home from './src/screens/Home';

console.disableYellowBox = true;

const AppNavigator = createStackNavigator({
  
  Preload: {
    screen: Preload
  },
  Home: {
    screen: Home
  },
  Login: {
    screen: Login
  }
}, {
  defaultNavigationOptions: {
      header: null
    }
  });

const AppContainer = createAppContainer(AppNavigator);
const store = createStore(Reducers, applyMiddleware(ReduxThunk));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}