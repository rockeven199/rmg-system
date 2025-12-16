const app = getApp()

Page({
  data: {
    user_header_array: "",
    showPreMask: true
  },
  // 获取头像
  getPerviewImage() {
    let that = this
    app.reqData(app.javaServer, "/user/get_preview_image", "POST", {
      userId: wx.getStorageSync('userID')
    }, null, {
      Authorization: app.reqHeader.token,
      'content-type': app.reqMethod.postForm
    }).then((res) => {
      that.setData({
        user_header_array: res.data
      })
      setTimeout(() => {
        wx.setStorageSync('header_length', res.data.length)
      }, 1000)
    })
  },
  onLoad(options) {
    this.getPerviewImage()
  },
  onShow() {
    this.getPerviewImage()
  }
})