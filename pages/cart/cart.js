// pages/cart/cart.js
const app = getApp()
import util from '../../utils/util'
let api = require('../../utils/request').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    checkedAll: true,
    recommendList: null,
    resourse: app.globalData.imgAddress,
    cartList: null,
  },
  onChange(event) {
    this.setData({
      result: event.detail
    });
  },
  // 商品数量-
  minusGood(target) {
    const goodId = target.currentTarget.dataset.goodid
    let header = {
      Token: wx.getStorageSync('token'),
      "Device-Type": 'wxapp',
      'content-type': 'application/x-www-form-urlencoded'
    }
    let params = {
      id: goodId,
      type: 3,
      num: target.detail
    }
    api.actionShop(params, header).then((res) => {
      return
      if (res.data.code == 1) {
        this.setData({

        })
      }
    })
  },
  // 商品数量+
  plusGood(target) {
    console.log(target)
    const goodId = target.currentTarget.dataset.goodid
    const goodNum = target.currentTarget.dataset.goodnum
    let header = {
      Token: wx.getStorageSync('token'),
      "Device-Type": 'wxapp',
      'content-type': 'application/x-www-form-urlencoded'
    }
    let params = {
      id: goodId,
      type: 2,
      num: goodNum
    }
    api.actionShop(params, header).then((res) => {
      return
      if (res.data.code == 1) {
        this.setData({

        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 为你推荐
    let data = {
      shop_id: app.globalData.shopId,
      type: 4,
      page: 1
    }
    api.guess(data).then((res) => {
      if (res.data.code == 1) {
        this.setData({
          recommendList: res.data.data,
        })
      }
    })
    let params = {
      shop_id: app.globalData.shopId,
    }
    let header = {
      Token: wx.getStorageSync('token'),
      "Device-Type": 'wxapp',
    }
    // 购物车查询
    api.getShop(params, header).then((res) => {
      if (res.data.code == 1) {
        this.setData({
          cartList: res.data.data,
        })
      }
    })
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