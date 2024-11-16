const app = getApp()

Page({
  data: {
    str: [{
      id: 1,
      question: "刷新不出数据怎么办？",
      answer: "重启"
    }, {
      id: 2,
      question: "无法连接网络怎么办？",
      answer: "重启"
    }, {
      id: 3,
      question: "还不好用怎么办？",
      answer: "提交工单联系后勤"
    }, {
      id: 4,
      question: "提交工单后我该干嘛？",
      answer: "等"
    }],
    callbackText: "",
    callbackTextLength: 0
  },
  submit() {
    if (this.data.callbackText != "") {
      app.reqData(app.javaServer, "/user/contact", "GET", {
        content: this.data.callbackText
      }, null, null, null).then((res) => {
        if (res.code == 200) {
          wx.showToast({
            icon: 'none',
            title: '提交成功！',
          })
        }
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请填写反馈内容！！！',
      })
    }
  },
  getEnterLength(e) {
    this.setData({
      callbackTextLength: e.detail.value.length
    })
  }
})