import React, {Component} from 'react';
import {
  createBottomTabNavigator,
} from 'react-navigation'
import {Platform, StyleSheet, Text, View} from 'react-native';
import PopularPage from '../page/PopularPage'
import TrendirPage from '../page/TrendirPage'
import FavoritPage from '../page/FavoritPage'
import MyPage from '../page/MyPage'
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import NavigateUtil from './NavigateUtil'
import {BottomTabBar} from 'react-navigation-tabs'
import {connect}  from "react-redux"
import {logicalExpression} from "@babel/types";


//动态配置页面
const TABS = {
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: "最热",
      tabBarIcon: ({tintColor, focused}) => {
        return <FontAwesomeIcons
          name={"fire"}
          size={26}
          style={{color: tintColor}}
        />
      }
    }
  },
  TrendirPage: {
    screen: TrendirPage,
    navigationOptions: {
      tabBarLabel: "趋势",
      tabBarIcon: ({tintColor, focused}) => {
        return <FontAwesomeIcons
          name={"thermometer"}
          size={26}
          style={{color: tintColor}}
        />
      }
    }
  },
  FavoritPage: {
    screen: FavoritPage,
    navigationOptions: {
      tabBarLabel: "收藏",
      tabBarIcon: ({tintColor, focused}) => {
        return <FontAwesomeIcons
          name={"star"}
          size={26}
          style={{color: tintColor}}
        />
      }
    }
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: "个人",
      tabBarIcon: ({tintColor, focused}) => {
        return <FontAwesomeIcons
          name={"github"}
          size={26}
          style={{color: tintColor}}
        />
      }
    }
  }
}


class DynamicTabNavigator extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true  //禁止黄色⚠️警告弹窗
  }

  _tabNavigator() {
    if(this.Tabs){
       return  this.Tabs;
    }
    const {PopularPage, FavoritPage, MyPage, TrendirPage} = TABS;
    //根据需要定制显示的tabs
    const tabs = {PopularPage, FavoritPage,TrendirPage, MyPage}
    // 如何动态改变底部标题
    // PopularPage.navigationOptions.tabBarLabel = "最新"
    return  this.Tabs = createBottomTabNavigator(tabs,{
      tabBarComponent: props=>{
        return  <TabBarComponent theme={this.props.theme} {...props} />
      }
    });
  }

  render() {
    NavigateUtil.navigation = this.props.navigation; //将外层的navigation传递给封装好的NavigateUtil保存起来
    const Tab = this._tabNavigator();
    return <Tab/>

  }
}


// 定义一个动态的底部导航
class TabBarComponent extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.theme = {
      tintColor: props.theme,
      updateTime: new Date().getTime()
    }
  }

  render() {
    /**
     * 没有redux之前的写法
     */
    // const {routes,index} = this.props.navigation.state;
    // console.log("路由数组:",routes,"坐标:",index)
    // if(routes[index].params){
    //    const {theme} = routes[index].params;
    //    //如果
    //    if(theme && theme.updateTime > this.theme.updateTime){
    //       this.theme = theme;
    //    }
    // }
    return <BottomTabBar
      {...this.props}
      activeTintColor={this.props.theme}
    />;
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);