//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    active: 1,
    mainActiveIndex: 0,
    activeId: [],
    items: [{ text: '分组 1' }, { text: '分组 2' }]
  },
  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0
    });
  },
  onLoad: function () {
    // wx.navigateTo({
    //   url: '../authorization/authorization'
    // })
  },
})