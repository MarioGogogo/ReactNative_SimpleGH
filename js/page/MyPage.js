
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import BackPressComponent from "../common/BackPressComponent";


export default class MyPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.backPress = new BackPressComponent({backPress: this.onBackPress});
  }

  componentDidMount() {
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  render() {
    const {navigation} = this.props
    return (
      <View style={styles.container}>
        <Text>我的页面</Text>
        <Button title="改变主题颜色"
                onPress={() => {
                  navigation.setParams({
                    theme: {
                      tintColor: 'green',
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
