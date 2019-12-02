//index.js
//获取应用实例
const app = getApp()
import util from '../../utils/util'
let api = require('../../utils/request').default;
Page({
  data: {
    wheelList: [],
    resourse: app.globalData.imgAddress,
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    // show: true,//遮罩控制器
  },
  // 图片加载失败
  imageError(e) {
    console.log('轮播图发生error事件，携带值为', e.detail.errMsg)
  },
  onReady: function () {
    //小程序是否授权
    wx.getSetting({
      success: (res) => {
        // 未授权 ==>授权页
        if (!res.authSetting['scope.userInfo']) {
          wx.reLaunch({
            url: '../authorization/authorization',
          })
        }
      }
    })
  },
  onLoad() {
    // 轮播图接口
    api.wheels({ shop_id: 1 }).then(res => {
      if (res.data.code == 1) {
        this.setData({
          wheelList: res.data.data
        })
      }
    })
  }
})