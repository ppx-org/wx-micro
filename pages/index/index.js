

var getLevel = function (levelList, pid) {
  for (var i = 0; i < levelList.length; i++) {
    if (pid == levelList[i].firstProdId) {
      return levelList[i];
    }
  }
  return null;
}

Page({
  data: {
    imgUrls: [
      'https://img.alicdn.com/imgextra/i1/93/TB2EaLvmCfD8KJjSszhXXbIJFXa_!!93-0-luban.jpg_q50.jpg',
      'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg',
      'https://gw.alicdn.com/imgextra/i1/38/TB2ECMYd7fb_uJkSmRyXXbWxVXa_!!38-0-lubanu.jpg_q50.jpg'
    ],
    prodList:[]
  },
  onLoad() {
    wx.setTabBarBadge({
      index: 2,
      text: '5'
    })

    var r = { "swiperList": [], "actionStatus": "OK", "levelList": [{ "levelId": 1, "levelName": "店长推荐", "firstProdId": 1 }, { "levelId": 2, "levelName": "第二层", "firstProdId": 5 }], "errorCode": "0", "page": { "pageSize": 6, "pageNumber": 1, "totalRows": 0, "hasMore": false }, "prodList": [{ "pid": 1, "p": "9.80", "t": "test1我是化装品", "f": 0, "level": { "levelId": 1, "levelName": "第一层", "firstProdId": 1 } }, { "pid": 2, "p": "6.90", "t": "test2我是化装品", "f": 1, "level": null }, { "pid": 3, "p": "7.90", "t": "test3", "f": 1, "level": null }, { "pid": 4, "p": "7.80", "t": "test4", "f": 1, "level": null }, { "pid": 5, "p": "12.80", "t": "test5", "f": 1, "level": { "levelId": 2, "levelName": "第二层", "firstProdId": 5 } }, { "pid": 3, "p": "7.90", "t": "test3", "f": 1, "level": null }]};
    var levelList = r.levelList;
    r.prodList.map(function (v) {
      v.level = getLevel(levelList, v.pid);
    })
    
    this.setData({
      prodList: r.prodList
    })
    
    /*
    getApp().request("MHome/listJson", {}, function (r) {
      
      var levelList = r.levelList;
      r.prodList.map(function(v){
        v.level = getLevel(levelList, v.pid);
      })
      getCurrentPages()[0].setData({
        prodList: r.prodList
      })
      console.log(JSON.stringify(r));
    })
    */
  },
  scan: function() {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        wx.navigateTo({
          url: "/" +  res.path
        })
        console.log(res)
      }
    })
    
    /*
    wx.navigateTo({
      url: '/pages/product/detail/detail?id=98765',
    })
    console.log(getApp().globalData.SERVER_URL);
    */
    
  },
  storeMap: function() {
    var latitude = 23.0867590917;
    var longitude = 113.3277297020;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 18,
      name: '皮皮7号店',
      address:'赤岗路188号'
    })
  },
  search: function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() // 在标题栏中显示加载

    // 模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() // 完成停止加载
      wx.stopPullDownRefresh() // 停止下拉刷新
    }, 800);
  },
  // 上拉加载
  onReachBottomDistance: function() {
    
  },
  gotoPromo:function() {
    wx.navigateTo({ url: "/pages/show/promo/promo"})
  },
  gotoBrand: function () {
    wx.navigateTo({ url: "/pages/show/brand/brand" })
  },
  gotoTheme: function () {
    wx.navigateTo({ url: "/pages/show/theme/theme" })
  },
  gotoCategory: function () {
    wx.navigateTo({ url: "/pages/show/category/category" })
  },
  gotoProduct: function () {
    wx.navigateTo({ url: "/pages/product/product" })
  },
})

