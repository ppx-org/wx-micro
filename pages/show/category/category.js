const app = getApp()

Page({
  data: {
    list:[],
    backUrl:""
  },
  onLoad: function () {
    var thisPage = this;
    getApp().request("MQuery/listCategory", null, function (r) {
	  if (!r.arrayList) return;
	  
      var len = r.arrayList.length;
      for (var i = 0; i < len; i++) {
        var patchN = 4 - r.arrayList[i].children.length % 4;
        for (var j = 0; j < patchN; j++) {
          r.arrayList[i].children.push({backColor:"#EEEEEE"});
        }
      }
      thisPage.setData({
        backUrl: r.imgSrc,
        list: r.arrayList
      })
    })
  }
})
