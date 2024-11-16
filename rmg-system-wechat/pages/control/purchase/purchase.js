const app = getApp()
Page({
  data: {
    body: '',
    // 'id', '名称', '数量', '开始时间', '结束时间', '状态'
    header: [{
      field: 'purchase_id',
      label: 'id',
      type: "input"
    }, {
      field: 'purchase_name',
      label: "名称",
      type: "input"
    }, {
      field: 'purchase_count',
      label: "数量",
      type: 'input'
    }, {
      field: 'purchase_start_time',
      label: "开始时间",
      type: 'date-picker',
      group: 1
    }, {
      field: 'purchase_end_time',
      label: "结束时间",
      type: 'date-picker',
      group: 2
    }, {
      field: 'purchase_state',
      label: "状态",
      type: 'user-picker',
      group: 3
    }],
    count: 0,
    update: '',
    deleteID: 0,
    showMask: false,
    confirmDelete: false,
    confirmStr: '',
    totalCount: 0,
    startIndex: 0
  },
  replyLimit(e) {
    this.setData({
      startIndex: e.detail,
    })
    this.queryData()
  },
  queryData() {
    app.reqData(app.javaServer, "/purchase/select_purchase", "GET", {
      startIndex: this.data.startIndex
    }, null, {
      Authorization: app.reqHeader.token
    }, null, true).then((res) => {
      let temp = 0
      for (let a = 0; a < Number(res.header["X-Total-Count"]) / 12; a++) {
        if (Number(res.header["X-Total-Count"]) % 12 != 0) {
          temp = a + 1
        }
      }
      this.setData({
        body: res.data.data,
        count: Object.keys(res.data.data[0]).length + 1,
        totalCount: temp
      })
    })
    wx.stopPullDownRefresh()
  },
  getData(e) {
    let ele = e
    let that = this;
    if (ele.type == "blur" || ele.currentTarget.dataset.label == "purchase_start_time" || ele.currentTarget.dataset.label == "purchase_end_time") {
      this.setData({
        update: {
          id: ele.currentTarget.dataset.id,
          field: ele.currentTarget.dataset.label,
          value: ele.detail.value
        }
      })
    }
    if (e.currentTarget.dataset.label == "purchase_state") {
      this.setData({
        update: {
          id: ele.currentTarget.dataset.id,
          field: ele.currentTarget.dataset.label,
          value: that.data.state[ele.detail.value]
        }
      })
    }
    app.reqData(app.javaServer, "/purchase/update_purchase", "PUT", that.data.update, null, {
      "Authorization": app.reqHeader.token,
      'Content-type': app.reqMethod.postForm
    }, null).then(() => {
      this.queryData()
    })
  },
  // 确认拟态框
  cancelDelete() {
    this.setData({
      showMask: false
    })
  },
  deleteData(e) {
    this.setData({
      showMask: true,
      deleteID: Number(e.currentTarget.dataset.id)
    })
  },
  inputConfirm(e) {
    this.setData({
      showMask: true,
      confirmStr: e.detail.value
    })
  },
  confirmDelete() {
    if (this.data.confirmStr == "删除数据") {
      this.setData({
        showMask: false
      })
      app.reqData(app.javaServer, "/purchase/delete_purchase/" + this.data.deleteID, "DELETE", null, null, {
        Authorization: app.reqHeader.token,
        "content-type": "application/x-www-urlencoded-form"
      }, null).then(e => {
        wx.showToast({
          title: e.msg,
          icon: 'none',
          duration: 2000
        })
        if (e.code == 200) {
          this.queryData()
        }
      })
    } else {
      wx.showToast({
        title: '确认字符输入错误！',
        duration: 2000,
        icon: 'none'
      })
    }
  },
  onLoad() {
    this.queryData()
    app.queryOptions(app.javaServer, "purchase_state").then((res) => {
      this.setData({
        state: res[0].purchase_state.split(",")
      })
    })
  },
  onPullDownRefresh() {
    this.queryData()
  }
})