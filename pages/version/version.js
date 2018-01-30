// pages/version/version.js
// 获取应用实例
let app = getApp();
let wxParser = require('../../wxParser/index');

Page({
  data: {
    html: "0000",
    title: ""
  },

  btntap: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  onLoad: function () {
    let that = this;

    // 获取 内容ID 为 1480 的内容详情
    let richTextID = 1480;
    let objects = { richTextID };
    wx.BaaS.getContent(objects).then((res) => {
      // success
      that.setData({
        html: res.data.content,
        title: res.data.title
      })
      wxParser.parse({
        bind: 'richText',
        html: that.data.html,
        target: that,
        enablePreviewImage: true,
        tapLink: (url) => {
          wx.navigateTo({
            url
          })
        }
      });
    }, (err) => {
      // err
    });

  }
})
