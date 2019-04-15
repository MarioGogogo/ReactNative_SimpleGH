import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation'

import WelcomePage from "../page/WelcomePage"
import HomePage from "../page/HomePage";
import DetailPage from '../page/DetailPage';
const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null //可以通过header为null 来隐藏头部的导航模块
    }
  }
});

const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null //可以通过header为null 来隐藏头部的导航模块
    }
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      // header: null //可以通过header为null 来隐藏头部的导航模块
    }
  }
});

// 设置初始化导航器
export default createSwitchNavigator({
  Init: InitNavigator,
  Main: MainNavigator,
}, {
  navigationOptions: {
    header: null //可以通过header为null 来隐藏头部的导航模块
  }
})
