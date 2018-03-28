// 负载均衡的URL
var SERVER_URL = "http://localhost/demo/";
var IMG_URL = "http://localhost/demo/img/";
var PPX_TOKEN = "";
// 固定值,每个小程序对一个
var MER_ID = 1;
// 默认值，在找不到传值时，使用该值
var STORE_ID = 1;
// 促销编码
var PROMO_CODE = "";


App({
  getFastName: function (fast) {
    return fast == 1 ? '立即提取' : '2小时提取';
  },
  // data:{x:'', y:''}
  // url:MSearch/listWord
  request: function (url, data, callback) {
    wx.request({method: "POST",url:SERVER_URL+url,data:data,
      header: {'PPX_TOKEN':PPX_TOKEN,"STORE_ID":STORE_ID,"MER_ID":MER_ID,"PROMO_CODE":PROMO_CODE},
      success: function (r) { 
        //console.log(r.data);
        callback(r.data);
      },
      fail: function(r) { 
        console.log(r.data); 
      }
    })
  },

  ppxLogin: function (callback) {
    // 本地存储
    PPX_TOKEN = wx.getStorageSync('PPX_TOKEN') || '';
    if (PPX_TOKEN == '') {
      // 登录
      wx.login({
        success: r => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({method:"POST",url:SERVER_URL+'MLogin/login',data:{jsCode:r.code},
            success: function (r) {
              console.log("token from server;");
              wx.setStorageSync('PPX_TOKEN', r.data.PPX_TOKEN);
              console.log(r.data);
              callback();
            },
            fail: function (r) {console.log(r.data)}
          })
        }, 
        fail: function (r) {console.log(r);}
      })
    }
    else {
      console.log("token from local;");
      callback();
    }
    
  },

  onLaunch: function (options) {
    // 测试用
    PPX_TOKEN = wx.getStorageSync('PPX_TOKEN')
  },
  globalData: {
    IMG_URL: IMG_URL
  }
})