const app = getApp()

Page({
  data: {
    IMG_URL: getApp().globalData.IMG_URL,
    skuBottom:-890,
  	p:{},
  	img:[],
	  sku:[],
	  favor:false,
    firstSku:{}
  },
  onLoad: function (option) {
	  var prodId = option.id;
	  var thisPage = this;
    getApp().ppxLogin(function () {
      getApp().request("MProduct/getProduct?prodId=" + prodId, null, function(r) {
        // 转换提取方式
        r.mProduct.fast = getApp().getFastName(r.mProduct.fast);
        var firstSku = r.mProduct.skuList[0];
        firstSku.skuImgSrc = getApp().globalData.IMG_URL + firstSku.skuImgSrc;
        thisPage.setData({
		      p:r.mProduct,
          img:r.mProduct.imgSrcList,
          sku:r.mProduct.skuList,
		      favor:r.favor,
          firstSku:firstSku
        })
      })
    });
  },
  viewSku: function() {
    this.setData({skuBottom: 0});
  },
  favorite: function() {
    wx.showToast({ title: "收藏成功", icon:"none"})
  },
  addToCart: function() {
    this.setData({
      skuBottom:0
    });
  },
  buy: function() {
    this.setData({
      skuBottom:0
    });
  },
  closeSku:function() {
    this.setData({
      skuBottom:-890
    });
  },
  gotoFirmOrder:function() {
    wx.navigateTo({
      url:'/pages/order/firm/firmorder',
    })
  }
})