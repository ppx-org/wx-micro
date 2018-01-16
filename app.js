var SERVER_URL = "http://localhost:9000/demo/";

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
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    SERVER_URL: "myURL/",
    userInfo: null
  }
})