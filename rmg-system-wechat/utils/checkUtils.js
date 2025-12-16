// 检查登录状态
function checkLoginState() {
  if (!wx.getStorageSync('Token')) {
    wx.setStorageSync('isLogin', false)
    wx.showToast({
      title: '请先登录！！',
      icon:"none",
      duration:2000
    })
  } else {
    wx.setStorageSync('isLogin', true)
  }
}

// 检查token是否过期
function checkTokenExpires() {
  wx.request({
    url: "http://127.0.0.1:8080/center/init_user_data",
    method: "POST",
    header: {
      "Content-Type": "x-www-form-urlencoded",
      "Authorization": wx.getStorageSync('Token')
    },
    data: {
      token: wx.getStorageSync('Token')
    },
    success(res) {
      console.log(res);
    }
  })
}

// 清除登录信息
function clearLoginInfo() {
  wx.removeStorageSync('isLogin')
  wx.removeStorageSync('username')
  wx.removeStorageSync('Token')
  wx.removeStorageSync('header_img')
  wx.removeStorageSync('Level')
  wx.removeStorageSync('department')
  wx.removeStorageSync('second_department')
  wx.removeStorageSync('job')
  wx.removeStorageSync('phone_number')
  wx.removeStorageSync('email')
  wx.removeStorageSync('userID')
  wx.removeStorageSync('sex')
  wx.removeStorageSync('now_location')
  wx.removeStorageSync('header_length')
}

/**
 * @param {*} isLogin 
 * @param {*} username 
 * @param {*} Token 
 * @param {*} header_img 
 * @param {*} Level 
 * @param {*} department 
 * @param {*} second_department 
 * @param {*} job 
 */
// 设置个人信息
function setUserInfo(username, header_img, Level, department, second_department, job, phone_number, email, id, sex) {
  wx.setStorageSync('username', username)
  wx.setStorageSync('header_img', header_img)
  wx.setStorageSync('Level', Level)
  wx.setStorageSync('department', department)
  wx.setStorageSync('second_department', second_department)
  wx.setStorageSync('job', job)
  wx.setStorageSync('phone_number', phone_number)
  wx.setStorageSync('email', email)
  wx.setStorageSync('userID', id)
  wx.setStorageSync('sex', sex)
}

module.exports = {
  checkLoginState,
  checkTokenExpires,
  clearLoginInfo,
  setUserInfo
}