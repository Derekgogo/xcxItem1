const app = getApp();
const token = app.globalData.token;
// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.authLogin();
  },
  //判断用户是否权限并赋值
  authLogin() {
    const that = this;
    const stroageNickname = wx.getStorageSync('nickName');
    const stroageAvatarUrl = wx.getStorageSync('avatarUrl');
    if (stroageNickname) {
      that.setData({
        nickName: stroageNickname,
        avatarUrl: stroageAvatarUrl
      });
    } else {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                const nickName = res.userInfo.nickName;
                const avatarUrl = res.userInfo.avatarUrl;
                that.setData({
                  nickName,
                  avatarUrl
                });

                wx.setStorageSync('nickName', nickName);
                wx.setStorageSync('avatarUrl', avatarUrl);
              }
            })
          }
        }
      });
    }
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '自定义转发标题',
    }
  }
})