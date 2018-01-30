// pages/Feedback/Feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableID_Feedback: 918,
    hiddenToast: true,
    tel_qq: "",
    feedback: "",
    focus1: false
  },

  // toast显示时间到时处理业务
  toastHidden: function () {
    this.setData({
      hiddenToast: true
    })
  },

  click: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  bindInput1: function (e) {
    this.setData({
      tel_qq: e.detail.value,
      focus1: false
    })
  },
  bindInput2: function (e) {
    this.setData({
      feedback: e.detail.value
    })
  },
  confirm1: function () {
    this.setData({
      focus1: true
    })
  },

  formSubmit: function () {
    var e = {
      tel_qq: this.data.tel_qq,
      feedback: this.data.feedback,
    }
    console.log('form发生了submit事件，携带数据为：', e)

    // 向 tableID 为 this.data.tableID (918) 的数据表插入一条记录
    let tableID = this.data.tableID_Feedback
    let objects = {
      tableID,
      data: e
    }
    wx.BaaS.createRecord(objects).then((res) => {
      // success
    }, (err) => {
      // err
    })

    this.setData({
      hiddenToast: !this.data.hiddenToast,
      tel_qq: "",
      feedback: ""
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

})