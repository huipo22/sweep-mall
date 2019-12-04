// pages/search/search.js
const app = getApp()
import util from '../../utils/util'
let api = require('../../utils/request').default;
Page({
  data: {
    goodList: null,
    goodListR:null,
    inputValue: '',
    resourse: app.globalData.imgAddress,
  },
  inputBind: function (event) {
    this.setData({
      inputValue: event.detail.value
    })
    this.query(event)
    console.log('bindInput' + this.data.inputValue)
  },
  query: function (e) {
    console.log(e)
    //搜索数据
    let data = {
      shop_id: app.globalData.shopId,
      goods_name: e.detail.value,
      page: 1
    }
    api.search(data).then((res) => {
      if (res.data.code == 1) {
        if (res.data.data.length == 0) {
          util.errorTip()
        }
        this.setData({
          goodList: res.data.data,
        })
      }
    })
  },
  // 商品链接
  goodSelect(e) {
    util.navigateTo('../detail/detail?goodId=' + e.currentTarget.dataset.goodid)
  },
  // 加载更多
  loadMore() {
    let that = this;
    const oldData = that.data.goodsList;
    wx.showLoading({
      title: '玩命加载中',
    })
    let data = {
      shop_id: app.globalData.shopId,
      goods_name: that.data.inputVal,
      page: app.globalData.page + 1,
    }
    api.search(data).then((result) => {
      if (result.data.code == 1) {
        that.setData({
          goodsList: oldData.concat(result.data.data)
        })
        wx.hideLoading();
      } else {
        wx.showToast({
          title: '无更多数据',
          duration: 1500,
          mask: false,
        });
      }
    })
  },
  onLoad() {
    // 为你推荐
    let data = {
      shop_id: app.globalData.shopId,
      type:5,
      page: 1
    }
    api.guess(data).then((res) => {
      if (res.data.code == 1) {
        this.setData({
          goodListR: res.data.data,
        })
      }
    })
  }
})