/**
 * @description 获取天气信息
 */


exports.getNowCityWeather = function getNowCityWeather(url) {
  let that = this
  return new Promise(function (reslove, reject) {
    // 获取天气
    wx.request({
      url: url,
      data: {
        key: "4bb6747bb8ee4e489d76501cf550da45",
        location: wx.getStorageSync('now_location'),
        lang: "zh",
        unit: "m"
      },
      method: "GET",
      success(res) {
        reslove(res)
      },
      fail(e) {
        reject(e)
      }
    });
  })
}