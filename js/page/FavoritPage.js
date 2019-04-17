
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import action from "../action";
import {connect} from "react-redux";

class FavoritPage extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>收藏</Text>
        <Button title="改变主题颜色"
                onPress={() => {
                  console.log('点击事件')
                  this.props.onThemeChange('#42cb22')
                }}>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch =>({
  onThemeChange:theme => dispatch(action.onThemeChange(theme))
})

export default connect(mapStateToProps,mapDispatchToProps)(FavoritPage)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
