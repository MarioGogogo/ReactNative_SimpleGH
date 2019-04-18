import Types from '../types'
import DataStore, {FLAG_STORAGE} from '../../common/dao/datastore'

/**
 * 获取最热数据异步action
 * @param storeName   请求类型
 * @param url      地址
 * @returns {Function}
 */
export function onLoadPopularData(storeName,url) {
     //需要异步的action
   console.log('storeName',storeName,'url',url)
    return dispatch =>{
         // 刷新告诉哪个类型在刷新
         dispatch({type:Types.POPULAR_REFRESH,storeName})
      let dataStore = new DataStore();
         dataStore.fetchData(url)
           .then(data=>{
              console.log('成功',data)
             //成功的dispatch处理
             handleData(dispatch,storeName,data)
           })
           .catch(error =>{
               console.log('失败',error)
             // 失败的dispatch处理
             dispatch({type:Types.POPULAR_REFRESH_FAIL,storeName,error})
           })
    }
}

function handleData(dispatch,storeName,data) {
      dispatch({
          type:Types.POPULAR_REFRESH_SUCCESS,
          items:data && data.data && data.data.items,
          storeName:storeName,
      })
}