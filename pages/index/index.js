//index.js
//获取应用实例
const app = getApp()
import util from '../../utils/util'
let api = require('../../utils/request').default;
Page({
  data: {
    indexData: null,
    recommendList: [],
    resourse: app.globalData.imgAddress,
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    indexRich: null,
    shopInfo: null,
    couponInfo:[],
    // show: true,//遮罩控制器
  },
  // 图片加载失败
  imageError(e) {
    console.log('轮播图发生error事件，携带值为', e.detail.errMsg)
  },
  // 地图=>商家
  getLocation: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 31.0938140000,//要去的纬度-地址
          longitude: 121.5039390000,//要去的经度-地址
          name: "O'MALL华侨城商业中心",
          address: '华侨城商业中心'
        })
      }
    })
  },
  call: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.makePhoneCall({
      phoneNumber: id, //
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
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
    // 轮播图 商家接口
    api.wheels({ shop_id: app.globalData.shopId }).then(res => {
      if (res.data.code == 1) {
        var rich = res.data.data.content.replace(/\<p><img/gi, '<img class="richImg" ')
        this.setData({
          indexData: res.data.data,
          indexRich: rich
        })
      }
    })
    // 精品推荐
    api.recommend({ shop_id: app.globalData.shopId }).then(res => {
      if (res.data.code == 1) {
        this.setData({
          recommendList: res.data.data
        })
      }
    })
    // 商家信息
    api.shopInfo({ shop_id: 8 }).then(res => {
      if (res.data.code == 1) {
        this.setData({
          shopInfo: res.data.data
        })
      }
    })
    // 获取优惠券
    api.getCoupon({ shop_id: app.globalData.shopId }, {
      Token: wx.getStorageSync('token'),
      "Device-Type": 'wxapp',
    }).then(res => {
      if (res.data.code == 1) {
        this.setData({
          couponInfo: res.data.data
        })
      }
    })
  }
})