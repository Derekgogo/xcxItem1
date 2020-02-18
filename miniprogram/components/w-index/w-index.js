// components/w-index/w-index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    w_avatarUrl:{
      type:String,
      value:''
    },
    w_nickName:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取用户信息
    getUserInfo(e) {
      const that = this;
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            console.log("已授权=====")
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: res => {
                const nickName = res.userInfo.nickName;
                const avatarUrl = res.userInfo.avatarUrl;
                that.setData({
                  nickName: nickName,
                  avatarUrl: avatarUrl
                });
                console.log(that.data.avatarUrl);
                wx.setStorageSync('nickName', nickName);
                wx.setStorageSync('avatarUrl', avatarUrl);
              },
              fail(res) {
                console.log("获取用户信息失败", res);
              }
            })
          } else {
            console.log("未授权=====");
            that.showSettingToast("请授权");
          }
        }
      })
    },
    showSettingToast(e) {
      wx.showModal({
        title: '提示!',
        content: '去设置',
        showCancel: true,
        content: e,
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/setting/setting',
            })
          } else if (res.cancel) {
            console.log('用户取消');
          }
        }
      })
    },
    handlePic(){
      wx.navigateTo({
        url: '/pages/pic/pic',
      })
    }
  }
})
