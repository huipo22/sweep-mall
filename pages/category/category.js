// pages/category/category.js
const app = getApp()
import util from '../../utils/util'
let api = require('../../utils/request').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [],//总分类
    goodsList: [],//分类内容
    popupShow: false,//底部弹框
    active: 0,
    activeItem: {},
    resourse: app.globalData.imgAddress,
    // goodNum: 1,
  },
  // 搜索事件=>跳转页面
  searchTap() {
    util.navigateTo("../search/search")
  },
  // 左侧点击事件
  categoryNav(e) {
    const cateId = e.currentTarget.dataset.cateid;
    this.getGoods(cateId)

  },
  // 商品详情
  detailPage(e) {
    const goodId = e.currentTarget.dataset.goodid
    util.navigateTo('../detail/detail?goodId=' + goodId)
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
        util.queryCart()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 二维码参数
    util.sceneName(options)
    util.showLoading()
    // 总分类
    api.category({ shop_id: app.globalData.shopId }).then(res => {
      console.log(res)
      if (res.data.code == 1) {
        // 获取分类[0]内容
        const firstId = res.data.data[0].id;
        this.getGoods(firstId)
        this.setData({
          categoryList: res.data.data
        })
        wx.hideLoading();
      }
    })
  },
  // 分类列表
  getGoods(cateId) {
    api.getGoods({ shop_id: app.globalData.shopId, category_id: cateId }).then(res => {
      if (res.data.code == 1)
        this.setData({
          goodsList: res.data.data
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