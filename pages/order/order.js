


Page({
  data: {
    IMG_URL: getApp().globalData.IMG_URL,
    page:{},
    orderList: [],
    allBottomColor:"red",
    waitBottomColor:"white"
  },
  onLoad: function () {
    var thisPage = this;
    getApp().request("MOrder/listMyOrder", {}, function (r) {
      var orderList = r.arrayList;
      orderList.map(function(o){
        var orderNum = 0;
        o.listItem.forEach(function(i) {orderNum += i.itemNum;})
        o.orderNum = orderNum;
      })

      thisPage.setData({
        page: r.mPage,
        orderList: r.arrayList
      })
    })
  },

  allOrder:function() {
    this.setData({
      allBottomColor: "red",
      waitBottomColor: "white"
    });
  },
  allOrder2: function () {
    this.setData({
      allBottomColor : "white",
      waitBottomColor: "red"
    });
  }
})