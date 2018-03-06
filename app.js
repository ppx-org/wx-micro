var SERVER_URL = "http://localhost/demo/";

//app.js
App({
  
  // data:{x:'', y:''}
  // MSearch/listWord
  request: function (url, data, callback) {
    wx.request({
      method: "POST",
      url: SERVER_URL + url,
      data: data,
      header: {
        'PPXTOKEN': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvRDFuNjBIWkhXQmE2dWNXU2RZNTBITldQZnE0Iiwic2Vzc2lvbl9rZXkiOiJUQW5jcU1EUlRoTlpxZUVzbWIzeHJRPT0iLCJpYXQiOjE1MTU0NjgzMTd9.FYiDa1kF8mV5cBWM6YPVC5nFPow7qpwm9muEHTKDl0E',
        "storeId":1,
        "merchantId":-1
      },
      success: function (res) {
        //console.log(res.data);
        callback(res.data);
      },
      fail: function(res) {
        console.log(res.data)
      }
    })
  },

  onLaunch: function () { 
    console.log("xxxxxxxxxx001");
    
    // 展示本地存储能力
    var ppxToken = wx.getStorageSync('PPXTOKEN') || '';
    if (ppxToken == '') {
      ppxToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvRDFuNjBIWkhXQmE2dWNXU2RZNTBITldQZnE0Iiwic2Vzc2lvbl9rZXkiOiJUQW5jcU1EUlRoTlpxZUVzbWIzeHJRPT0iLCJpYXQiOjE1MTU0NjgzMTd9.FYiDa1kF8mV5cBWM6YPVC5nFPow7qpwm9muEHTKDl0E'
      wx.setStorageSync('ppxTocken', ppxToken);

    }
    console.log("xxxxxxxxxx002:" + ppxToken);

    


    // 登录
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          method: "POST",
          url: SERVER_URL + 'MLogin/login',
          data: {jsCode:res.code},
          success: function (res) {
            // res.result == 1 res.PPXTOKEN
            // console.log(res.data);
            console.log(res.data);
          },
          fail: function (res) {
            console.log(res.data)
          }
        })
      }
    })
    // 获取用户信息
    
  },
  globalData: {
  }
})