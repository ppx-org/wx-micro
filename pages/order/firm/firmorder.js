


Page({
  data: {
    IMG_URL: getApp().globalData.IMG_URL,
    store: {},
	  skuIndexList:[],
	  totalNum:0,
	  totalPrice:0
  },
  onLoad: function (options) {
    var skuId = [];
    options.skuIds.split(",").forEach(function(o) {skuId.push(parseInt(o))});
    var num = [];
    options.nums.split(",").forEach(function (o) { num.push(parseInt(o)) });
    
    var para = {skuId:skuId, num:num}
    var thisPage = this;
    getApp().request("MOrder/confirmOrder", para, function (r) {
      thisPage.setData({
        store: r.store,
        skuIndexList: r.skuList,
        totalNum:r.totalNum,
        totalPrice:r.totalPrice
      })
    })
  },
  map: function () {
    var s = this.data.store;
    wx.openLocation({ latitude: parseFloat(s.lat), longitude: parseFloat(s.lng), scale: 18, name: s.name, address: s.addr });
  },
  submitOrder: function () {
    
  }
})