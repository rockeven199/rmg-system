// 登录信息检查
import {
  checkLoginState,
  checkTokenExpires,
  clearLoginInfo,
  setUserInfo
} from './utils/checkUtils'

// 请求数据
import {
  reqData,
  reqMethod,
  reqHeader,
  queryOptions
} from './utils/requestData'

// 获取天气
import {
  getNowCityWeather
} from './utils/weatherUtils'

App({
  getNowCityWeather,
  checkLoginState,
  checkTokenExpires,
  clearLoginInfo,
  setUserInfo,
  reqData,
  queryOptions,
  reqMethod,
  reqHeader,
  javaServer: "http://10.21.33.242:8080",
  staticServer: "http://10.21.33.242:80",
  // javaServer: "http://127.0.0.1:8080",
  // staticServer: "http://127.0.0.1:80",
  webSocketServer: "ws://10.21.33.242"
})