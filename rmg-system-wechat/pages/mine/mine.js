const {
  clearLoginInfo
} = require("../../utils/checkUtils")

const app = getApp()
Page({
  data: {
    username: "",
    level: "",
    department: "",
    second_department: "",
    job: "",
    header_img: "default/girl.jpg",
    isLogin: "",
    phone_number: "",
    email: "",
    sex: "",
    user_header_array: "",
    showPreMask: false,
    isDelete: false,
    ipAddress: app.staticServer
  },
  // 登出
  logout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      complete: (res) => {
        if (res.confirm) {
          app.clearLoginInfo()
          wx.reLaunch({
            url: '../main/main'
          })
        }
      }
    })
  },
  // 登录
  login() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  // 请求个人信息
  getUserInfo() {
    wx.showNavigationBarLoading()
    let that = this;
    app.reqData(app.javaServer, "/user/init_user_data", "POST", null, null, {
      "Content-Type": app.reqMethod.postForm,
      "Authorization": wx.getStorageSync('Token')
    }, null).then((res) => {
      wx.hideNavigationBarLoading()
      if (res.code != 403) {
        // 设置个人信息
        that.setData({
          username: res.data[0].username,
          level: res.data[0].level,
          department: res.data[0].department,
          second_department: res.data[0].second_department,
          job: res.data[0].job,
          header_img: res.data[0].header_img,
          phone_number: res.data[0].phone_number,
          email: res.data[0].email,
          isLogin: wx.getStorageSync('isLogin'),
          sex: res.data[0].sex
        })
        app.setUserInfo(res.data[0].username, res.data[0].header_img, res.data[0].level, res.data[0].department, res.data[0].second_department, res.data[0].job, res.data[0].phone_number, res.data[0].email, res.data[0].id, res.data[0].sex)

        wx.stopPullDownRefresh()
      }
      if (res.code == 403) {
        wx.setStorageSync('isLogin', false)
        app.clearLoginInfo()
        wx.showToast({
          icon: 'none',
          title: '登录过期，请重新登录！！',
        })
      }
    })
  },
  // 上传头像
  uploadHeader() {
    let choosedFile = null
    let that = this
    if (that.data.user_header_array.length < 5) {
      wx.chooseMessageFile({
        count: 1,
        type: 'image',
        success(chooseFile) {
          choosedFile = chooseFile.tempFiles[0].path
        },
        complete() {
          wx.uploadFile({
            filePath: choosedFile,
            name: 'file',
            url: app.javaServer + "/user/upload_header_image",
            formData: {
              username: wx.getStorageSync('username'),
              userID: wx.getStorageSync('userID')
            },
            header: {
              Authorization: app.reqHeader.token
            },
            success(res) {
              setTimeout(() => {
                wx.showToast({
                  title: JSON.parse(res.data).msg,
                  icon: 'none'
                })
                that.getPerviewImage()
              }, 2000)
            },
            fail(e) {}
          })
        }
      })
    } else {
      wx.showToast({
        title: '最多上传五个头像!',
        icon: 'none'
      })
    }
  },
  changeHeaderImage() {
    let that = this;
    that.setData({
      showPreMask: that.data.showPreMask == true ? false : true
    })
    that.data.showPreMask == true ? this.getPerviewImage() : '';
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
  // 更新头像
  updateHeader(e) {
    wx.setStorageSync('header_img', e.currentTarget.dataset.index)
    this.setData({
      header_img: e.currentTarget.dataset.index
    })
    app.reqData(app.javaServer, "/user/update_header_image", "PUT", {
      header_image: e.currentTarget.dataset.index,
      user_id: wx.getStorageSync('userID')
    }, null, {
      Authorization: wx.getStorageSync('Token'),
      'content-type': app.reqMethod.postForm
    }, null, false)
  },
  // 删除头像
  deleteHeader(e) {
    let that = this
    if (Number(wx.getStorageSync('header_length') > 1)) {
      if (e.currentTarget.dataset.index == wx.getStorageSync('header_img')) {
        wx.showToast({
          title: '此头像正在使用！',
          icon: "none"
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '确定要删除头像吗？',
          complete: (res) => {
            if (res.confirm) {
              app.reqData(app.javaServer, "/user/delete_header_image", "DELETE", {
                header_image: e.currentTarget.dataset.index,
                user_id: wx.getStorageSync('userID'),
                username: wx.getStorageSync('username')
              }, null, {
                Authorization: app.reqHeader.token,
                'content-type': app.reqMethod.postForm
              }, null).then((res) => {
                wx.showToast({
                  title: res.msg,
                  icon: "none"
                })
                if (res.code == 200) {
                  that.getPerviewImage()
                }
              })
            }
          }
        })
      }
    } else {
      wx.showToast({
        title: '至少保留一个头像！',
        icon: 'none'
      })
    }
  },
  // 扫描登陆二维码
  scanLoginCode() {
    wx.scanCode({
      success(result) {
        app.reqData(app.javaServer, "/login/check_QR_code", "GET", {
          token: wx.getStorageSync('Token'),
          QRSessionID: result.result
        })
      }
    })
  },
  // 更新个人数据
  updateProfile(e) {
    let temp = new RegExp(/\d{3}-\d{8}|\d{4}-\d{7}|^1(3[0-9]|4[57]|5[0-35-9]|7[0678]|8[0-9])\d{8}$/)
    console.log(temp.test(e.detail.value))

    app.reqData(app.javaServer, '/user/set_user_profile', "PUT", {
      phone_number: this.data.phone_number,
      email: this.data.email,
      user_id: wx.getStorageSync('userID'),
      username: this.data.username
    }, null, {
      'content-type': app.reqMethod.postForm,
      Authorization: app.reqHeader.token
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.getUserInfo();
    this.setData({
      showPreMask: false
    })
  },
  onLoad() {
    if (this.data.isLogin) {
      this.getUserInfo()
    }
  },
  // 刷新数据
  onShow() {
    this.setData({
      isLogin: wx.getStorageSync('isLogin')
    })
    if (this.data.isLogin == true) {
      this.getUserInfo()
    }
  },
  // 下拉刷新
  onReachBottom() {
    console.log(wx.getStorageSync('Token'))
    if (wx.getStorageSync('isLogin') == "true") {
      this.getUserInfo()
    }
  }
})