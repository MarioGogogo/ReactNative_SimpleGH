import Types from '../types'
import DataStore, {FLAG_STORAGE} from '../../common/dao/datastore'

/**
 * 获取最热数据异步action
 * @param storeName   请求类型
 * @param url      地址
 * @returns {Function}
 */
export function onLoadPopularData(storeName,url,pageSize) {
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
             handleData(dispatch,storeName,data,pageSize)
           })
           .catch(error =>{
               console.log('失败',error)
             // 失败的dispatch处理
             dispatch({type:Types.POPULAR_REFRESH_FAIL,storeName,error})
           })
    }
}

/**
 * 获取最热数据的异步action
 * @param storeName
 * @param url
 * @param pageSize
 * @param favoriteDao
 * @returns {function(*=)}
 */
export function onRefreshPopular(storeName, url, pageSize) {
  return dispatch => {
    dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
    let dataStore = new DataStore();
    dataStore.fetchData(url)//异步action与数据流
      .then(data => {
        handleData(Types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize)
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: Types.POPULAR_REFRESH_FAIL,
          storeName,
          error
        });
      })
  }
}






/**
 *
 * @param storeName
 * @param pageIndex
 * @param pageSize
 * @param dataArray
 * @param callBack  作用在于异常通信
 */
export function onLoadMorePopular(storeName,pageIndex,pageSize,dataArray=[],callBack) {
     return dispatch =>{
         //模拟网络请求
         setTimeout(()=>{
            // 已加载完全部数据
            if((pageIndex-1)*pageSize >= dataArray.length){
              if(typeof callBack === "function"){
                callBack('no more')
              }
              dispatch({
                  type:Types.POPULAR_LOAD_MORE_FAIL,
                  error:'no more',
                  storeName:storeName,
                   pageIndex: --pageIndex,
                   projectModes:dataArray,
              })
            }else{
              //还有数据
              let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
              dispatch({
                type:Types.POPULAR_LOAD_MORE_SUCCESS,
                storeName,
                pageIndex,
                projectModes: dataArray.slice(0,max)
              })
            }
         },500)
     }
}

function handleData(actionType, dispatch,storeName,data,pageSize) {
  let fixItems = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }
  dispatch({
    type:Types.POPULAR_REFRESH_SUCCESS,
    items:fixItems,
    projectModes:pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
    storeName:storeName,
    pageIndex:1
  })
}
/**
 * 处理数据
 * @param actionType
 * @param dispatch
 * @param storeName
 * @param data
 * @param pageSize
 * @param favoriteDao
 * @param params 其他参数
 */
export function handleData1(actionType, dispatch, storeName, data, pageSize,params) {
  let fixItems = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }
  //第一次要加载的数据
  let showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
  _projectModels(showItems,projectModels=>{
    dispatch({
      type: actionType,
      items: fixItems,
      projectModels:projectModels,
      storeName,
      pageIndex: 1,
      ...params
    })
  });
}








