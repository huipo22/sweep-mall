//index.js
//获取应用实例
const app = getApp()
import util from '../../utils/util'
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
    items: [{ text: '分组 1' }, { text: '分组 2' }],
    show: true,
    popupShow: false
  },
  // 左侧点击事件
  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0
    });
  },
  // 商品详情
  detailPage() {
    util.navigateTo('../detail/detail?id=1')
  },
  // 商品弹框
  showPopup() {
    this.setData({
      popupShow: true
    })
  },
  // 关闭商品导航
  onClose() {
    this.setData({
      popupShow: false
    })
  },
  onReady: function () {
    this.setData({
      show: false
    })
  },
})