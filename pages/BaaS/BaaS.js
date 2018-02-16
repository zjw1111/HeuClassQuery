// pages/BaaS/BaaS.js
var util = require('../../utils/util.js')
var bmap = require('../../utils/bmap-wx.min.js')
const AV = require('../../utils/av-weapp-min.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    time: [],
    height: 500,
    hiddenToast: true,
    WeatherHidden: false,
    getlocation: null,
    now: parseInt(Date.now() / 1000),
    weatherData: "天气正在加载中...",
    url1: "../../image/loading.gif",
    url2: "../../image/loading.gif"
  },

  // toast显示时间到时处理业务
  toastHidden: function () {
    this.setData({
      hiddenToast: true
    })
  },

  // 获取 已选实验列表 数据
  loading() {
    let that = this
    new AV.Query('SHIYAN')
      .ascending('time')
      .limit(50)
      .greaterThanOrEqualTo('time', parseInt(Date.now() / 1000 - 777600))
      .find()
      .then(res => {
        this.setData({
          listData: res
        })
        var newDate = new Date();
        var time = [];
        var length = this.data.listData.length
        for (var i = 0; i < length; i++) {
          newDate.setTime(this.data.listData[i].attributes.time * 1000)
          time[i] = util.formatTime(newDate)
        }
        that.setData({
          time: time
        })
      })
      .catch(console.error);

    that.loading2()
  },


  // 获取 实验名称 数据
  loading2() {
    let that = this
    new AV.Query('SETTING')
      .equalTo('mark', 'a')
      .find()
      .then(class1 => {
        wx.setStorage({
          key: "class1",
          data: class1
        })
      })
      .catch(console.error);

    new AV.Query('SETTING')
      .equalTo('mark', 'b')
      .find()
      .then(class2 => {
        wx.setStorage({
          key: "class2",
          data: class2
        })
      })
      .catch(console.error);

    new AV.Query('SETTING')
      .equalTo('mark', 'url')
      .find()
      .then(url => {
        wx.setStorage({
          key: "url",
          data: url[0]
        })
      })
      .catch(console.error);
  },

  weather() {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'kBRf5PWtQk6YNGvKLjb9cuFGkGXM11Xq'
    });
    var fail = function (data) {
      console.log('fail!!!!')
      that.setData({
        WeatherHidden: !that.data.WeatherHidden,
        getlocation: 'getlocation'
      })
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      var date = weatherData.date.split(" ");
      var url1 = data.originalData.results[0].weather_data[0].dayPictureUrl;
      var url2 = data.originalData.results[0].weather_data[0].nightPictureUrl
      weatherData = weatherData.currentCity + '今日天气' + date[2] + '\n' + weatherData.weatherDesc + ' ' + weatherData.temperature;
      that.setData({
        weatherData: weatherData,
        url1: url1,
        url2: url2
      });
    }
    BMap.weather({
      fail: fail,
      success: success
    });
  },

  getlocation() {
    var that = this
    wx.openSetting({
      success: (res) => {
        that.setData({
          WeatherHidden: !that.data.WeatherHidden,
          getlocation: null
        })
        that.weather()
        console.log(that.data.WeatherHidden)
      }
    })
  },

  longtap: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['删除实验'],
      success: function (res) {
        if (res.tapIndex == 0) {
          wx.showModal({
            title: '删除实验',
            content: '你确定要删除实验【' + that.data.listData[e.target.dataset.id].attributes.name + '】吗？',
            success: function (res) {
              if (res.confirm) {
                var todo = AV.Object.createWithoutData(
                  'SHIYAN',
                  that.data.listData[e.target.dataset.id].id
                );
                todo.destroy().then(function (success) {
                  // 删除成功
                  that.setData({
                    hiddenToast: !that.data.hiddenToast
                  })
                  that.loading()
                }, function (error) {
                  // 删除失败
                });
              }
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad")
    this.weather()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
    var that = this;
    // wx.getSystemInfo({
    //   success: function (res) {
    //     console.log(res.windowHeight)
    //     that.setData({
    //       height: res.windowHeight * 750 / res.screenWidth
    //     })
    //   }
    // })
    setTimeout(function () {
      var query = wx.createSelectorQuery()
      query.select('.getheight').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        console.log(parseInt(res[0].height));
        that.setData({
          height: res[0].height * 750 / res[0].width
        })
      })
    }, 150);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow")
    this.loading()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(() => {
      this.loading()
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})