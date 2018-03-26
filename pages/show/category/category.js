// 获取应用实例
const app = getApp()

Page({
  data: {
    list:[],
    backUrl:"http://test-1253864162.file.myqcloud.com/cat.png"
  },
  onLoad: function () {
    var thisPage = this;
    getApp().request("MQuery/listCategory", null, function (r) {
      thisPage.setData({
        list: r.arrayList
      })
    })
  }
})