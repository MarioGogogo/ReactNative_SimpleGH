import Types from '../../action/types';

const defaultState = {num:0};
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
  const newState = JSON.parse(JSON.stringify(state));
  const num = newState.num++;
  switch (action.type) {
    case Types.POPULAR_REFRESH://下拉刷新
      return {
        ...state,
        num:num,
        [action.storeName]: {
          ...[action.storeName],
          isLoading: true,
        }
      };
      break;
    case Types.POPULAR_REFRESH_SUCCESS://下拉刷新成功
      const newState = JSON.parse(JSON.stringify(state));
      return {
        ...newState,
        num:newState.num++,
        [action.storeName]: {
          ...[action.storeName],
          items: action.items,//原始数据
          isLoading: false
        }
      };
      break;
    case Types.POPULAR_REFRESH_FAIL://下拉刷新失败
      return {
        ...state,
        [action.storeName]: {
          ...[action.storeName],
          isLoading: false
        }
      };
      break;
    default:
      return state;
  }

}