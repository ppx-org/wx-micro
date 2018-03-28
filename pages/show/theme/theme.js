// 获取应用实例
const app = getApp()

Page({
  data: {
    list: [],
    backUrl: ""
  },
  onLoad: function () {
    var thisPage = this;
    getApp().request("MQuery/listTheme", null, function (r) {
	  if (!r.arrayList) return;
      var patchN = 4 - r.arrayList.length % 4;
      patchN = patchN == 4 ? 0 : patchN;
      for (var j = 0; j < patchN; j++) {
        r.arrayList.push({});
      }
      thisPage.setData({
        backUrl: r.imgSrc,
        list: r.arrayList
      })
    })
  }
})


