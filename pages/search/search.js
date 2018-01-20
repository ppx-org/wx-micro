
//获取应用实例
const app = getApp()

Page({
  
  data: {
    filterShow: "none",
    prodList: []
  },
  
  onLoad: function () {
    var r = { "swiperList": [], "actionStatus": "OK", "levelList": [{ "levelId": 1, "levelName": "店长推荐", "firstProdId": 1 }, { "levelId": 2, "levelName": "第二层", "firstProdId": 5 }], "errorCode": "0", "page": { "pageSize": 6, "pageNumber": 1, "totalRows": 0, "hasMore": false }, "prodList": [{ "pid": 1, "p": "9.80", "t": "test1我是化装品", "f": 0, "level": { "levelId": 1, "levelName": "第一层", "firstProdId": 1 } }, { "pid": 2, "p": "6.90", "t": "test2我是化装品", "f": 1, "level": null }, { "pid": 3, "p": "7.90", "t": "test3", "f": 1, "level": null }, { "pid": 4, "p": "7.80", "t": "test4", "f": 1, "level": null }, { "pid": 5, "p": "12.80", "t": "test5", "f": 1, "level": { "levelId": 2, "levelName": "第二层", "firstProdId": 5 } }, { "pid": 3, "p": "7.90", "t": "test3", "f": 1, "level": null }] };
    this.setData({
      prodList: r.prodList
    })


  },
  filter:function() {
    this.setData({
      filterShow:"flex"
    })
  }
})
