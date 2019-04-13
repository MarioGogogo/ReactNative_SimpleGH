// 全局导航配置类
export default class NavigateUtil {
  /**
   *
   * @param params  要传递的参数
   * @param page    路由名
   */
  static goPage(params,page) {
    const navigation = NavigateUtil.navigation; //外部传递过来 （解决多层嵌套问题）
    if(!navigation) return "navigation is not null"
    navigation.navigate(page,{...params})
  }
  /**
   * 返回上一页
   * @param params
   */
  static goBack(params) {
    const {navigation} = params;
    navigation.goBack() //跳转相当于 ➡️➡️➡️➡️ this.props.navigation.goBack()
  }

  /**
   * 返回首页
   * @param params
   */
  static resetToHomePage(params) {
    const {navigation} = params
    navigation.navigate('Main') //跳转
  }
}