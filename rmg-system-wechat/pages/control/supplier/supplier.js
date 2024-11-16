const app = getApp()
Page({
  data: {
    body: '',
    header: [{
        label: 'id',
        field: 'suppliers_id',
        type: 'input'
      },
      {
        label: '名称',
        field: 'suppliers_name',
        type: 'input'
      },
      {
        label: '联系电话',
        field: 'suppliers_phone',
        type: 'input'
      }, {
        label: '电子邮件',
        field: 'suppliers_email',
        type: 'input'
      }, {
        label: '联系地址',
        field: 'suppliers_address',
        type: 'input'
      }, {
        label: '描述',
        field: 'suppliers_description',
        type: 'input'
      }, {
        label: '所属国家(地区)',
        field: 'suppliers_country',
        type: 'input'
      }
    ],
    count: 0,
    update: '',
    deleteID: 0,
    showMask: false,
    confirmDelete: false,
    confirmStr: '',
    totalCount: 0,
    startIndex: 0
  },
  onLoad() {
    this.queryData()
  },
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
      this.setData({
        update: {
          field: ele.currentTarget.dataset.label,
          id: ele.currentTarget.dataset.id,
          value: that.data.prickerArr[ele.detail.value]
        }
      })
    }
    app.reqData(app.javaServer, "/suppliers/update_suppliers", "PUT", that.data.update, null, {
      Authorization: app.reqHeader.token,
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
      app.reqData(app.javaServer, "/suppliers/delete_suppliers/" + this.data.deleteID, "DELETE", null, null, {
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
  replyLimit(e) {
    this.setData({
      startIndex: e.detail,
    })
    this.queryData()
  },
  queryData() {
    app.reqData(app.javaServer, "/suppliers/select_suppliers", "GET", {
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
  onPullDownRefresh() {
    this.queryData()
  },
})