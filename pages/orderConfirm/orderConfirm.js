// pages/orderConfirm/orderConfirm.js
const app = getApp()
import util from '../../utils/util'
import md5 from '../../utils/md5.js';
let api = require('../../utils/request').default;
import Toast from '../../dist/vant/toast/toast';
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
    if (data.sub_name == "") {
      Toast("请输入预约人姓名")
    } else if (data.sub_mobile == "") {
      Toast("请输入预约人联系电话")
    } else {
      const params = {
        shop_id: app.globalData.shopId,
        reserve_price: data.Item.reserve_money,
        ramark: data.remark,
        reserve_name: data.sub_name,
        reserve_mobile: data.sub_mobile,
        reserve_time: new Date(data.sub_time).getTime() / 1000,
        tid: data.Item.id,
      }
      // 预约动作接口
      api.subscribeAction(params, {
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
              util.navigateTo('../mySubscribe/mySubscribe?status=1')
            },
            fail(res) {
              console.log('调用支付接口fail', res)
              return
              // util.navigateTo('../mySubscribe/mySubscribe?status=1')
            }
          })
        } else if (res.data.code == 1) {
          util.showToastSuccess(res.data.msg)
          util.navigateTo('../mySubscribe/mySubscribe?status=1')
        }
      })
    }
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