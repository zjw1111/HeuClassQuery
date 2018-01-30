//app.js
//BaaS SDK
require('./utils/sdk-v1.1.0');
const clientID = '9adb490f6d8b444da712'

App({
  onLaunch: function () {
    wx.BaaS.init(clientID)

    /*调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    */

    let userId = this.getUserId()
    console.log('***' + userId)
    if (!userId) {
      wx.BaaS.login()
        .then(res => {
          console.log('BaaS is logined!')
        }).catch(err => {
          console.dir(err)
        })
    }
  },

  getUserId() {
    if (this.userId) {
      return this.userId
    }

    this.userId = wx.BaaS.storage.get('uid')
    return this.userId
  },

  getUserInfo() {
    if (this.userInfo) {
      return this.userInfo
    }

    this.userInfo = wx.BaaS.storage.get('userinfo')
    return this.userInfo
  },

/*
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
*/
  

  globalData:{
    userInfo: wx.BaaS.storage.get('userinfo')
  }
})
