const app = getApp()
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    header: {
      type: Object,
    },
    state: {
      type: Array || String
    },
    state2: {
      type: Array || String
    },
    state3: {
      type: Array || String
    },
    state4: {
      type: Array || String
    },
    subUrl: {
      type: String
    },
    getTotalType: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModel: false,
    date: ["请选择", "请选择"],
    state: [],
    state2: [],
    state3: [],
    state4: [],
    initJSON: {
      state: "请选择",
      state2: "请选择",
      state3: "请选择",
      state4: "请选择"
    },
    totalCount: 0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changePage() {
      this.triggerEvent('toggle')
    },
    // 添加记录
    addNewData() {
      this.setData({
        showModel: true
      })
    },
    // 选中数据
    choose(e) {
      let index = e.currentTarget.dataset.group
      let temp = this.data.initJSON
      if (index == 1) {
        temp.state = this.data.state[e.detail.value]
        this.setData({
          initJSON: temp
        })
      }
      if (index == 2) {
        temp.state2 = this.data.state2[e.detail.value]
        this.setData({
          initJSON: temp
        })
      }
      if (index == 3) {
        temp.state3 = this.data.state3[e.detail.value]
        this.setData({
          initJSON: temp
        })
      }
      if (index == 4) {
        temp.state4 = this.data.state4[e.detail.value]
        this.setData({
          initJSON: temp
        })
      }
    },
    changePage(e) {
      this.triggerEvent('reply', e.currentTarget.dataset.limit)
    },
    // 选择日期
    chooseDate(e) {
      let temp = this.data.date
      temp[e.currentTarget.dataset.index - 3] = e.detail.value
      this.setData({
        date: temp
      })
    },
    closeMask() {
      this.setData({
        showModel: false
      })
    },
    // 表单填写检查
    checkForm(e) {
      var temp = []
      Object.values(e.detail.value).forEach(item => {
        if (item == "" || item == "请选择") {
          temp.push(item)
        }
      })

      if (temp.length == 0) {
        this.formSubmit(e)
      } else {
        wx.showToast({
          title: '请填写全部表单！',
          icon: "none"
        })
      }
    },
    // 提交表单
    formSubmit(e) {
      app.reqData(app.javaServer, this.properties.subUrl, "GET", e.detail.value, null, {
        Authorization: app.reqHeader.token
      }, null, false).then(res => {
        wx.showToast({
          title: res.msg + "下拉刷新数据!",
          icon: "none"
        })

        this.setData({
          showModel: false,
          initJSON: {
            state: "请选择",
            state2: "请选择",
            state3: "请选择",
            state4: "请选择"
          }
        })
      })
    },
    // 设置选项
    setRange() {
      this.setData({
        state: this.properties.state,
        state2: this.properties.state2,
        state3: this.properties.state3,
        state4: this.properties.state4
      })
    },
    // 获取数据总条目数
    getTotalData() {
      app.reqData(app.javaServer, "/base/get_data_total_count", "GET", {
        type: this.data.getTotalType
      }, null, {
        Authorization: app.reqHeader.token
      }, null, false).then(res => {
        this.setData({
          totalCount: Number(res.data)
        })
      })
    }
  },
  // 生命周期
  lifetimes: {
    attached() {
      this.setRange()
      this.getTotalData()
    }
  }
})