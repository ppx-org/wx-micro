Page({
  data: {
    list:[]
  },
  onLoad() {
    var thisPage = this;
    getApp().request("MStore/listStore", null, function (r) {
      thisPage.setData({
          list:r.arrayList
      })
    })
  }
})