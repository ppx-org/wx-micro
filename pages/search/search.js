
const app = getApp()

Page({
  data:{
    IMG_URL: getApp().globalData.IMG_URL,
	  word:"",
	
    historyDisplay:"",
	  lastWordList:[],
	  hotWordList:[],

    myScrollTop:0,
    myTopShow:false,
    scrollTop:{show:true,scrollTop:0},
    maskIndex:2500,
    deliveryDisplay:"none",
    filterDisplay:"none",
    filterWidth:"-560rpx",
    prodList: [],
	  page:{hasMore:true,loading:false},
	
	  catList:[],
	  themeList:[],
  	brandList:[],
  	promoList:[]
	
	
  },
  
  onLoad:function () {
	var thisPage = this;
    getApp().request("MSearch/listWord", null, function(r){
      thisPage.setData({
        lastWordList:r.lastWordList,
        hotWordList:r.hotWordList
		
      })
    })
  },
  search:function(e) {
	  
  },
  query:function(para) {
	  var q = [];
    for (var i in para) { q.push(i + "=" + para[i]);}
    var thisPage = this;
	  getApp().request("MQuery/query?" + q.join("&"), null, function(r){
      if (r.page.totalRows == 0) {
        thisPage.setData({
          historyDisplay: "none"
        });
      }
      else {
        thisPage.setData({
          historyDisplay: "none",
          page: r.page,
          prodList: r.arrayList,

          catList: r.catList,
          themeList: r.themeList,
          brandList: r.brandList,
          promoList: r.promoList
        })
      }
    })
  },  
  openFilter:function() {
    this.setData({
      filterDisplay:"flex",
      filterWidth:"0rpx",
      deliveryDisplay: "none",
      maskIndex: 2500,
    })
  },
  closeFilter:function() {
    this.setData({
      filterDisplay:"none",
      filterWidth:"-560rpx",
      deliveryDisplay: "none",
    })
  },

  showDelivery:function() {
    if (this.data.deliveryDisplay == "none") {
      this.setData({
        maskIndex:1500,
        deliveryDisplay: "",
        filterDisplay: "flex",
      })
    }
    else {
      this.setData({
        deliveryDisplay: "none",
        filterDisplay: "none",
      })
    }
  },

  viewScroll:function(e) {
    if (!this.data.myTopShow && e.detail.scrollTop >= 5) {
      this.setData({
        myTopShow: true
      })
    }

    if (this.data.myTopShow && e.detail.scrollTop < 5) {
      this.setData({
        myTopShow: false
      })
    }
  },
  gotoTop:function() {
    
    this.setData({
      myScrollTop: 0,
      myTopShow:false
    })
  },
  // 上拉加载
  onReachBottomDistance:function () {
    console.log("...onReachBottomDistance");
  },
  
  
  wordblur:function(e) {
	console.log(e.detail);
	  this.setData({word:e.detail.value});
  },
  lastWordTap:function(e) {
	  console.log(e.detail);
  },
  removeHistory:function() {
    var thisPage = this;
    getApp().request("MSearch/deleteLastWord", null, function (r) {
      thisPage.setData({
        lastWordList:[]
      })
    })
  },
  hotWordTap:function(e) {
    var w = e.target.dataset.word;
    this.setData({word:w});
    this.query({w:w});
  }

})
