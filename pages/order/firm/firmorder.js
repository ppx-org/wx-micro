


Page({
  data: {
	  skuIndexList:[],
	  totalNum:0,
	  totalPrice:0,
	  
	// 改成skuList
    prodList: [],
    allBottomColor: "red",
    waitBottomColor: "white"
  },
  onLoad: function (options) {
    var r = { "swiperList": [], "actionStatus": "OK", "levelList": [{ "levelId": 1, "levelName": "店长推荐", "firstProdId": 1 }, { "levelId": 2, "levelName": "第二层", "firstProdId": 5 }], "errorCode": "0", "page": { "pageSize": 6, "pageNumber": 1, "totalRows": 0, "hasMore": false }, "prodList": [{ "pid": 1, "p": "9.80", "t": "test1我是化装品", "f": 0, "level": { "levelId": 1, "levelName": "第一层", "firstProdId": 1 } }, { "pid": 2, "p": "6.90", "t": "test2我是化装品", "f": 1, "level": null }, { "pid": 3, "p": "7.90", "t": "test3", "f": 1, "level": null }] };
    this.setData({
      prodList:r.prodList
    })

	
	var skuId = [];
  options.skuIds.split(",").forEach(function(o) {skuId.push(parseInt(o))});
  var num = [];
  options.nums.split(",").forEach(function (o) { num.push(parseInt(o)) });
  
  console.log(skuId, num);
	
	var para = {skuId:skuId, num:num}
	var thisPage = this;
    getApp().request("MOrder/countPrice", para, function (r) {
      thisPage.setData({
        skuIndexList:r.skuIndexList,
		    totalNum:r.totalNum,
		    totalPrice:r.totalPrice
      })
    })
  },

  submitOrder: function () {
    
  }
})