// pages/person.js
const app = getApp()
import util from '../../utils/util'
let api = require('../../utils/request').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    userData:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app)
    this.setData({
      userInfo: app.globalData.userInfo
    })
    api.userInfo({},{
      Token: wx.getStorageSync('token'),
      "Device-Type": 'wxapp',
    }).then((res) => {
      if (res.data.code == 1) {
        this.setData({
          userData: res.data.data
        })
      }
    })
  },
  call() {
    wx.makePhoneCall({
      phoneNumber: '18510841995', //
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
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