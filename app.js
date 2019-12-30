//app.js
App({
  onLaunch: function (options) {
    if (options.query.scene) {
      console.log("有返回二维码");
      var scene = decodeURIComponent(options.query.scene);
      console.log("二维码:", scene);
      var arrPara = scene.split("&");
      var arr = [];
      for (var i in arrPara) {
        arr = arrPara[i].split("=");
        wx.setStorageSync(arr[0], arr[1]);
        console.log("setStorageSync:", arr[0], "=", arr[1]);
      }
      this.globalData.shopId = wx.getStorageSync('shopId')
      this.globalData.tableId = wx.getStorageSync('tableId')
    } else {
      console.log("没有二维码");
      this.globalData.shopId = wx.getStorageSync('shopId') || 1
      this.globalData.tableId = wx.getStorageSync('tableId') || 1
    }
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,//微信数据
    imgAddress: 'https://saoma.jishanhengrui.com/upload/',
    page: 1,//分页默认
    shopId: 1,//商家id,
    tableId: 1,//餐桌id
    wxLogo: "http://saoma.jishanhengrui.com/upload/saoma.jpg",
    subscribeTitle: "../../dist/icon/subscribe-title.jpg",
    payType: null,//1:线上支付 2:线下支付
    user_status:null
  }
})