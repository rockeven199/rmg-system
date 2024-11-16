const app = getApp()
Page({
  data: {
    msg: ""
  },

  onLoad(options) {
    app.reqData(app.javaServer, "/base/news/" + options.id, "GET", null, null, {
      Authorization: app.reqHeader.token
    }, null, false).then(res => {
      let temp = res.data[0]
      temp.news_text = res.data[0].news_text.split(" ")
      this.setData({
        msg: temp
      })
    })
  }
})