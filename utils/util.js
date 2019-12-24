const app = getApp()
let api = require('./request').default;
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 跳转事件 封装
const navigateTo = (path) => {
  wx.navigateTo({
    url: path,
    success: function (res) { },
    fail: function (res) {
      wx.showToast({
        title: '跳转失败',
        icon: 'none',
        duration: 2000
      })
    },
    complete: function (res) { },
  })
}
// 请求成功弹出框
const showToastSuccess = (successVal) => {
  wx.showToast({
    title: successVal,
    icon: 'success',
    duration: 2000
  })
}
const errorTip = () => {
  wx.showToast({
    title: '无数据',
    duration: 1500,
    mask: false,
  });
}
const errorTips = (data) => {
  wx.showToast({
    title: data,
    duration: 1500,
    mask: false,
  });
}
// 加载中
const showLoading = () => {
  wx.showLoading({
    title: '加载中',
    mask: true,
  })
}
// 删除指定数据
const arrayRemoveItem = (arr, delVal) => {
  if (arr instanceof Array) {
    var index = arr.indexOf(delVal);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
const queryCart = () => {
  api.getShop({
    shop_id: app.globalData.shopId,
  }, {
    Token: wx.getStorageSync('token'),
    "Device-Type": 'wxapp',
  }).then((res) => {
    if (res.data.code == 1) {
      // 购物车右上角数量
      let num = res.data.data.length;
      console.log(num)
      wx.setTabBarBadge({
        index: 3,
        text: String(num)
      })
    } else if (res.data.code == 0) {
      wx.removeTabBarBadge({
        index: 3,
      });
    }
  })
}
// 判断token
const isToken = () => {
  if (!wx.getStorageSync('token')) {
    wx.reLaunch({
      url: '../authorization/authorization',
    })
  }
}
// 页面参数获取 小程序自带  onLoad(options)

module.exports = {
  formatTime: formatTime,
  navigateTo: navigateTo,
  showToastSuccess: showToastSuccess,
  errorTip: errorTip,
  arrayRemoveItem: arrayRemoveItem,
  showLoading: showLoading,
  errorTips: errorTips,
  queryCart: queryCart,
  isToken: isToken
}
