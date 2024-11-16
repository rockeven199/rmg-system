const app = getApp()
Page({
  data: {
    body: '',
    header: [{
      label: 'id',
      field: 'resource_id',
      type: 'input'
    }, {
      label: '名称',
      field: 'resource_name',
      type: 'input'
    }, {
      label: '数量',
      field: 'resource_count',
      type: 'input'
    }, {
      label: '位置',
      field: 'resource_position',
      type: 'user-picker',
      group: 2
    }, {
      label: '状态',
      field: 'resource_state',
      type: 'user-picker',
      group: 1
    }],
    count: 0,
    state: [],
    state2: [],
    deleteID: 0,
    showMask: false,
    confirmDelete: false,
    confirmStr: '',
    totalCount: 0,
    startIndex: 0
  },
  onLoad() {
    this.queryData()
    this.queryPosition()
    app.queryOptions(app.javaServer, "resource_state").then((res) => {
      this.setData({
        state: res[0].resource_state.split(",")
      })
    })
  },
  replyLimit(e) {
    this.setData({
      startIndex: e.detail,
    })
    this.queryData()
  },
  // 查询数据
  queryData() {
    app.reqData(app.javaServer, "/resource/select_resource", "GET", {
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
  // 查询位置选项
  queryPosition() {
    app.reqData(app.javaServer, '/resource/select_rosition', null, null, null, null, null).then((res) => {
      let temp = [];
      res.data.forEach(element => {
        temp.push(element.name)
      });

      this.setData({
        state2: temp
      })
    })
  },

  // 存储选中数据
  getData(e) {
    let ele = e
    let that = this;
    if (ele.type == "blur") {
      this.setData({
        update: {
          id: ele.currentTarget.dataset.id,
          field: ele.currentTarget.dataset.label,
          value: ele.detail.value
        }
      })
    } else {
      if (e.currentTarget.dataset.selectorid == "2") {
        this.setData({
          update: {
            field: ele.currentTarget.dataset.label,
            id: ele.currentTarget.dataset.id,
            value: that.data.state2[ele.detail.value]
          }
        })
      } else {
        this.setData({
          update: {
            field: ele.currentTarget.dataset.label,
            id: ele.currentTarget.dataset.id,
            value: that.data.state[ele.detail.value]
          }
        })
      }
    }
    app.reqData(app.javaServer, "/resource/update_resource", "PUT", that.data.update, null, {
      Authorization: app.reqHeader.token,
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
      app.reqData(app.javaServer, "/resource/delete_resource/" + this.data.deleteID, "DELETE", null, null, {
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
  }
})