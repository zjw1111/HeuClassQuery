// pages/input/input.js
// 页面最前为测试用函数
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hours: ['13', '14', '15', '16', '17', '18', '19'],
    hour: '13',
    mins: ['00', '30'],
    min: '00',
    value: [0, 0],

    tableID: 247,
    tableID_Setting: 246,
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

  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      hour: this.data.hours[val[0]],
      min: this.data.mins[val[1]],
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      subj: e.detail.value,
      selectArea: false,
      selectPerson: true,
      firstPerson: '--请选择--'
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

  // 获取 formId
  getFormId(e) {
    console.log(e.detail.formId);
    var FormID = e.detail.formId;
    console.log(FormID);
    wx.BaaS.wxReportTicket(FormID);
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
    var class1 = wx.BaaS.storage.get('class1');
    var class2 = wx.BaaS.storage.get('class2');
    that.setData({
      class1: class1,
      class2: class2
    })
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

  formSubmit: function () {
    var stringTime = this.data.date + "T" + this.data.time + ":00+08:00";
    var time = Date.parse(new Date(stringTime));
    // this.test_data("strtime: " + stringTime + "\n && \n unixtime", time / 1000);
    var newDate = new Date();
    newDate.setTime(time);
    var time_str = util.formatTime(newDate);
    time = time / 1000;
    var e = {
      name: this.data.name,
      where: this.data.where,
      at: this.data.at,
      time: time,
      time_str: time_str
    }
    console.log('form发生了submit事件，携带数据为：', e)

    // 向 tableID 为 this.data.tableID (247) 的数据表插入一条记录
    let tableID = this.data.tableID
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
      firstPerson: '--请选择--',
      date: this.data.DayBegin,
      time: "08:00",
      where: "",
      at: 0,
      name: ""
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    // this.test_data("date", this.data.date)
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
    // this.test_data("time", this.data.time)
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
    // this.test_data("date", this.data.date)
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  // 测试用函数
  test_data: function (str, e) {
    str = str + ": " + e;
    console.log(str);

    // 向 tableID 为 2282 的数据表插入一条记录
    let tableID = 2282
    let Product = new wx.BaaS.TableObject(tableID)
    let product = Product.create()

    // 设置方式一
    let event = {
      testdata: str
    }
    product.set(event).save().then((res) => {
      // success
    }, (err) => {
      // err
    })


  }

})