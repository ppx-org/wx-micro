// 获取应用实例
const app = getApp()

Page({
  data: {
    skuBottom:-890
  },
  onLoad: function (option) {
    console.log(option.id)
  },
  favorite: function() {
    wx.showToast({ title: "收藏成功", icon:"none"})
  },
  addToCart: function() {
    this.setData({
      skuBottom:0
    });
  },
  buy: function() {
    this.setData({
      skuBottom: 0
    });
  },
  closeSku:function() {
    this.setData({
      skuBottom: -890
    });
  },
  gotoFirmOrder:function() {
    wx.navigateTo({
      url: '/pages/order/firm/firmorder',
    })
  }
})