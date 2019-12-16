// pages/myorder/myorder.js
const app = getApp()
import util from '../../utils/util'
let api = require('../../utils/request').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderActive: 1,
    orderListTab: [
      {
        name: 1,
        title: "线上订单"
      },
      {
        name: 2,
        title: "线下订单"
      },
    ],
    resourse: app.globalData.imgAddress,
    orderListData: []
  },
  // 订单选项卡改变事件
  orderChange(event) {
    console.log(event)
    const paymentType = event.detail.name
    this.setData({
      orderActive: event.detail.name
    })
    this.loadOrdernData(paymentType)
  },
  // 加载订单数据
  loadOrdernData(paymentType) {
    api.orderStatus({
      shop_id: app.globalData.shopId,
      payment_type: paymentType
    }, {
      Token: wx.getStorageSync('token'),
      "Device-Type": 'wxapp',
    }).then((res) => {
      if (res.data.code == 1) {
        this.setData({
          orderListData: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      orderActive: options.active
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