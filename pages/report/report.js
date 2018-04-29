// 获取应用实例
let app = getApp();
const AV = require('../../utils/av-weapp-min.js');
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

  onLoad: function (option) {
    let that = this;

    new AV.Query('BAOGAO')
      .equalTo('title', option.name)
      .find()
      .then(res => {
        that.setData({
          html: res[0].attributes.content,
          title: res[0].attributes.title
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
      })
      .catch(err => {
        console.log("eeeeeeerror")
        new AV.Query('richtext')
          .get('5ae5e59117d0090066febbcc')
          .then(function (res) {
            that.setData({
              html: res.attributes.content,
              title: res.attributes.title
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
          });
      });
  }
})
