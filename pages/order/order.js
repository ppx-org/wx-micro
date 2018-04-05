


Page({
  data: {
    IMG_URL: getApp().globalData.IMG_URL,
    page:{},
    orderList: [],
    allOrder:"#FE7506",
    waitPay:"white",
    waitPrepare:"white",
    waitDeliver:"white"
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
      allOrder:"#FE7506",
      waitPay:"white",
      waitPrepare:"white",
      waitDeliver:"white"
    });
  },
  waitPay: function () {
    this.setData({
      allOrder: "white",
      waitPay: "#FE7506",
      waitPrepare: "white",
      waitDeliver: "white"
    });
  },
  waitPrepare: function () {
    this.setData({
      allOrder: "white",
      waitPay: "white",
      waitPrepare: "#FE7506",
      waitDeliver: "white"
    });
  },
  waitDeliver: function () {
    this.setData({
      allOrder: "white",
      waitPay: "white",
      waitPrepare: "white",
      waitDeliver: "#FE7506"
    });
  }
})