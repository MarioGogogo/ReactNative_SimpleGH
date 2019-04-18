import Types from '../../action/types';
const defaultState = {
  theme: "#4696ec",
  onShowCustomThemeView: false,
};
export default function onAction(state = defaultState, action) {
  console.log('主题中的redurce数据：',action);
  switch (action.type) {
    case Types.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme,
      };
      break;
    default:
      return state;
  }

}