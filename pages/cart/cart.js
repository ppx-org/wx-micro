// 获取应用实例
const app = getApp()

Page({
  data: {
    IMG_URL: getApp().globalData.IMG_URL,
    skuList:[],
    totalNum:0,
    totalPrice:0
  },
  onLoad: function () {
    var thisPage = this;
    getApp().request("MCart/listSku", null, function (r) {
      var totalNum = 0;
      var totalPrice = 0;
      r.arrayList.forEach(function(o) {
        totalNum += o.num;
        totalPrice += new Number(o.price);
      });
      thisPage.setData({
        skuList: r.arrayList,
        totalNum: totalNum,
        totalPrice: totalPrice
      })
    })
  }
})
