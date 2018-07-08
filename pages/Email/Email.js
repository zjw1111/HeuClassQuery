// pages/Email/Email.js
const AV = require('../../utils/av-weapp-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenToast: true,
    email: ""
  },

  // toast显示时间到时处理业务
  toastHidden: function () {
    this.setData({
      hiddenToast: true
    })
  },

  bindInput1: function (e) {
    this.setData({
      email: e.detail.value,
    })
  },
  formSubmit: function () {
    var that = this;
    var todo = AV.Object.createWithoutData('_User', wx.getStorageSync('user').objectId);
    todo.set('email', this.data.email == '' ? null : this.data.email);
    todo.save().then(function (todo) {
      that.setData({
        hiddenToast: !that.data.hiddenToast,
      })
      AV.User.loginWithWeapp().then(user => {
        wx.setStorage({
          key: "user",
          data: user
        })
      }).catch(console.error);

    }, function (error) {
      wx.showModal({
        title: '提示',
        content: '输入的邮箱地址格式有误，请检查重试，或更换其他邮箱再试！',
        showCancel: false
      })
    });
  }
})