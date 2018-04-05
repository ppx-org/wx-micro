

Page({
  data: {
    IMG_URL: getApp().globalData.IMG_URL,
    prodList: [],
    page: { hasMore: true, loading: false }
  },
  onLoad: function () {
    this.queryFavorite();
  },
  queryFavorite: function (pageNumber) {
    var para = { pageNumber: pageNumber ? pageNumber : 1 };
    var thisPage = this;
    getApp().request("MFavorite/listProduct", para, function (r) {
      thisPage.setData({
        prodList: r.arrayList,
        page: r.mPage
      })
    })
  }
})