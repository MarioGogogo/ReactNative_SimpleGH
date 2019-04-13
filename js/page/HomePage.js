
import React, {Component} from 'react';
import {
  createBottomTabNavigator,
} from 'react-navigation'
import {Platform, StyleSheet, Text, View} from 'react-native';
import PopularPage from './PopularPage'
import TrendirPage from './TrendirPage'
import FavoritPage from './FavoritPage'
import MyPage from './MyPage'
import FontAwesomeIcons  from "react-native-vector-icons/FontAwesome"
import NavigateUtil from '../navigator/NavigateUtil'
export default class HomePage extends Component<Props> {
  _tabNavigator(){
    return (
      createBottomTabNavigator({
        PopularPage:{
          screen:PopularPage,
          navigationOptions:{
            tabBarLabel:"最热",
            tabBarIcon:({tintColor,focused})=>{
              return  <FontAwesomeIcons
                 name={"fire"}
                 size={26}
                 style={{color:tintColor}}
               />
            }
          }
        },
        TrendirPage:{
          screen:TrendirPage,
          navigationOptions:{
            tabBarLabel:"趋势",
            tabBarIcon:({tintColor,focused})=>{
              return  <FontAwesomeIcons
                name={"thermometer"}
                size={26}
                style={{color:tintColor}}
              />
            }
          }
        },
        FavoritPage:{
          screen:FavoritPage,
          navigationOptions:{
            tabBarLabel:"收藏",
            tabBarIcon:({tintColor,focused})=>{
              return  <FontAwesomeIcons
                name={"star"}
                size={26}
                style={{color:tintColor}}
              />
            }
          }
        },
        MyPage:{
          screen:MyPage,
          navigationOptions:{
            tabBarLabel:"个人",  tabBarIcon:({tintColor,focused})=>{
              return  <FontAwesomeIcons
                name={"github"}
                size={26}
                style={{color:tintColor}}
              />
            }
          }
        },
      })
    );
  }
  render() {
    NavigateUtil.navigation = this.props.navigation; //将外层的navigation传递给封装好的NavigateUtil保存起来
    const Tab = this._tabNavigator();
    return <Tab/>
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
