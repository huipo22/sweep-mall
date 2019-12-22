// pages/mySubscribe/mySubscribe.js
const app = getApp()
import util from '../../utils/util'
let api = require('../../utils/request').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subscribeActive: 1,
    subscribeListTab: [
      {
        name: 1,
        title: "已预约"
      },
      {
        name: 2,
        title: "已消费"
      },
      {
        name: 0,
        title: "已取消"
      },
    ],
    reserveList: [],
  },
  // 预约页面状态更改
  subscribeChange(event) {
    this.setData({
      subscribeActive: event.detail.name
    })
    console.log(event)
    const statusName = event.detail.name
    this.reserveList(statusName)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.status) {
      this.setData({
        subscribeActive: Number(options.status)
      })
      this.reserveList(this.data.subscribeActive)
    } else {
      this.reserveList(1)
    }
  },
  // 关闭预约状态
  cancelStatus(e) {
    const id = e.currentTarget.dataset.id;
    api.doStatus({ reserve_id: id }).then((res) => {
      console.log(res)
      if(res.data.code==1){
        this.setData({
          subscribeActive: 0
        })
        this.reserveList(0)
      }
    })
  },
  // 预约列表
  reserveList(statusName) {
    api.myReserve({
      shop_id: app.globalData.shopId,
      status: statusName
    }, {
      Token: wx.getStorageSync('token'),
      "Device-Type": 'wxapp',
    }).then((res) => {
      if (res.data.code == 1) {
        this.setData({
          reserveList: res.data.data
        })
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
    wx.switchTab({
      url: '../person/person',
    });
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