// pages/orderConfirms/orderConfirms.js
const app = getApp()
import util from '../../utils/util'
import md5 from '../../utils/md5.js';
let api = require('../../utils/request').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderConfirmData: null,
    resourse: app.globalData.imgAddress,
    remark: null,
  },
  // 留言
  remarkChange(event) {
    this.setData({
      remark: event.detail.value
    })
  },
  // 封装支付事件
  pay(type) {
    const payData = this.data.orderConfirmData;
    const params = {
      order_id: payData.order_id,
      pay_price: payData.price,
      pay_type: type,//type为1线上  type为2线下
      remark: this.data.remark
    }
    api.orderPay(params, {
      Token: wx.getStorageSync('token'),
      "Device-Type": 'wxapp',
    }).then((res) => {
      if (res.data.code == 0) {
        // util.navigateTo("../mySubscribe/mySubscribe")
        const subscribePay = res.data.data;//预约统一下单数据
        let paySign = md5.hexMD5('appId=' + subscribePay.appid + '&nonceStr=' + subscribePay.nonce_str + '&package=' + subscribePay.prepay_id + '&signType=MD5&timeStamp=' + subscribePay.timeStamp + "&key=z6TBQUbGKzmO8ligVMteboqs4kUSy49d").toUpperCase();
        // 预约支付
        wx.requestPayment({
          'timeStamp': subscribePay.timeStamp + "",
          'nonceStr': subscribePay.nonce_str,
          'package': subscribePay.prepay_id,
          'signType': 'MD5',
          'paySign': paySign,
          success(res) {
            console.log('调用支付接口成功', res)
            util.navigateTo('../myorder/myorder')
          },
          fail(res) {
            console.log('调用支付接口fail', res)
            util.navigateTo('../myorder/myorder')
          }
        })
      }
    })
  },
  // 线上支付事件
  submitOnline() {
    this.pay(1)
  },
  // 线下支付事件
  submitUnderline() {
    this.pay(2)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const orderSelect = JSON.parse(options.orderList)
    this.loadOrderData(orderSelect)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  loadOrderData(orderSelect) {
    //生成订单数据接口  cart结算  详情支付
    api.orderCreat(orderSelect, {
      Token: wx.getStorageSync('token'),
      "Device-Type": 'wxapp',
    }).then(res => {
      if (res.data.code == 1) {
        this.setData({
          orderConfirmData: res.data.data
        })
      }
    })
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