// 获取应用实例
const app = getApp()

Page({
  data: {
    width:"100rpx"
  },
  onLoad: function (option) {
    console.log(option.id)
  }
})