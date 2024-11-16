/**
 * @param {String} ip 请求ip
 * @param {String} dataUrl 请求路径
 * @param {String} method 请求方法
 * @param {Json} data 请求数据
 * @param {String} dataType 请求参数类型
 * @param {JSON} header 请求头
 * @param {String} resType 响应数据类型 
 * @param {Boolean} resultFull 是否返回未简化的响应
 */

//  网络请求
function reqData(ip, dataUrl, method = "GET", data = "", dataType = "json", header = null, resType, resultFull = false) {
  return new Promise((reslove, reject) => {
    wx.request({
      url: ip + dataUrl,
      method: method,
      dataType: dataType,
      header: header,
      data: data,
      responseType: resType,
      success: (res) => {
        if (resultFull == false) {
          reslove(res.data)
        } else {
          reslove(res)
        }
      },
      fail() {
        reject(false)
      }
    })
  })
}

// 状态选项请求
/**
 * 
 * @param {String} ip 请求地址 
 * @param {Json} data 请求状态类型
 */
function queryOptions(ip, data_in) {
  return new Promise((reslove, reject) => {
    wx.request({
      url: ip + '/base/get_options',
      method: "GET",
      header: {
        Authorization: wx.getStorageSync('token')
      },
      data: {
        "options_type": data_in
      },
      success(res) {
        reslove(res.data)
      }
    })
  })
}

// 请求类型
const reqMethod = {
  postForm: "application/x-www-form-urlencoded",
  JSON: "application/json",
  Text: "text/plain",
  File: "multipart/form-data",
}

const reqHeader = {
  token: wx.getStorageSync('Token')
}

module.exports = {
  reqData: reqData,
  queryOptions: queryOptions,
  reqMethod: reqMethod,
  reqHeader: reqHeader
}