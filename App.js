/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import configureStore from './src/configureStore';
import { vars } from './src/styles';

// console.disableYellowBox = true;

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ width: '100%', height: '100%' }}>
          <StatusBar
            backgroundColor="transparent"
            hidden
          />
          <Navigation />
        </View>
      </Provider>
    );
  }
}

