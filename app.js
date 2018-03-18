var SERVER_URL = "http://localhost/demo/";
var PPX_TOKEN = "";
var STORE_ID = 1;
var MER_ID = 1;

App({
  // data:{x:'', y:''}
  // url:MSearch/listWord
  request: function (url, data, callback) {
    wx.request({method: "POST",url:SERVER_URL+url,data:data,
      header: {'PPX_TOKEN':PPX_TOKEN,"STORE_ID":STORE_ID,"MER_ID": MER_ID},
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
    
  },
  globalData: {

  }
})