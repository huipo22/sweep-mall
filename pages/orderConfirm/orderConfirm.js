// pages/orderConfirm/orderConfirm.js
const app = getApp()
import util from '../../utils/util'
let api = require('../../utils/request').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remark: '',// 商家留言
    sub_time: '',//预约时间
    sub_name: '',//预约人
    sub_mobile: '',//预约电话
    Item: null,
    resourse: app.globalData.imgAddress,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const date = options.date;
    const item = JSON.parse(options.item);
    this.setData({
      sub_time: date,
      Item: item,
    })
  },
  // 留言
  remarkChange(event) {
    this.setData({
      remark: event.detail.value
    })
  },
  // 姓名
  nameChange(event) {
    console.log(event)
    this.setData({
      sub_name: event.detail.value
    })
  },
  // 手机号
  mobileChange(event) {
    this.setData({
      sub_mobile: event.detail.value
    })
  },
  // 提交事件
  submitSubscribe() {
    const data = this.data;
    const params = {
      shop_id: app.globalData.shopId,
      reserve_price: data.Item.reserve_price,
      ramark: data.remark,
      reserve_name: data.Item.reserve_name,
      reserve_mobile: data.sub_mobile,
      reserve_time: data.date,
      tid: data.Item.id,
    }
    // 预约动作接口
    api.subscribeAction(params, {
      Token: wx.getStorageSync('token'),
      "Device-Type": 'wxapp',
    }).then((res) => {
      if (res.data.code == 1) {
        return
      }
    })
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