// pages/input/input.js
var util = require('../../utils/util.js')
const AV = require('../../utils/av-weapp-min.js');
var AVObject = AV.Object.extend('SHIYAN');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hours: ['13', '14', '15', '16', '17', '18', '19'],
    mins: ['00', '30'],
    url: "zjw1111.wicp.net",

    hiddenToast: true,
    selectPerson: true,
    firstPerson: '--请选择--',
    selectArea: false,
    items: [
      { data: 1, value: '大物实验（上）' },
      { data: 2, value: '大物实验（下）' },
      { data: -1, value: '其他科目实验' },
    ],
    subj: 0,
    class1: [{ name: '暂无数据' }],
    class2: [{ name: '暂无数据' }],
    data: [],
    name: "",
    where: "",
    at: 0,
    date: "",
    time: '08:00',
    DayBegin: "",
    DayEnd: "",
    focus1: false,
    focus2: false
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      subj: e.detail.value,
      selectArea: false,
      selectPerson: true,
      firstPerson: '--请选择--',
      where: "",
      at: 0,
      name: ""
    })
    if (e.detail.value == 1) {
      this.setData({
        data: this.data.class1
      })
    }
    if (e.detail.value == 2) {
      this.setData({
        data: this.data.class2
      })
    }
    if (e.detail.value == -1) {
      this.setData({
        hour: '13',
        min: '00'
      })
    }
  },
  //点击选择类型
  clickPerson: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectArea: true,
        selectPerson: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson: true,
      })
    }
  },

  //点击切换
  mySelect: function (e) {
    this.setData({
      firstPerson: this.data.data[e.target.dataset.me].name,
      name: this.data.data[e.target.dataset.me].name,
      where: this.data.data[e.target.dataset.me].where,
      selectPerson: true,
      selectArea: false,
    })
    console.log(e)
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

  // 获取 实验名称 数据
  loading() {
    let that = this
    try {
      var class1 = wx.getStorageSync('class1');
      var class2 = wx.getStorageSync('class2');
      if (class1 || class2) {
        that.setData({
          class1: class1,
          class2: class2
        })
      }
    } catch (e) {
      // Do something when catch error
    }
  },

  bindInput1: function (e) {
    this.setData({
      name: e.detail.value,
      focus1: false,
      focus2: false
    })
  },
  bindInput2: function (e) {
    this.setData({
      where: e.detail.value,
      focus2: false
    })
  },
  bindInput3: function (e) {
    this.setData({
      at: parseInt(e.detail.value),
      focus1: false
    })
  },
  confirm1: function () {
    this.setData({
      focus1: true
    })
  },
  confirm2: function () {
    this.setData({
      focus2: true
    })
  },

  formSubmit: function (e) {
    var stringTime = this.data.date + "T" + this.data.time + ":00+08:00";
    var time = Date.parse(new Date(stringTime));
    var newDate = new Date();
    newDate.setTime(time);
    var time_str = util.formatTime(newDate);
    time = time / 1000;
    var ee = {
      name: this.data.name,
      where: this.data.where,
      at: this.data.at,
      time: time,
      time_str: time_str
    }
    console.log('form发生了submit事件，携带数据为：', ee)

    var FormID = e.detail.formId;
    console.log(FormID);
    var l = 'https://' + this.data.url + '/formId.php';
    var d = {
      access_token: wx.getStorageSync('token'),
      data: {
        touser: wx.getStorageSync('user').authData.lc_weapp.openid,
        template_id: 'JZ3ntsuPmdhmq4G_nKKluOrciUiaamPns775re5lPZY',//这个是1、申请的模板消息id，
        page: 'pages/BaaS/BaaS',
        form_id: FormID,
        data: {
          "keyword1": {
            "value": ee.name,
            "color": "#000000"
          },
          "keyword2": {
            "value": ee.where,
            "color": "#000000"
          },
          "keyword3": {
            "value": '座位号: '+ee.at,
            "color": "#000000"
          },
          "keyword4": {
            "value": ee.time_str,
            "color": "#ff0000"
          },
        },
        emphasis_keyword: 'keyword1.DATA'
      }
    }
    wx.request({
      url: l,
      data: d,
      method: 'GET',
      success: function (res) {
        console.log(res);
      }
    });

    var todo = new AVObject();
    todo.set(ee);
    todo.save().then(function (todo) {
      // 成功保存之后，执行其他逻辑.
    }, function (error) {
      // 异常处理
    });

    this.setData({
      hiddenToast: !this.data.hiddenToast,
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loading()
    var date = new Date();
    var dayBegin = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(util.formatNumber).join('-');
    var dayEnd = [date.getFullYear() + 1, date.getMonth() + 1, date.getDate()].map(util.formatNumber).join('-');
    this.setData({
      DayBegin: dayBegin,
      DayEnd: dayEnd,
      date: dayBegin
    })
  },
})