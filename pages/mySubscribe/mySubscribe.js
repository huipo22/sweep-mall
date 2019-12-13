// pages/mySubscribe/mySubscribe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subscribeListTab: [
      {
        name: "1",
        title: "代付款"
      },
      {
        name: "2",
        title: "待确认"
      },
      {
        name: "3",
        title: "已完成"
      },
      {
        name: "4",
        title: "已关闭"
      },
      {
        name: "5",
        title: "已退款"
      },
    ]
  },
  // 预约页面状态更改
  subscribeChange(event) {
    console.log(event)
    const statusName = event.detail.name
    // this.loadCouponData(statusName)
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