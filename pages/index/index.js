

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
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    prodList:[]
  },
  onLoad() {
    getApp().request("MHome/listJson", {}, function (r) {
      
      var levelList = r.levelList;
      //var prodList = r.prodList;
      r.prodList.map(function(v){
        v.level = getLevel(levelList, v.pid);
      })
      getCurrentPages()[0].setData({
        prodList: r.prodList
      })
      console.log(r.prodList);
    })
  },
  scan: function() {
    getApp().request("MSearch/listWord", {}, function(r) {
      console.log(r);
    })

    /*
    console.log('sss');
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        wx.navigateTo({
          url: "/" +  res.path
        })
        console.log(res)
      }
    })*/
    
    /*
    wx.navigateTo({
      url: '/pages/product/detail/detail?id=98765',
    })*/
    console.log(getApp().globalData.SERVER_URL);
  },
  storeMap: function() {
    var latitude = 23.0867590917;
    var longitude = 113.3277297020;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 18,
      name: '皮皮8号店',
      address:'赤岗路188号'
    })
  }
})

