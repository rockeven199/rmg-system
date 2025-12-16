const app = getApp()
Page({
  data: {
    body: '',
    header: [{
      label: "id",
      yield: 'employee_id',
      type: 'input'
    }, {
      label: "姓名",
      yield: "employee_name",
      type: 'input'
    }, {
      label: "年龄",
      yield: "employee_age",
      type: 'input'
    }, {
      label: "性别",
      yield: "employee_sex",
      type: 'user-picker',
      group: 1
    }, {
      label: "联系地址",
      yield: "employee_address",
      type: 'input'
    }, {
      label: "总工作时长(小时)",
      yield: "employee_worked_time",
      type: 'input'
    }, {
      label: "主管部门",
      yield: "employee_department",
      type: 'user-picker',
      group: 2
    }, {
      label: "下级部门",
      yield: "employee_second_department",
      type: 'user-picker',
      group: 3
    }, {
      label: "岗位",
      yield: "employee_job",
      type: 'input'
    }, {
      label: "员工级别",
      yield: "employee_level",
      type: 'user-picker',
      group: 4
    }, {
      label: "联系电话",
      yield: "employee_phone",
      type: 'input'
    }, {
      label: "证件号",
      yield: "employee_card_id",
      type: 'input'
    }, {
      label: "电子邮箱",
      yield: "employee_email",
      type: 'input'
    }],
    count: 0,
    update: {},
    state: [],
    state2: [],
    state3: [],
    state4: [],
    totalCount: 0,
    startIndex: 0
  },
  onLoad() {
    this.queryData()
    app.checkLoginState()
    app.queryOptions(app.javaServer, "top_department").then((res) => {
      this.setData({
        state: res.data[0].top_department.split(",")
      })
    })
    app.queryOptions(app.javaServer, "sub_department").then((res) => {
      this.setData({
        state2: res.data[0].sub_department.split(",")
      })
    })
    app.queryOptions(app.javaServer, "employee_level").then((res) => {
      this.setData({
        state3: res.data[0].employee_level.split(",")
      })
    })
    app.queryOptions(app.javaServer, "gender").then((res) => {
      this.setData({
        state4: res.data[0].gender.split(",")
      })
    })
  },
  replyLimit(e) {
    this.setData({
      startIndex: e.detail,
    })
    this.queryData()
  },
  queryData() {
    app.reqData(app.javaServer, "/employee/select_employee", "POST", {
      startIndex: Number(this.data.startIndex),
      endIndex: Number(this.data.startIndex) + 12
    }, null, {
      Authorization: app.reqHeader.token,
      'content-type': app.reqMethod.postForm
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
    let that = this;
    if (e.type == "blur") {
      this.setData({
        update: {
          id: e.currentTarget.dataset.id,
          yield: e.currentTarget.dataset.label,
          value: e.detail.value
        }
      })
    } else {
      this.setData({
        update: {
          yield: e.currentTarget.dataset.label,
          id: e.currentTarget.dataset.id,
          value: that.data[e.currentTarget.dataset.group][e.detail.value]
        }
      })
    }
    app.reqData(app.javaServer, "/employee/update_employee", "PUT", this.data.update, null, {
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
      app.reqData(app.javaServer, "/employee/delete_employee/" + this.data.deleteID, "DELETE", null, null, {
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
})