// pages/mycoupon/mycoupon.js
const app = getApp()
import util from '../../utils/util'
let api = require('../../utils/request').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponActive: "1",
    couponData: [],//优惠券数据
    couponList: [
      {
        name: "1",
        title: "未使用"
      },
      {
        name: "2",
        title: "已使用"
      },
      {
        name: "3",
        title: "已过期"
      }
    ]
  },
  // 优惠券选项卡改变事件
  couponChange(event) {
    console.log(event)
    const statusName = event.detail.name
    this.setData({
      couponActive:event.detail.name
    })
    this.loadCouponData(statusName)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  loadCouponData(status) {
    //我的优惠券
    api.myCoupon({ shop_id: app.globalData.shopId, status: status }, {
      Token: wx.getStorageSync('token'),
      "Device-Type": 'wxapp',
    }).then(res => {
      if (res.data.code == 1) {
        this.setData({
          couponData: res.data.data.list
        })
      }
    })
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.loadCouponData(this.data.couponActive)
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