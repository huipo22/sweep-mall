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
    popupShow: false,//底部弹框
    activeItem: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showLoading()
    const goodId = options.goodId;
    // 商品详情
    api.getGoodDetail({ shop_id: app.globalData.shopId, goods_id: goodId }).then(res => {
      if (res.data.code == 1)
        var rich = res.data.data.goods_detail.replace(/\<p><img/gi, '<img class="richImg" ')
      this.setData({
        goodDetail: res.data.data,
        rich: rich
      })
      wx.hideLoading();
    })
  },
  // 商品弹框
  showPopup(e) {
    console.log(e)
    const dataObj = e.currentTarget.dataset.item
    dataObj.goodNum = 1;//默认商品数量
    this.setData({
      popupShow: true,
      activeItem: dataObj
    })
  },
  // 关闭商品导航
  onClose() {
    this.setData({
      popupShow: false
    })
  },
  // 商品数量改变
  goodNumChange(target) {
    const goodData = this.data.activeItem;
    goodData.goodNum = target.detail
    setTimeout(() => {
      this.setData({ activeItem: goodData });
    }, 0);
  },
  // 添加购物车事件
  addShopEvent() {
    let header = {
      Token: wx.getStorageSync('token'),
      "Device-Type": 'wxapp',
      'content-type': 'application/x-www-form-urlencoded'
    }
    let data = {
      num: this.data.activeItem.goodNum,
      shop_id: app.globalData.shopId,
      goods_id: this.data.activeItem.id
    }
    api.addShop(data, header).then(res => {
      if (res.data.code == 1) {
        util.showToastSuccess('加入购物车成功')
        this.setData({
          popupShow: false
        })
      }
    })
  },
  // 创建订单事件 --> 跳转订单页orderConfirm   s/''
  onSubmitPage() {
    console.log(456454654)
    const detail=this.data.goodDetail;
    console.log(detail)
    const select = {
        goods_id: detail.id,
        present_price: detail.present_price,
        num: detail.num
    }
    util.navigateTo('../orderConfirms/orderConfirms?orderList=' + JSON.stringify(select))
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