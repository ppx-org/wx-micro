
// 去链接过来，光链接过来还不行！
var common = require("../../commom/price.js");
// 使用:common.countPrice(skuList);  最后我们需要执行才能生效！

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
