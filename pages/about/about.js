//index.js
//获取应用实例
var flag = true;
var color = ""
var ID = 0;
var app = getApp()
Page({
  data: {
    width: 0
  },

  btntap: function () {
    wx.navigateTo({
      url: '../help/help',
    })
  },
  btntap2: function () {
    wx.showModal({
      title: '免责声明',
      content: '因本程序造成的实验忘做，开发者概不负责。',
      showCancel: false,
    })
  },
  btntap3: function () {
    wx.showModal({
      title: '意见反馈',
      content: '点击右上角【更多】-【关于】，然后关注公众号进行意见反馈。',
      showCancel: false,
    })
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        that.setData({
          width: res.screenWidth
        })
      }
    })
    
  }
})
