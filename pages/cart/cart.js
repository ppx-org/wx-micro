
// 去链接过来，光链接过来还不行！
var price = require("../../common/price.js");
// 使用:common.countPrice(skuList);  最后我们需要执行才能生效！

const app = getApp();

Page({
  data: {
    IMG_URL: getApp().globalData.IMG_URL,
    skuList:[],
    totalNum:0,
    totalPrice:"0.00"
    
  },
  onLoad: function () {
    
    //this.queryCart();
  },
  onShow: function() {
    if (this.data.skuList.length == 0) {
      this.queryCart();
    }
    
    //
    // console.log("out........:" + getApp().globalData.refreshCart);
    
    /*
    this.setData({
      skuList: [],
      totalNum: 0,
      totalPrice: "0.00"
    })
    this.queryCart();*/
  },
  queryCart:function() {
    var thisPage = this;
    getApp().request("MCart/listSku", null, function (r) {
      if (r.result == 0) {

      }
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
          o.checked = true;
          selectedSkuList.push(o);
        }
      });

      // 重新计算价格 上面TODO使用selected判断选择的
      var resultSkuList = price.countPrice(selectedSkuList);
      var totalNum = 0;
      var totalPrice = 0;
      resultSkuList.forEach(function (o) {
        totalNum += o.num;
        totalPrice += new Number(o.itemPrice);
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
        totalPrice += new Number(o.itemPrice);
      });

      this.setData({ skuList: skuList, totalNum: totalNum, totalPrice: totalPrice.toFixed(2) });
    }
    else {
      var skuList = this.data.skuList;
      skuList.map(function (o) { o.checked = false; })
      this.setData({ skuList: skuList, totalNum: 0, totalPrice: "0.00"});
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
    var skuId = e.currentTarget.dataset.skuid;
    var skuList = this.data.skuList;
    skuList.map(function (o) {
      if (skuId == o.skuId) {
        o.num = o.num - 1;
      }
    });
    this.setData({ skuList: skuList });
  },
  add: function(e) {
    var skuId = e.currentTarget.dataset.skuid;
    var skuList = this.data.skuList;
    skuList.map(function (o) {
      if (skuId == o.skuId) {
        o.num += 1;
      }
    });
    this.setData({ skuList: skuList });
  },
  finish: function(e) {
    var skuId = e.currentTarget.dataset.skuid;
    var skuList = this.data.skuList;
	  var num = 0;
    skuList.map(function (o) {
      if (skuId == o.skuId) {
        o.showAction = false;
		    num = o.num;
      }
    });
    
    var selectedSkuList = [];
    skuList.forEach(function (o) {
      if (o.checked) {
        selectedSkuList.push(o);
      }
    });

    // 重新计算价格 上面TODO使用selected判断选择的
    var resultSkuList = price.countPrice(selectedSkuList);
    var totalNum = 0;
    var totalPrice = 0;
    resultSkuList.forEach(function (o) {
      totalNum += o.num;
      totalPrice += new Number(o.itemPrice);
    });
    this.setData({ skuList: skuList , totalNum: totalNum, totalPrice: totalPrice.toFixed(2) });
	
	  // 保存到数据库
	  getApp().request("MCart/editSkuNum?skuId=" + skuId + "&num=" + num, null, function(r){});
  },
  balance: function() {
    var selectedSkuId = [];
    var selectedNum = [];
    var skuList = this.data.skuList;
    skuList.forEach(function (o) {
      if (o.checked) {
        selectedSkuId.push(o.skuId);
        selectedNum.push(o.num);
      }
    });
    if (selectedNum.length == 0) {
      wx.showToast({ title: "你还没有选择宝贝哦", icon: "none" });
    }
    else {
      
      var thisPage = this;
      wx.navigateTo({
        url: '../order/firm/firmorder?skuIds=' + selectedSkuId.join(",") + "&nums=" + selectedNum.join(","),
        success: function() {
          thisPage.setData({
            skuList: [],
            totalNum: 0,
            totalPrice: "0.00"
          })
        }
      })
    }
    
  }
})
