import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import  {connect} from "react-redux"
import DynamicTabNavigation from "../navigator/DynamicTabNavigation";
import action from "../action/index";


class TrendirPage extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text>趋势</Text>
        <Button title="改变主题颜色"
                onPress={() => {
                  console.log('点击事件')
                  this.props.onThemeChange('red')
                }}>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state =>{
  theme:state.theme.theme
}

const mapDispatchToProps = dispatch =>{
  onThemeChange:theme => dispatch(action.onThemeChange(theme))
}

export  default connect(mapStateToProps,mapDispatchToProps)(TrendirPage)
