import React, {Component} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  FlatList,
  RefreshControl
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action/index'
import {createMaterialTopTabNavigator, createAppContainer} from "react-navigation";
import action from "../action";
import PopularItem   from './../common/popularItem'
import Toast  from "react-native-easy-toast"
import  NavigationBar from './../common/NavigationBar'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

type Props = {};
class PopularPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.tabNames = ['Java'];
  }
  _getTabs() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        // screen:PopularTab, 传统写法不能传递参数
        screen: props => <PopularTabPage {...props} tabLabel={item}/>,
        navigationOptions: {
          title: item,
        }
      }
    })
    return tabs;
  }

  render() {
    const { theme} = this.props;
    console.log(theme)
    let statusBar = {
      backgroundColor: theme.themeColor,
      barStyle: 'light-content',
    };
    let navigationBar = <View><Text>123s</Text></View>
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
        {navigationBar}
        <TabNavigator/>
      </View>
    );
  }
}

const mapPopularStateToProps = state => ({
  theme: state.theme.theme,
});
const mapPopularDispatchToProps = dispatch => ({

});
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapPopularStateToProps, mapPopularDispatchToProps)(PopularPage);

const pageSize = 10;//设为常量，防止修改
class PopularTab extends Component<Props> {
  constructor(props) {
    super(props);
    const {tabLabel} = this.props;
    this.storeName = tabLabel;
  }

  componentDidMount() {
    this._loadData();
  }

  _loadData(loadMore) {
    const {onRefreshPopular, onLoadMorePopular} = this.props;
    const store = this._store();
    const url = this.genFetchUrl(this.storeName);
    if (loadMore) {
      onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
        this.refs.toast.show('没有更多了');
      })
    } else {
      onRefreshPopular(this.storeName, url, pageSize)
    }
  }

  /**
   * 获取与当前页面有关的数据
   * @returns {*}
   * @private
   */
  _store() {
    const {popular} = this.props;
    let store = popular[this.storeName];
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModels: [],//要显示的数据
        hideLoadingMore: true,//默认隐藏加载更多
      }
    }
    return store;
  }


   genFetchUrl(key) {
    return URL + key + QUERY_STR;
  }

   renderItem(data) {
    const item = data.item;
    //console.log('获取数据', item)
    return <PopularItem item={item} />
  }
  // 是否加载更多
  _genIndicator() {
    return this._store().hideLoadingMore ? null :
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
        />
        <Text>正在加载更多</Text>
      </View>
  }
  render() {
    let store = this._store();
    const {theme}=this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModes}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => "" + item.id}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={"#cc029"}
              colors={"#ddd"}
              refreshing={store.isLoading}
              onRefresh={() => this._loadData()}
              tintColor={"#cc0029"}
            />
          }
          ListFooterComponent={() => this._genIndicator()}
          onEndReached={() => {
            console.log('---onEndReached----');
            setTimeout(() => {
              if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                this._loadData(true);
                this.canLoadMore = false;
              }
            }, 100);
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
            console.log('---onMomentumScrollBegin-----')
          }}
        />
        <Toast ref={'toast'} position={'center'}/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  popular: state.popular,
  theme: state.theme.theme
});
const mapDispatchToProps = dispatch => ({
  onRefreshPopular: (storeName, url,pageSize) => dispatch(actions.onRefreshPopular(storeName, url,pageSize)),
  onLoadMorePopular:(storeName,pageIndex,pageSize,items,callBack) => dispatch(actions.onLoadMorePopular(storeName,pageIndex,pageSize,items,callBack)),
  onThemeChange: theme => dispatch(action.onThemeChange(theme))
})
//注意：connect只是个function，并不应定非要放在export后面
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
    minWidth: 50, //fix minWidth会导致tabStyle初次加载时闪烁
    padding: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 13,
    margin: 0,
  },
  indicatorContainer: {
    alignItems: "center"
  },
  indicator: {
    color: 'red',
    margin: 10
  }
});
