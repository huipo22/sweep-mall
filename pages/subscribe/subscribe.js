// pages/subscribe/subscribe.js
const app = getApp()
import util from '../../utils/util'
let api = require('../../utils/request').default;
import Toast from '../../dist/vant/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subscribeIndexData: null,
    resourse: app.globalData.imgAddress,
    isShow: false,          // 默认不显示插件
    beginTime: '',
    endTime: '',
    timeGap: null,
    themeColor: '#ffd00a',
    showOverdue: false,      // 默认显示过期时刻，false则隐藏已过期时刻
    calendarType: 'yytime',
    timeSlotList: [],
    Ttid: null,
    selectItem: null,
    subscribeTitle: app.globalData.subscribeTitle
  },
  // 点击显示插件
  btnClick: function (e) {
    const Tid = e.currentTarget.dataset.tid;
    this.setData({
      Ttid: Tid,
      selectItem: e.currentTarget.dataset.item
    })
    //未来时间段
    api.subscribeTime({ shop_id: app.globalData.shopId, tid: Tid }).then(res => {
      if (res.data.code == 1) {
        console.log(res)
        let resultArr = [];
        const subResult = res.data.data
        for (let i in subResult) {
          let obj = {}
          obj.timeStamp = subResult[i] + "000"
          obj.state = 0
          resultArr.push(obj)
        }
        this.setData({
          timeSlotList: resultArr,
          isShow: true,
        })
      }
    })
  },
  __binddaychange() {
    this.weilai(0)
  },
  weilai(status) {
    const Tid = this.data.Ttid
    //未来时间段
    api.subscribeTime({ shop_id: app.globalData.shopId, tid: Tid }).then(res => {
      if (res.data.code == 1) {
        console.log(res)
        let resultArr = [];
        const subResult = res.data.data
        for (let i in subResult) {
          let obj = {}
          obj.timeStamp = subResult[i] + "000"
          obj.state = status
          resultArr.push(obj)
        }
        this.setData({
          timeSlotList: resultArr,
        })
      }
    })
  },
  _yybindchange: function (e) {
    var data = e.detail
    console.log(data)
    if (data.time == "") {
      Toast('请选择时刻');
      return
    }
    let mydata = data.date.split('.').join('/');
    util.navigateTo('../orderConfirm/orderConfirm?date=' + mydata + "&item=" + JSON.stringify(this.data.selectItem))
  },
  _yybindhide: function () {
    console.log('隐藏')
    this.weilai(2)
  },
  // 预览图片
  preview(event) {
    console.log(event)
    let currentUrl = event.currentTarget.dataset.src
    let imgList = []
    imgList.push(currentUrl)
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onReady: function (options) {
    util.isToken()
    util.showLoading()
    // 预约商家信息及餐桌列表 接口
    api.subscribeIndex({ shop_id: app.globalData.shopId }).then(res => {
      if (res.data.code == 1) {
        this.setData({
          beginTime: res.data.data.shop_info.start_time,
          endTime: res.data.data.shop_info.end_time,
          timeGap: res.data.data.shop_info.min,
          subscribeIndexData: res.data.data,
          showOverdue: true,
        })
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function () {

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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

  }
})