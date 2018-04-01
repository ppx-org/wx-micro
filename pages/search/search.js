
const app = getApp()

Page({
  data:{
	 // TOOD 把word改成query对象
    IMG_URL: getApp().globalData.IMG_URL,
    keyWord:"",
    queryObj: { w: "", o: 0, fast:""},
	
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
    page: { hasMore: true, loading: false},
	
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
        keyWord:r.keyWord
      })
    })
  },
  search:function(e) {
    var q = this.data.queryObj;
    if (q.w == "") {
      q.w = this.data.keyWord;
    }

    // 默认值
    q = { w: q.w, o: 0, fast:"" };

    this.setData({queryObj:q});
    this.query();
  },
  query:function() {
    var para = this.data.queryObj;
	  var q = [];
    for (var i in para) { q.push(i + "=" + para[i]);}
    var thisPage = this;
	  getApp().request("MQuery/query?" + q.join("&"), null, function(r){
      if (r.page.totalRows == 0) {
        thisPage.setData({
          historyDisplay: "none",
          page: r.page,
          prodList:[]
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
    var q = this.data.queryObj;
    q.w = e.detail.value;
    
    this.setData({queryObj:q});
  },
  lastWordTap:function(e) {
    var w = e.currentTarget.dataset.word;
    this.data.queryObj.w = w;
    this.setData({ queryObj: this.data.queryObj });
    this.query();
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
    var w = e.currentTarget.dataset.word;
    this.data.queryObj.w = w;
    this.setData({ queryObj: this.data.queryObj});
    this.query();
  },

  normalSort:function() {
    if (this.data.queryObj.o == 1 && this.data.prodList.length > 0) {
      this.data.queryObj.o = 0;
      this.setData({ queryObj: this.data.queryObj });
      this.query();
    }
  },
  newSort: function () {
    if (this.data.queryObj.o == 0 && this.data.prodList.length > 0) {
      this.data.queryObj.o = 1;
      this.setData({ queryObj: this.data.queryObj });
      this.query();
    }
  },
  deliveryAll:function() {
    if (this.data.queryObj.fast != "") {
      this.data.queryObj.fast = "";
      this.setData({ queryObj: this.data.queryObj });
      this.query();
      this.showDelivery();
    } 
  },
  deliveryFast:function() {
    if (this.data.queryObj.fast != "1") {
      this.data.queryObj.fast = "1";
      this.setData({ queryObj: this.data.queryObj });
      this.query();
      this.showDelivery();
    } 
  },

  searchCat:function(e) {
    var cId = e.currentTarget.dataset.cid;
    cId = (cId == this.data.queryObj.cId) ? "" : cId;
    this.data.queryObj.cId = cId;
    this.setData({ queryObj: this.data.queryObj});
    this.query();
    this.closeFilter();
  },
  searchBrand: function (e) {
    var bId = e.currentTarget.dataset.bid;
    bId = (bId == this.data.queryObj.bId) ? "" : bId;
    this.data.queryObj.bId = bId;
    this.setData({ queryObj: this.data.queryObj});
    this.query();
    this.closeFilter();
  },
  searchTheme: function (e) {
    var tId = e.currentTarget.dataset.tid;
    tId = (tId == this.data.queryObj.tId) ? "" : tId;
    this.data.queryObj.tId = tId;
    this.setData({ queryObj: this.data.queryObj});
    this.query();
    this.closeFilter();
  },
  searchPromo: function (e) {
    var gId = e.currentTarget.dataset.gid;
    gId = (gId == this.data.queryObj.gId) ? "" : gId;
    this.data.queryObj.gId = gId;
    this.setData({ queryObj: this.data.queryObj});
    this.query();
    this.closeFilter();
  }

})
