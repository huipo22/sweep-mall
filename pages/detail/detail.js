// pages/detail/detail.js
const app = getApp()
import util from '../../utils/util'
let api = require('../../utils/request').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodDetail: null,
    resourse: app.globalData.imgAddress,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const goodId = options.goodId;
    // 商品详情
    api.getGoodDetail({ shop_id: app.globalData.shopId, goods_id: goodId }).then(res => {
      if (res.data.code == 1)
        var rich = res.data.data.goods_detail.replace(/\<p><img/gi, '<img class="richImg" ')
      this.setData({
        goodDetail: res.data.data,
        rich: rich
      })
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