const app = getApp()

Page({
  data: {
    IMG_URL: getApp().globalData.IMG_URL,
    skuBottom:-890,
    argsBottom:-890,
    filterDisplay: "none",
  	p:{},
  	img:[],
	  sku:[],
	  favor:false,
    selectSku:{}
  },
  onLoad: function (option) {
	  var prodId = option.id;
	  var thisPage = this;
    getApp().ppxLogin(function () {
      getApp().request("MProduct/getProduct?prodId=" + prodId, null, function(r) {
        // 转换提取方式
        r.mProduct.fast = getApp().getFastName(r.mProduct.fast);
        // 总库存
        r.mProduct.totalStock = 0;
        r.mProduct.skuList.forEach(function(o) {
          r.mProduct.totalStock += o.stockNum;
        })


        thisPage.setData({
		      p:r.mProduct,
          img:r.mProduct.imgSrcList,
          sku:r.mProduct.skuList,
		      favor:r.favor,
          selectSku:[]
          
          
          // test---------------------------------------
          //, skuBottom: 0
        })

      })
    });
  },
  viewSku: function() {
    this.setData({skuBottom:0,filterDisplay:'flex'});
  },
  viewArgs: function () {
    this.setData({argsBottom:0,filterDisplay:'flex'});
  },
  favorite: function() {
    var url = (this.data.favor) ? "MFavorite/removeProduct?prodId=" : "MFavorite/addProduct?prodId=";
    var thisPage = this;
    getApp().request(url + this.data.p.prodId, null, function (r) {
      if (thisPage.data.favor) {
        thisPage.setData({favor:false})
        wx.showToast({ title: "取消收藏成功", icon: "none" });
      }
      else {
        thisPage.setData({ favor: true })
        wx.showToast({ title: "收藏成功", icon: "none" });
      }
       
    });

     
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
      skuBottom:-890,
      filterDisplay:"none"
    });
  },
  closeArgs: function () {
    this.setData({
      argsBottom: -890,
      filterDisplay: "none"
    });
  },
  gotoFirmOrder:function() {
    wx.navigateTo({
      url:'/pages/order/firm/firmorder',
    })
  },


  selectSku:function(e) {
    var skuid = e.currentTarget.dataset.skuid;
    var sku = this.data.sku;
    for (var i = 0; i < sku.length; i++) {
      if (sku[i].skuId == skuid) {
        this.setData({
          selectSku:sku[i]
        });
        break;
      }
    }
  }
})