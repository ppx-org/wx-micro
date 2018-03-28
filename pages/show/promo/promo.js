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
      for (var j = 0; j < patchN; j++) {
        r.arrayList.push({ backColor: "#EEEEEE" });
      }
      thisPage.setData({
        backUrl: r.imgSrc,
        list: r.arrayList
      })
    })
  }
})
