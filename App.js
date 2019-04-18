import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './js/navigator/AppNavigator';
import store from './js/store'
import {Provider} from 'react-redux'


export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    );
  }
}


