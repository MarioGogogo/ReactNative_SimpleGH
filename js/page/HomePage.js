
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
import DynamicTabNavigation from "../navigator/DynamicTabNavigation"
import BackPressComponent from "../common/BackPressComponent";
import actions from "../action";
import {connect} from "react-redux";

class HomePage extends Component {
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
  /**
   * 处理 Android 中的物理返回键
   * https://reactnavigation.org/docs/en/redux-integration.html#handling-the-hardware-back-button-in-android
   * @returns {boolean}
   */
  onBackPress = () => {
    const {dispatch, nav} = this.props;
    //if (nav.index === 0) {
    if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
      return false;
    }
    dispatch(NavigationActions.back());
    return true;  //返回true  系统就不会再处理事件
  };

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
    return <DynamicTabNavigation/>
  }
}

const mapStateToProps = state => ({
    nav:state.nav
})

const mapDispatchToProps = dispatch =>({})

export default connect(mapStateToProps,mapDispatchToProps)(HomePage)

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
