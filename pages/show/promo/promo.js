const app = getApp()

Page({
  data: {
    list: [],
    backUrl: ""
  },
  onLoad: function () {
    var thisPage = this;
    getApp().request("MQuery/listProgram", null, function (r) {
	  if (!r.arrayList) return;
      var patchN = 2 - r.arrayList.length % 2;
      patchN = patchN == 2 ? 0 : patchN;
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
