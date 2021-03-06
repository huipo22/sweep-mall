// pages/cart/cart.js
const app = getApp()
import util from '../../utils/util'
let api = require('../../utils/request').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectList: [],
    checkedAll: true,
    recommendList: [],
    resourse: app.globalData.imgAddress,
    cartList: [],
    totalPrice: 0,
  },
  // 商品详情
  detailPage(e) {
    const goodId = e.currentTarget.dataset.goodid
    util.navigateTo('../detail/detail?goodId=' + goodId)
  },
  //单选
  check(e) {
    const goodId = e.currentTarget.dataset.goodid
    const data = this.data.cartList;
    const select = this.data.selectList;
    for (var i in data) {
      if (data[i].id == goodId) {
        data[i].checked = !data[i].checked
        if (data[i].checked == false) {
          // 从选中数组移除
          for (let j in select) {
            if (select[j].id == goodId) {
              util.arrayRemoveItem(select, select[j])
            }
          }
        } else {
          // 选中数组push
          let objData = {};
          objData.goods_id = data[i].goods_id
          objData.present_price = data[i].present_price
          objData.num = data[i].num
          objData.id = data[i].id
          select.push(objData)
        }
      }
    }
    this.setData({
      selectList: select,
      cartList: data
    })
    this.countPrice(select)

  },

  // 计算价格事件
  countPrice(resultArr) {
    // 计算价格接口
    if (resultArr == 0) {
      this.setData({
        totalPrice: 0 * 100
      })
    } else {
      console.log(resultArr)
      api.createPrice(resultArr, {
        Token: wx.getStorageSync('token'),
        "Device-Type": 'wxapp',
      }).then((res) => {
        console.log(res)
        if (res.data.code == 1) {
          this.setData({
            totalPrice: res.data.data.price * 100
          })
        }
      })
    }
  },
  // 全选事件更改
  allSelectChange(event) {
    this.setData({
      checkedAll: event.detail
    })
    const resultData = this.data.cartList;
    if (event.detail == false) {
      // false  全false
      for (let i in resultData) {
        resultData[i].checked = false
      }
      this.setData({
        selectList: [],
        cartList: resultData,
        totalPrice: 0
      })
    } else {
      // true  全true
      for (let i in resultData) {
        resultData[i].checked = true
      }
      this.setData({
        cartList: resultData,
      })
      this.loadPrice()
    }
  },

  // 商品数量+-
  goodChange(target) {
    const goodId = target.currentTarget.dataset.goodid
    const cartData = this.data.cartList
    const selectData = this.data.selectList;
    for (let i in cartData) {
      if (cartData[i].id == goodId) {
        cartData[i].num = target.detail
      }
    }
    for (let j in selectData) {
      if (selectData[j].id == goodId) {
        selectData[j].num = target.detail
      }
    }

    if (target.detail == 0) {
      for (let i in cartData) {
        if (cartData[i].id == goodId) {
          util.arrayRemoveItem(cartData, cartData[i])
        }
      }
      for (let j in selectData) {
        if (selectData[j].id == goodId) {
          util.arrayRemoveItem(selectData, selectData[j])
        }
      }
      this.guess()
      // 删除接口 重新计算价格
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
          setTimeout(() => {
            this.setData({
              cartList: cartData,
              selectList: selectData
            })
          }, 500)
          util.showToastSuccess('删除成功')
          util.queryCart()
          this.countPrice(selectData)
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
          setTimeout(() => {
            this.setData({
              cartList: cartData,
              selectList: selectData,
            })
          }, 500)
          this.countPrice(selectData)
        }
      })
    }
  },
  // 创建订单事件 --> 跳转订单页orderConfirm   s/''
  onSubmitPage() {

    const select = this.data.selectList.map((obj) => {
      return {
        goods_id: obj.goods_id,
        present_price: obj.present_price,
        num: obj.num
      }
    })
    if (this.data.selectList.length == 0) {
      util.errorTips('请选择勾选商品')
      return
    }
    util.navigateTo('../orderConfirms/orderConfirms?orderList=' + JSON.stringify(select))
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
    util.isToken()
  },
  // 加载计算价格
  loadPrice() {
    // 全选 true   selcet 数组中push   为true 对象
    const resultData = this.data.cartList;
    let resultArr = []
    for (let i in resultData) {
      if (resultData[i].checked == true) {
        let objData = {};
        objData.goods_id = resultData[i].goods_id
        objData.present_price = resultData[i].present_price
        objData.num = resultData[i].num
        objData.id = resultData[i].id
        resultArr.push(objData)
      }
    }
    // 计算价格接口
    this.countPrice(resultArr)
    this.setData({
      selectList: resultArr
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  guess() {
    // 无数据 为你推荐
    api.guess({
      shop_id: app.globalData.shopId,
      type: 4,
      page: 1
    }).then((res) => {
      if (res.data.code == 1) {
        this.setData({
          recommendList: res.data.data,
        })
        wx.hideLoading();
      }
    })
  },
  onShow: function () {
    util.queryCart()
    util.showLoading()
    // 购物车查询
    api.getShop({
      shop_id: app.globalData.shopId,
    }, {
      Token: wx.getStorageSync('token'),
      "Device-Type": 'wxapp',
    }).then((res) => {
      if (res.data.code == 1) {
        // 有数据
        let data = res.data.data;
        for (var i in data) {
          data[i].checked = true;
        }
        this.setData({
          cartList: data,
        })
        this.loadPrice()
      } else if (res.data.code == 0) {
        this.setData({
          cartList: [],
        })
        this.guess()
      }
      wx.hideLoading();
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