const {
  clearLoginInfo
} = require("../../../utils/checkUtils")

const app = getApp()
Page({
  data: {
    body: '',
    header: [{
      label: 'id',
      yield: 'resource_id',
      type: 'input'
    }, {
      label: '名称',
      yield: 'resource_name',
      type: 'input'
    }, {
      label: '数量',
      yield: 'resource_count',
      type: 'input'
    }, {
      label: '位置',
      yield: 'resource_position',
      type: 'user-picker',
      group: 2
    }, {
      label: '状态',
      yield: 'resource_state',
      type: 'user-picker',
      group: 1
    }],
    resource_position: [],
    resource_state: [],
    deleteID: 0,
    // 确认删除
    showMask: false,
    confirmDelete: false,
    confirmStr: '',
    // 分页
    totalCount: 0,
    startIndex: 0,
    // 添加记录
    showModel: false,
    // 提交表单
    stateForSubmit: "请选择资产状态",
    positionForSubmit: "请选择存放位置",
    nameForSubmit: "",
    countForSubmit: "",
    // 总条目数
    totalCount: 12,
    // 字段数
    column_count: 6,
  },
  // 选择器变量转换
  togglePicker(e) {
    const current = e.currentTarget.dataset.yield
    switch (current) {
      case "resource_position":
        this.setData({
          positionForSubmit: this.data.resource_position[e.detail.value]
        })
        break;
      case "resource_state":
        this.setData({
          stateForSubmit: this.data.resource_state[e.detail.value]
        })
        break;
    }
  },
  // 查询位置选项
  queryPosition() {
    app.reqData(app.javaServer, '/base/get_position_options', "GET", null, null, {
      Authorization: app.reqHeader.token,
      'Content-type': app.reqMethod.postForm
    }, null, false).then((res) => {
      if (res.code == "200") {
        let temp = [];
        res.data.forEach(_element => {
          temp.push(_element.position_name)
        });
        this.setData({
          resource_position: temp
        })
      }
    })

    app.reqData(app.javaServer, '/base/get_options', "GET", {
      options_type: 'resource_state'
    }, null, {
      Authorization: app.reqHeader.token,
      'Content-type': app.reqMethod.postForm
    }, null, false).then((res) => {
      this.setData({
        resource_state: res.data[0].resource_state.split(",")
      })
    })
  },
  // 查询资产状态
  queryState() {
    app.queryOptions(app.javaServer, "resource_state").then((res) => {
      this.setData({
        resource_state: res.data[0].resource_state.split(",")
      })
    })
  },
  // 存储选中数据
  getData(e) {
    let ele = e
    let that = this;
    this.setData({
      update: {
        yield: ele.currentTarget.dataset.label,
        id: ele.currentTarget.dataset.id,
        value: that.data.resource_position[ele.detail.value]
      }
    })
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
  // 删除数据
  deleteData(e) {
    this.setData({
      showMask: true,
      deleteID: Number(e.currentTarget.dataset.id)
    })
  },
  // 删除控制框
  inputConfirm(e) {
    this.setData({
      showMask: true,
      confirmStr: e.detail.value
    })
  },
  // 确认删除
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
  // 下拉刷新
  onPullDownRefresh() {
    this.queryData()
    // this.getTotalData()
  },
  // 添加记录
  addNewData() {
    this.setData({
      showModel: true
    })
    this.queryState()
  },
  closeMask() {
    this.setData({
      showModel: false
    })
  },
  // 提交新增按钮
  submitForm(e) {
    let that = this
    let flag = 0
    const _formValue = e.detail.value
    for (const _key in _formValue) {
      if (_formValue[_key] == "") {
        flag = 1
      }
    }
    if (flag == 0) {
      wx.request({
        url: app.javaServer + "/resource/insert_resource",
        method: 'GET',
        dataType: "json",
        data: {
          "resource_name": this.nameForSubmit,
          "resource_count": this.countForSubmit,
          "resource_position": this.positionForSubmit,
          "resource_state": this.stateForSubmit
        },
        header: {
          Authorization: app.reqHeader.token
        },
        success(res) {
          if (res.data.code == 200) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            that.setData({
              showModel: false
            })
          } else {
            wx.showToast({
              title: '添加失败',
              icon: 'none'
            })
          }
        },
      })
    } else {
      console.log('no')
      wx.showToast({
        title: '添加失败，请填写所有项目!',
        icon: 'none'
      })
      flag = 0
    }

  },
  // 获取数据总条目数
  getTotalData() {
    app.reqData(app.javaServer, "/base/get_data_total_count", "GET", {
      type: "resource"
    }, null, {
      Authorization: app.reqHeader.token
    }, null, false).then(res => {
      this.setData({
        totalCount: Number(res.data)
      })
    })
  },
  // 分页
  changePage(e) {
    app.reqData(app.javaServer, "/resource/select_resource", "GET", {
      startIndex: e.currentTarget.dataset.limit,
      endIndex: e.currentTarget.dataset.limit + 12
    }, null, {
      Authorization: app.reqHeader.token
    }, null, true).then((res) => {
      this.setData({
        body: res.data.data,
      })
    })
  },
  // 查询数据
  queryData() {
    app.reqData(app.javaServer, "/resource/select_resource", "GET", {
      startIndex: this.data.startIndex,
      endIndex: this.data.startIndex + 12
    }, null, {
      Authorization: app.reqHeader.token
    }, null, true).then((res) => {
      this.setData({
        body: res.data.data,
      })
    })
    wx.stopPullDownRefresh()
  },
  // 初始化
  onLoad() {
    this.queryData()
    this.queryPosition()
    this.getTotalData()
    app.checkLoginState()
  },
  replyLimit(e) {
    this.setData({
      startIndex: e.detail,
    })
    this.queryData()
  },
})