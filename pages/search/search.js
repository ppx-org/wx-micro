
const app = getApp()

Page({
  data:{ 
    historyDisplay:"",
	  lastWordList:[],
	  hotWordList:[],

    myScrollTop:0,
    myTopShow:false,
    scrollTop:{ 
      show:true,
      scrollTop:0
    },
    maskIndex:2500,
    deliveryIndex:0,
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
        hotWordList:r.hotWordList,
		
      })
    })
	  
    var r = { "swiperList": [], "actionStatus": "OK", "levelList": [{ "levelId": 1, "levelName": "店长推荐", "firstProdId": 1 }, { "levelId": 2, "levelName": "第二层", "firstProdId": 5 }], "errorCode": "0", "page": { "pageSize": 6, "pageNumber": 1, "totalRows": 0, "hasMore": false }, "prodList": [{ "pid": 1, "p": "9.80", "t": "test1我是化装品", "f": 0, "level": { "levelId": 1, "levelName": "第一层", "firstProdId": 1 } }, { "pid": 2, "p": "6.90", "t": "test2我是化装品", "f": 1, "level": null }, { "pid": 3, "p": "7.90", "t": "test3", "f": 1, "level": null }, { "pid": 4, "p": "7.80", "t": "test4", "f": 1, "level": null }, { "pid": 5, "p": "12.80", "t": "test5", "f": 1, "level": { "levelId": 2, "levelName": "第二层", "firstProdId": 5 } }, { "pid": 3, "p": "7.90", "t": "test3", "f": 1, "level": null }] };
    this.setData({
      prodList: r.prodList
    })
    //this.openFilter();
  },
  query:function(w) {
	getApp().request("MQuery/query?w=" + w, null, function(r){
      thisPage.setData({
		historyDisplay:"none",
		
		page:r.page,
        prodList:r.arrayList,
		
		catList:r.catList,
		themeList:r.themeList,
		brandList:r.brandList,
		promoList:r.promoList
      })
    })
  },  
  openFilter:function() {
    this.setData({
      filterDisplay:"flex",
      filterWidth:"0rpx",
      deliveryIndex: 0,
      maskIndex: 2500,
    })
  },
  closeFilter:function() {
    this.setData({
      filterDisplay:"none",
      filterWidth:"-560rpx",
      deliveryIndex: 0,
    })
  },

  showDelivery:function() {
    if (this.data.deliveryIndex == 0) {
      this.setData({
        maskIndex:1500,
        deliveryIndex: 2000,
        filterDisplay: "flex",
      })
    }
    else {
      this.setData({
        deliveryIndex: 0,
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
  onReachBottomDistance: function () {
    console.log("...onReachBottomDistance");
  }

})
