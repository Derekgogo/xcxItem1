const TOKEN = 'token';
const SESSION_KEY = 'session_key';
//app.js
App({
  globalData: {
    token: ''
  },
  onLaunch: function() {
    wx.cloud.init({
      traceUser: true
    })
    let token = wx.getStorageSync(TOKEN);
    if (token && token.length > 0) {
      this.checkToken(token);
      this.globalData.token = token;
    } else {
      this.login();
    }
  },
  checkToken(token) {
    wx.request({
      url: 'http://blog.cn/api/checkToken',
      header: {
        token
      },
      method: 'post',
      success: res => {

        if (res.data.data.msg != 'ok') {
          this.login();
        }
      }
    })
  },
  login() {
    wx.login({
      success: res => {
        const code = res.code;
        if (code) {
          //发起网络请求
          wx.request({
            url: 'http://blog.cn/api/login',
            data: {
              code
            },
            method: 'post',
            success: res => {
              const token = res.data.data.token;
              const session_key = res.data.data.session_key;
              this.globalData.token = token;
              this.globalData.session_key = session_key;
              wx.setStorage({
                key: TOKEN,
                data: token
              })
              wx.setStorage({
                key: SESSION_KEY,
                data: session_key
              })
            }
          })
        } else {
          console.log('登录失败' + res.errMsg);
        }
      }
    })
  }
})