import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import {
  createMaterialTopTabNavigator,

} from 'react-navigation'
import NavigateUtil from '../navigator/NavigateUtil'
import DetailPage from './DetailPage'

export default class PopularPage extends Component<Props> {
  constructor(props){
    super(props);
    this.tabNames= ['Java','Android','iOS','React','React Native','Go','PHP'];
  }
  _getTabs(){
    const tabs = {};
    this.tabNames.map((item,index)=>{
       tabs[`tab${index}`]={
         // screen:PopularTab, 传统写法不能传递参数
         screen:props => <PopularTab {...props} tabLabel={item}/>,
         navigationOptions:{
           title:item
         }
       }
    })
    return tabs;
  }
  render() {
    const TabNavigator = createMaterialTopTabNavigator(this._getTabs(),{
         tabBarOptions:{
           tabStyle:styles.tabStyle,
           upperCaseLabel:false, //是否大写
           scrollEnabled:true ,//是否滚动
           styles:{
              backgroundColor: '#678',
              borderBottomColor:'red',
           },
           indicatorStyle:styles.indicatorStyle,//指示器样式
           labelStyle:styles.labelStyle //文字样式
         }
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
    const {tabLabel,navigation} = this.props;
    return(<View style={styles.container}>
      <Text>{tabLabel}</Text>
      <Text onPress={this._goDetailPage.bind(this)}>跳转到详情页</Text>
      <Text>动态改变底部导航样色</Text>
      <Button title="改变颜色" onPress={() => {
        navigation.setParams({
          theme: {
            tintColor: 'green',
            updatetime: new Date().getTime()
          }
        })
      }}/>
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
  tabStyle:{
    minWidth: 50,
  },
  indicatorStyle:{
     height:2,
    backgroundColor:'#fff',
  },
  labelStyle:{
     fontSize: 13,
    marginTop: 6,
    marginBottom: 6
  }
});
