const app = getApp()
Page({
  data: {
    time: "",
    weather_icon: "100",
    weather_text: "",
    username: "",
    hello_tips: "",
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1 > 10 ? new Date().getMonth() + 1 : "0" + (new Date().getMonth() + 1),
    isLogin: '',
    static_server: app.staticServer,
    news: [{
      newsID: 1,
      title: "《关于管理部人事调动的公告》"
    }, {
      newsID: 2,
      title: "员工体检通知"
    }]
  },
  // marK:设置时间
  setTime() {
    setInterval(() => {
      this.setData({
        time: (new Date().getHours().toString() < 10 ? "0" + new Date().getHours().toString() : new Date().getHours().toString()) + ":" + (new Date().getMinutes().toString() < 10 ? "0" + new Date().getMinutes().toString() : new Date().getMinutes().toString()) + ":" + (new Date().getSeconds().toString() < 10 ? "0" + new Date().getSeconds().toString() : new Date().getSeconds().toString()),
        hello_tips: new Date().getHours() < 5 ?
          "该休息啦!" : new Date().getHours() >= 5 && new Date().getHours() <= 8 ?
          "早上好!" : new Date().getHours() > 8 && new Date().getHours() <= 12 ?
          "上午好!" : new Date().getHours() > 12 && new Date().getHours() < 18 ? "下午好!" : "晚上好!"
      })
    }, 1000)
  },
  // mark:跳转到指定操作页面
  goPage(_event) {
    if (wx.getStorageSync('isLogin')) {
      if (_event.currentTarget.dataset.page == "weather") {
        wx.navigateTo({
          url: '/pages/weather/weather',
        })
      } else {
        wx.navigateTo({
          url: '/pages/control/' + _event.currentTarget.dataset.page + '/' + _event.currentTarget.dataset.page
        })
      }
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  // mark:获取当前城市位置
  getNowCityPosition() {
    wx.stopPullDownRefresh()
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        // 设置当前位置
        wx.setStorageSync('now_location', res.longitude + "," + res.latitude)
        wx.setStorageSync('longitude', res.longitude)
        wx.setStorageSync('latitude', res.latitude)
      },
      fail() {
        wx.showToast({
          title: '获取位置信息失败！',
          icon: 'none'
        })
      }
    })
  },
  // mark:获取天气信息
  getCityWeather() {
    this.getNowCityPosition()
    setTimeout(() => {
      app.getNowCityWeather('https://devapi.qweather.com/v7/weather/now?').then((result) => {
        this.setData({
          weather_icon: result.data.now.icon,
          weather_text: result.data.now.text,
          weather_wind_direction: result.data.now.windDir,
          weather_speed: result.data.now.windSpeed,
          weather_temp: result.data.now.temp
        })
      });
    }, 1000)
  },
  // mark:启动加载
  onLoad() {
    let that = this;
    // 设置时间
    this.setTime();
    // 检查是否登录
    // app.checkLoginState();
    // 加载字体
    wx.loadFontFace({
      family: 'times',
      source: app.staticServer + '/font/DS-Digital/DS-DIGIT-4.ttf',
    })

    this.getCityWeather()
  },
  // mark:切换页面
  onShow() {
    this.setData({
      isLogin: wx.getStorageSync('isLogin'),
      username: wx.getStorageSync('username'),
      static_server: app.staticServer
    });
  },
  // marK:下拉刷新数据
  onPullDownRefresh() {
    this.getCityWeather()
    this.getNowCityPosition()
  },
  // mark: 跳转到新闻页面
  moreNewsInfo(e) {
    wx.navigateTo({
      url: '/pages/news/news?id=' + e.currentTarget.dataset.newsid,
    })
  },
})