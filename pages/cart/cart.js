
// 去链接过来，光链接过来还不行！
var price = require("../../common/price.js");
// 使用:common.countPrice(skuList);  最后我们需要执行才能生效！

const app = getApp()

Page({
  data: {
    IMG_URL: getApp().globalData.IMG_URL,
    skuList:[],
    totalNum:0,
    totalPrice:0,
    
  },
  onLoad: function () {
    var thisPage = this;
    getApp().request("MCart/listSku", null, function (r) {
      
      thisPage.setData({
        skuList: r.arrayList
      })
    })
  },
  listenCheckboxChange: function (e) {
    
    var skuId = e.detail.value;
    var skuMap = [];
    for (var i = 0; i < skuId.length; i++) {
      skuMap[skuId[i]] = true;
    }

    if (skuId.length == 0) {
      this.setData({totalNum: 0, totalPrice: 0 });
    }
    else {
      var selectedSkuList = [];
      var skuList = this.data.skuList;
      skuList.forEach(function (o) {
        if (skuMap[o.skuId]) {
          selectedSkuList.push(o);
        }
      });

      // 重新计算价格
      var resultSkuList = price.countPrice(selectedSkuList);
      var totalNum = 0;
      var totalPrice = 0;
      resultSkuList.forEach(function (o) {
        totalNum += o.num;
        totalPrice += new Number(o.price);
      });
      this.setData({ totalNum: totalNum, totalPrice: totalPrice.toFixed(2) });
    }

  },
  allCheck: function(e) {
    if (e.detail.value[0] == "all") {
      var skuList = this.data.skuList;
      skuList.map(function (o) {o.checked = true;})
      
      var totalNum = 0;
      var totalPrice = 0;
      skuList.forEach(function (o) {
        totalNum += o.num;
        totalPrice += new Number(o.price);
      });

      this.setData({ skuList: skuList, totalNum: totalNum, totalPrice: totalPrice.toFixed(2) });
    }
    else {
      var skuList = this.data.skuList;
      skuList.map(function (o) { o.checked = false; })
      this.setData({ skuList: skuList, totalNum: 0, totalPrice: 0 });
    }
  },
  edit: function(e) {
    var skuId = e.currentTarget.dataset.skuid;
    var skuList = this.data.skuList;
    skuList.map(function (o) {
      if (skuId == o.skuId) {
        o.showAction = true;
      }
    });
    this.setData({ skuList: skuList});
  },


  minus: function(e) {

  },
  add: function(e) {

  },
  finish: function(e) {
    var skuId = e.currentTarget.dataset.skuid;
    var skuList = this.data.skuList;
    skuList.map(function (o) {
      if (skuId == o.skuId) {
        o.showAction = false;
      }
    });
    this.setData({ skuList: skuList });
  }
})
