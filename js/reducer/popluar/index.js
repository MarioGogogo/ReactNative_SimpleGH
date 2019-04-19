import Types from '../../action/types';

const defaultState = {};
/**
 * popular:{
 *     java:{
 *         items:[],
 *         isLoading:false
 *     },
 *     ios:{
 *         items:[],
 *         isLoading:false
 *     }
 * }
 * 0.state树，横向扩展
 * 1.如何动态的设置store，和动态获取store(难点：store key不固定)；
 * @param state
 * @param action
 * @returns {{theme: (onAction|*|string)}}
 */
export default function onAction(state = defaultState, action) {
  console.log('redurce数据：',action);
  switch (action.type) {
    case Types.POPULAR_REFRESH://下拉刷新
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
          hideLoadingMore:true
        }
      };
      break;
    case Types.POPULAR_REFRESH_SUCCESS://下拉刷新成功
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          items:action.items,
          hideLoadingMore:true,
          isLoading: false,
          projectModes: action.projectModes,//原始数据
          pageIndex:action.pageIndex
        }
      };
      break;
    case Types.POPULAR_REFRESH_FAIL://下拉刷新失败
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
        }
      };
      break;
    case Types.POPULAR_LOAD_MORE_SUCCESS://上啦加载成功
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModes:action.projectModes,
          hideLoadingMore: false,
          pageIndex:action.pageIndex
        }
      };
      break;
    case Types.POPULAR_LOAD_MORE_FAIL://上拉加载失败
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex
        }
      };
      break;
    default:
      return state;
  }

}