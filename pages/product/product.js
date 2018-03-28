const app = getApp()

Page({
  data: {
    skuBottom:-890,
	p:{},
	img:[],
	sku:[],
	favor:false
  },
  onLoad: function (option) {
	var prodId = option.id;
	var thisPage = this;
    getApp().ppxLogin(function () {
      getApp().request("MProduct/getProduct?prodId=" + prodId, null, function(r) {
        
        thisPage.setData({
		  p:r.mProduct,
		  img:r.imgSrcList,
		  sku:r.skuList,
		  favor:r.favor
        })
      })
    });
	
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