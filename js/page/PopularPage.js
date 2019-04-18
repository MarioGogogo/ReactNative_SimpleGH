import React, {Component} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Button
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action/index'
import {createMaterialTopTabNavigator,createAppContainer} from "react-navigation";
import NavigationUtil from '../navigator/NavigateUtil'
import action from "../action";
import {logicalExpression} from "@babel/types";

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

type Props = {};
export default  class PopularPage extends Component<Props> {
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

// const mapPopularStateToProps = state => ({
//   theme: state.theme.theme,
// });
// const mapPopularDispatchToProps = dispatch => ({
//
// });
// //注意：connect只是个function，并不应定非要放在export后面
// export default connect(mapPopularStateToProps, mapPopularDispatchToProps)(PopularPage);



class PopularTab extends Component<Props> {
  constructor(props) {
    super(props);
    const {tabLabel} = this.props;
    this.storeName = tabLabel;
  }

  componentDidMount() {
    console.log('初次加载')
    this.loadData();
  }

  loadData() {
    const {onLoadPopularData} = this.props;
    const url = this.genFetchUrl(this.storeName)
    onLoadPopularData(this.storeName, url)
  }

  genFetchUrl(key) {
    return URL + key + QUERY_STR;
  }

  renderItem(data) {
    const item = data.item;
    //console.log('获取数据', item)
    return <View style={{marginBottom: 10}}>
      <Text style={{backgroundColor: '#cccccc'}}>{JSON.stringify(item)}</Text>
    </View>
  }

  render() {
    const {popular,theme}=this.props;
    let store = popular[this.storeName]
    if (!store) {
      store = {
        items: [],
        isLoading: false
      }
    }
    return (
      <View style={styles.container}>
        <View>
          <Text>我的页面</Text>
          <Button title="改变主题颜色"
                  onPress={() => {
                    this.props.onThemeChange('#f5ee26')
                  }}>
          </Button>
        </View>
        <FlatList
          data={store.items}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => "" + item.id}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={"#cc029"}
              colors={"#ddd"}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={"#cc0029"}
            />
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  popular: state.popular,
  theme:state.theme.theme
});
const mapDispatchToProps = dispatch => ({
  onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url)),
  onThemeChange:theme => dispatch(action.onThemeChange(theme))
})
//注意：connect只是个function，并不应定非要放在export后面
const  PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
    // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
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
