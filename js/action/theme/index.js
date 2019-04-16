import Types from '../types'

/**
 * 主题变更
 * @param theme
 * @returns {{type: string, theme: *}}  返回action
 */
export function onThemeChange(theme) {
  return {type: Types.THEME_CHANGE, theme: theme}
}

