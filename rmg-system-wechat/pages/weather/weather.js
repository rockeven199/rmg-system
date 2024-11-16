let QQMapWX = require('../../utils/sdk/qqmap-wx-jssdk.min.js')
let qqmapsdk;

const app = getApp()
Page({
  data: {
    static_server: "http://127.0.0.1:80",
    now: {
      temp: "",
      feelsLike: "",
      humidity: "",
      windSpeed: "",
      icon: "100",
      text: "",
      seven_daily: "",
      more_info: "",
      show_flag: false,
      province: "",
      city: ""
    },
    mask_x: "0",
    mask_y: "0",
    refresh_position: false
  },
  onLoad(options) {
    this.getWeather()
  },

  onPullDownRefresh() {
    this.getWeather()
  },

  // 获取天气信息
  getWeather() {
    let that = this;

    // 设置Server地址
    this.setData({
      static_server: app.staticServer
    })

    // 获取未来几天的天气预报
    app.getNowCityWeather('https://devapi.qweather.com/v7/weather/7d').then((result) => {
      this.setData({
        seven_daily: result.data.daily
      })

      wx.stopPullDownRefresh()
    })

    // 获取今天的天气预报
    app.getNowCityWeather('https://devapi.qweather.com/v7/weather/now?').then((result) => {
      this.setData({
        now: {
          temp: result.data.now.temp,
          feelsLike: result.data.now.feelsLike,
          humidity: result.data.now.humidity,
          cloud: result.data.now.cloud,
          windSpeed: result.data.now.windSpeed,
          icon: result.data.now.icon,
          text: result.data.now.text
        }
      })
    })

    // QQ位置逆向
    qqmapsdk = new QQMapWX({
      key: "WUXBZ-PN36T-S67X2-VNX5M-EJI2Z-43B5K"
    })
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: wx.getStorageSync('latitude'),
        longitude: wx.getStorageSync('longitude')
      },
      success: function (res) {
        that.setData({
          province: res.result.address_component.province,
          city: res.result.address_component.city
        })
      }
    })
  },

  // 显示更多提示
  showMore(e) {
    let that = this;
    if (e.currentTarget.dataset.info != undefined) {
      that.setData({
        mask_x: Number((Math.floor(e.detail.x) - 40)) + "px",
        mask_y: Number((e.detail.y + 20)) + "px",
        show_flag: true,
        more_info: e.currentTarget.dataset.info
      });
    } else {
      that.setData({
        show_flag: that.data.show_flag == true ? false : true,
      });
    }
  },

  // 清除提示
  clearAll(e) {
    this.setData({
      show_flag: false
    });
  },

  // 获取当前城市位置
  getNowCityPosition() {
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
          title: '用户取消位置授权！',
          icon: 'none'
        })
      }
    })
  },

  // 刷新位置信息
  refreshWeather() {
    this.getNowCityPosition()
    this.getWeather()
    this.setData({
      refresh_position: true
    })
    let that = this
    setTimeout(() => {
      that.setData({
        refresh_position: false
      })
    },1100)
  },
})