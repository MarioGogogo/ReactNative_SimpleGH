
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import BackPressComponent from "../common/BackPressComponent";
import {connect}  from 'react-redux'
import action from "../action";



 class MyPage extends Component<Props> {
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

  render() {
    const {navigation} = this.props
    return (
      <View style={styles.container}>
        <Text>我的页面</Text>
        <Button title="改变主题颜色"
                onPress={() => {
                  this.props.onThemeChange('#573e9c')
                }}>>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch =>({
  onThemeChange:theme => dispatch(action.onThemeChange(theme))
})

export default connect(mapStateToProps,mapDispatchToProps)(MyPage)






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
