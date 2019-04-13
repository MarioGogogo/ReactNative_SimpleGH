// 全局导航配置类
export default class NavigateUtil {
  /**
   * 返回上一页
   * @param params
   */
  static toPrevPage(params) {
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