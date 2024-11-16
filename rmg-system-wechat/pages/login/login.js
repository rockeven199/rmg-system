const app = getApp()

Page({
  data: {
    username: "",
    password: "",
    captcha: "",
    code: "",
    user_null: false,
    pwd_null: false,
    captcha_null: false
  },
  // 登录
  login() {
    let reg = new RegExp(/["$%&^@|!~`'"]/g);
    let that = this;
    app.reqData(app.javaServer, "/login/login", "POST", {
      Username: this.data.username,
      Password: this.data.password,
      Captcha: this.data.captcha
    }, "json", {
      'content-type': app.reqMethod.postForm
    }).then((res) => {
      if (this.data.username != "" && this.data.password != "" && this.data.captcha != "") {
        if (res.code == 200) {
          wx.setStorageSync('Token', res.data)
          wx.setStorageSync('isLogin', true)
          wx.switchTab({
            url: '/pages/mine/mine',
          })
          wx.showToast({
            title: '登录成功！',
            icon: "none",
            duration: 2000
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        if (this.data.username == "") {
          that.setData({
            user_null: true
          })
        }
        if (this.data.password == "") {
          that.setData({
            pwd_null: true
          })
        }
        if (this.data.captcha == "") {
          that.setData({
            captcha_null: true
          })
        }

        if (reg.test(this.data.username) || reg.test(this.data.password) || reg.test(this.data.captcha)) {
          wx.showModal({
            title: '提示',
            icon: "error",
            content: '不允许输入特殊字符！',
          })
        }
      }
    })
  },
  // 获取验证码
  getCaptcha() {
    var that = this;
    wx.request({
      url: app.javaServer + "/login/captcha",
      responseType: 'arraybuffer',
      method: 'GET',
      success(res) {
        that.setData({
          code: "data:image/png;base64," + wx.arrayBufferToBase64(res.data)
        })
      }
    })
  },
  onReady() {
    this.getCaptcha()
  },
  onPullDownRefresh(){
    this.getCaptcha()
    wx.stopPullDownRefresh()
  }
})