const app = getApp()
Page({
  data: {
    body: '',
    header: [{
      field: 'position_id',
      label: 'id',
      type: 'input'
    }, {
      field: 'position_name',
      label: '名称',
      type: 'input'
    }, {
      field: 'position_desc',
      label: '备注',
      type: 'input'
    }, {
      field: 'position_state',
      label: '状态',
      type: 'user-picker',
      group: 1
    }],
    count: 0,
    state: [],
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
    app.reqData(app.javaServer, "/position/select_position", "GET", {
      startIndex: this.data.startIndex,
      endIndex: this.data.startIndex + 12
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
    if (ele.type == "blur") {
      this.setData({
        update: {
          id: ele.currentTarget.dataset.id,
          yield: ele.currentTarget.dataset.label,
          value: ele.detail.value
        }
      })
    } else {
      this.setData({
        update: {
          id: ele.currentTarget.dataset.id,
          yield: ele.currentTarget.dataset.label,
          value: that.data.state[ele.detail.value]
        }
      })
    }
    app.reqData(app.javaServer, "/position/update_position", "PUT", that.data.update, null, {
      "Authorization": app.reqHeader.token,
      'Content-type': 'application/x-www-form-urlencoded'
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
      app.reqData(app.javaServer, "/position/delete_position/" + this.data.deleteID, "DELETE", null, null, {
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
  onPullDownRefresh() {
    this.queryData()
  },
  onLoad() {
    app.checkLoginState()
    this.queryData()
    app.queryOptions(app.javaServer, "position_state").then((res) => {
      this.setData({
        state: res.data[0].position_state.split(",")
      })
    })
  }
})