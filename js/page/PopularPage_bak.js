import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList,RefreshControl} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation'

import NavigateUtil from '../navigator/NavigateUtil'
import DetailPage from './DetailPage'
import {connect} from "react-redux";

import actions from '../action/index'
import {logicalExpression} from "@babel/types";

//请求地址
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.tabNames = ['Java'];
    // 'iOS', 'React', 'React Native', 'Go', 'PHP'
  }
  _getTabs() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        // screen:PopularTab, 传统写法不能传递参数
        screen: props => <PopularTabPage {...props} tabLabel={item}/>,
        navigationOptions: {
          title: item
        }
      }
    })
    return tabs;
  }

  render() {
    const TabNavigator = createMaterialTopTabNavigator(this._getTabs(), {
      tabBarOptions: {
        tabStyle: styles.tabStyle,
        upperCaseLabel: false, //是否大写
        scrollEnabled: true,//是否滚动
        styles: {
          backgroundColor: '#678',
          borderBottomColor: 'red',
        },
        indicatorStyle: styles.indicatorStyle,//指示器样式
        labelStyle: styles.labelStyle //文字样式
      }
    })
    return (
      <View style={{flex: 1, marginTop: 30}}>
        <TabNavigator/>
      </View>


    );
  }
}




class PopularTab extends Component<Props> {
  constructor(props) {
    super(props);
    const {tabLabel} = this.props;   //语言关键字
    this.storeName = tabLabel;
  }

  componentDidMount() {
    this._loadData()
  }

  _loadData() {
    const {onLoadPopularData} = this.props;
    const url = this.genFetchUrl(this.storeName)
    onLoadPopularData(this.storeName, url)

  }

  genFetchUrl(key) {
    return URL + key + QUERY_STR;
  }

  /**
   * 获取与当前页面有关的数据
   * @returns {*}
   * @private
   */
  // _store() {
  //   const {popular} = this.props;
  //   console.log('popular',popular)
  //   let store = popular[this.storeName]; // 判断 popular.java 是否存在
  //   if (!store) {
  //     store = {
  //       items: [],
  //       isLoading: false,
  //       projectModels: [],//要显示的数据
  //       hideLoadingMore: true,//默认隐藏加载更多
  //     }
  //   }
  //   return store;
  // }

  _goDetailPage() {
    NavigateUtil.goPage({
      navigation: this.props.navigation
    }, "DetailPage")
  }

  shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
      console.log('进来几次')
      return true

  }


  renderItem(data) {
    const item = data;
    console.log('获取数据', item)
    return <View style={{marginBottom: 10}}>
      <Text style={{backgroundColor: '#cccccc'}}>{JSON.stringify(item)}</Text>
    </View>
  }

  render() {
      console.log('看看这个render走几步')
      const {popular} = this.props;
      console.log('popular',popular)
      let store = popular ? popular[this.storeName] : null; // 判断 popular.java 是否存在
      if (!store) {
        store = {
          items: [],
          isLoading: false,
          projectModels: [],//要显示的数据
          hideLoadingMore: true,//默认隐藏加载更多
        }
      }
    return (
      <View style={styles.container}>
        <FlatList
          data={store.items}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => "" + item.item.id}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={"red"}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={"red"}
            />
          }
        />

      </View>
    );
  }
}

const mapStateToProps = state => ({
  popular: state.popular
})

const mapDispatchToProps = dispatch => ({
  onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url))
})

//注意：connect只是个function，并不应定非要放在export后面
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)

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
  tabStyle: {
    minWidth: 50,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: '#fff',
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6
  }
});
