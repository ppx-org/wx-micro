


Page({
  data: {
    IMG_URL: getApp().globalData.IMG_URL,
    store: {},
    skuList:[],
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
        skuList: r.skuList,
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
    var skuId = [];
    var num = [];
    this.data.skuList.forEach(function(sku){
      skuId.push(sku.skuId);
      num.push(sku.num);
    });
    var para = { skuId: skuId, num: num };
    getApp().request("MOrder/submitOrder", para, function (r) {
      console.log("return.............:", r);
    
      if (r.result == 1) {
        getApp().globalData.refreshCart = true;
        // 成功，跳到其它页面
        wx.redirectTo({url:"/pages/order/success/success"});

      }
      else if (r.result == -1) {
        // 数据超出提示"overflowList":[{"skuId":1,"stockNum":3}],
        
      }
      
    })
  }
})