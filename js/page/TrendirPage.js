import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

export default class HomePage extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text>趋势</Text>
        <Button title="改变主题颜色"
                onPress={() => {
                  console.log('点击事件')
                  navigation.setParams({
                    theme: {
                      tintColor: 'red',
                      updateTime: new Date().getTime()
                    }
                  })
                }}>
        </Button>
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
