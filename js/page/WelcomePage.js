import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NavigateUtil from '../navigator/NavigateUtil'

export default class WelcomePage extends Component {
  componentDidMount(): void {
    this.timer = setTimeout(() => {
      // 2秒过后跳转首页
      NavigateUtil.resetToHomePage({
        navigation: this.props.navigation
      });    }, 500)

  }

  componentWillUnmount(): void {
    this.timer && clearTimeout(this.timer)
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>欢迎进入GitHub</Text>
        <Text>广告位出租</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
