


Page({
  data: {
    IMG_URL: getApp().globalData.IMG_URL,
    store:{},
    order:{},
    statusList:[]
  },
  onLoad: function (option) {
    var orderId = 3;//option.orderId;
    var thisPage = this;

    getApp().request("MOrder/getDetail?orderId=" + orderId, null, function (r) {
      //  orderNum
      r.order.orderNum = 0;
      r.order.listItem.forEach(function (item) {
        r.order.orderNum += item.itemNum;
      })

      thisPage.setData({
        store: r.store,
        order: r.order,
        statusList: r.statusList
      })
    })
  }
})