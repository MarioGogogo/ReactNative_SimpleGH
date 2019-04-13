import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
  createMaterialTopTabNavigator,

} from 'react-navigation'
import NavigateUtil from '../navigator/NavigateUtil'
import DetailPage from './DetailPage'

export default class HomePage extends Component<Props> {

  render() {
    const TabNavigator = createMaterialTopTabNavigator({
      PopularTab1: {
        screen: PopularTab,
        navigationOptions: {
          title: "Tab1"
        }
      },
      PopularTab2: {
        screen: PopularTab,
        navigationOptions: {
          title: "Tab2"
        }
      },
      PopularTab3: {
        screen: PopularTab,
        navigationOptions: {
          title: "Tab3"
        }
      },
    })
    return (
      <View style={{flex: 1,marginTop: 30}}>
        <TabNavigator/>
      </View>


    );
  }
}

class PopularTab extends Component {
  _goDetailPage(){
    NavigateUtil.goPage({
      navigation:this.props.navigation
    },"DetailPage")
  }
  render() {
    const {tabLabel} = this.props;
    return(<View style={styles.container}>
      <Text>{tabLabel}</Text>
      <Text onPress={this._goDetailPage.bind(this)}>跳转到详情页</Text>
    </View>)
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
