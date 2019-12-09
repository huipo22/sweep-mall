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
    selectList: [],
    checkedAll: true,
    recommendList: null,
    resourse: app.globalData.imgAddress,
    cartList: null,
    totalPrice: 0
  },
  // check 事件
  onChange(event) {
    this.setData({
      result: event.detail,
    });
    if (event.detail.length == 0) {
      this.setData({
        totalPrice: 0
      })
    }
    const resultData = this.data.result
    let resultArr = []
    for (let i in resultData) {
      if (resultData[i]) {
        let obj = resultData[i].split('-');
        let objData = {}
        objData.goods_id = obj[0]
        objData.original_price = obj[1]
        objData.num = obj[2]
        resultArr.push(objData)
        // 计算价格接口
        api.createPrice(resultArr, {
          Token: wx.getStorageSync('token'),
          "Device-Type": 'wxapp',
        }).then((res) => {
          if (res.data.code == 1) {
            this.setData({
              totalPrice: res.data.data.price * 100
            })
          }
        })
      }
    }
    this.setData({
      selectList: resultArr,
    })

  },
  // 全选事件更改
  allSelectChange(event) {
    this.setData({
      checkedAll: event.detail
    })
    if (event.detail == false) {
      this.setData({
        result: [],
        selectList: [],
        totalPrice: 0
      })
    } else {
      this.loadPrice()
    }
  },
  // 商品数量+-
  goodChange(target) {
    const goodId = target.currentTarget.dataset.goodid
    const cartData = this.data.cartList
    for (let i in cartData) {
      if (cartData[i].id == goodId) {
        cartData[i].num = target.detail
      }
    }
    if (target.detail == 0) {
      for (let i in cartData) {
        if (cartData[i].id == goodId) {
          util.arrayRemoveItem(cartData, cartData[i])
        }
      }
      // 删除接口 价格=0
      api.actionShop({
        id: goodId,
        type: 3,
        num: target.detail
      }, {
        Token: wx.getStorageSync('token'),
        "Device-Type": 'wxapp',
        'content-type': 'application/x-www-form-urlencoded'
      }).then((res) => {
        if (res.data.code == 1) {
          this.setData({
            cartList: cartData,
            totalPrice: 0
          })
        }
      })
    } else {
      // 更改接口
      api.actionShop({
        id: goodId,
        type: 1,
        num: target.detail
      }, {
        Token: wx.getStorageSync('token'),
        "Device-Type": 'wxapp',
        'content-type': 'application/x-www-form-urlencoded'
      }).then((res) => {
        if (res.data.code == 1) {
          this.setData({
            cartList: cartData
          })
        }
      })
    }
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
  loadPrice() {
    // 全选
    const resultData = this.data.cartList;
    let resultArr = []
    let resultDefault = []
    for (let i in resultData) {
      let objData = {};
      let defaultObj = {}
      objData.goods_id = resultData[i].goods_id
      objData.original_price = resultData[i].original_price
      objData.num = resultData[i].num
      resultArr.push(objData)
      defaultObj = resultData[i].goods_id + '-' + resultData[i].original_price + '-' + resultData[i].num
      resultDefault.push(defaultObj)
    }
    // 计算价格接口
    api.createPrice(resultArr, {
      Token: wx.getStorageSync('token'),
      "Device-Type": 'wxapp',
    }).then((res) => {
      if (res.data.code == 1) {
        this.setData({
          totalPrice: res.data.data.price * 100
        })
      }
    })
    this.setData({
      result: resultDefault,
      selectList: resultArr
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 为你推荐
    api.guess({
      shop_id: app.globalData.shopId,
      type: 4,
      page: 1
    }).then((res) => {
      if (res.data.code == 1) {
        this.setData({
          recommendList: res.data.data,
        })
      }
    })
    // 购物车查询
    api.getShop({
      shop_id: app.globalData.shopId,
    }, {
      Token: wx.getStorageSync('token'),
      "Device-Type": 'wxapp',
    }).then((res) => {
      if (res.data.code == 1) {
        this.setData({
          cartList: res.data.data,
        })
        this.loadPrice()
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