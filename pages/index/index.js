
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
    IMG_URL: getApp().globalData.IMG_URL,
    store:{},
    swiperList:[{}],
    prodList:[],
    page:{hasMore:true,loading:false},
    levelList:[]
  },
  onLoad() {
    var thisPage = this;
    getApp().ppxLogin(function () {
      getApp().request("MHome/listHome", null, function(r) {
        var levelList = r.levelList;
        r.prodList.map(function (v) {
          v.level = getLevel(levelList, v.pid);
        })

        thisPage.setData({
          store: r.store,
          swiperList: r.swiperList,
          prodList: r.prodList,
          page: r.mPage,
          levelList: levelList
        })
      })
    });    
  },
  scan: function() {
    // 允许从相机和相册扫码.
    wx.scanCode({
      success: (res) => {
        wx.navigateTo({url: "/" +  res.path});
        console.log(res)
      }
    })
  },
  map: function() {
    var s = this.data.store;
    wx.openLocation({latitude:new Number(s.lat),longitude:new Number(s.lng),scale:18,name:s.name,address:s.addr});
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
  onReachBottom: function() {
    
    if (this.data.page.hasMore) {
      var page = this.data.page;
      page.loading = true;
      this.setData({page: page});
      
      var pageNumber = this.data.page.pageNumber + 1;
      console.log("...loading-pageNumber:" + pageNumber);
      this.getNextPage(pageNumber);
    }
  },
  getNextPage(pageNumber) {
    var thisPage = this;
    getApp().request("MHome/listLevelProd", {pageNumber:pageNumber}, function (r) {
      var newList = thisPage.data.prodList.concat(r.arrayList);
      newList.map(function (v) {
        v.level = getLevel(thisPage.data.levelList, v.pid);
      })
      thisPage.setData({
        prodList: newList,
        page: r.mPage
      });
    })
  }
})

