//app.js
const AV = require('./utils/av-weapp-min.js');
const clientID = '9adb490f6d8b444da712'

// LeanCloud 应用的 ID 和 Key
AV.init({
  appId: 'JlzVT3CwIaCukJfMBqcpy1pb-gzGzoHsz',
  appKey: 'Rpje309gybmOx43HuKWHnq3n',
});

App({
  onLaunch: function () {
    /*调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    */

    if (!wx.getStorageSync('user')) {
      AV.User.loginWithWeapp().then(user => {
        wx.setStorage({
          key: "user",
          data: user
        })
      }).catch(console.error);
    }


    wx.request({
      url: 'https://zjw1111.wicp.net/token.php',
      method: 'GET',
      success: function (res) {
        console.log(res);
        wx.setStorage({
          key: 'token',
          data: res.data.access_token,
        })
      }
    })
  },

  // getUserInfo() {
  //   if (this.userInfo) {
  //     return this.userInfo
  //   }

  //   this.userInfo = wx.BaaS.storage.get('userinfo')
  //   return this.userInfo
  // },

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
  }
})
