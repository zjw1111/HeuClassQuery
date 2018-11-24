//app.js
const mtjwxsdk = require('./utils/mtj-wx-sdk.js');
const AV = require('./utils/av-weapp-min.js');
const clientID = '9adb490f6d8b444da712'

// LeanCloud 应用的 ID 和 Key
AV.init({
  appId: 'JlzVT3CwIaCukJfMBqcpy1pb-gzGzoHsz',
  appKey: 'Rpje309gybmOx43HuKWHnq3n',
});

App({
  onLaunch: function () {
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

  globalData:{
  }
})
