const app = getApp();
const TOKEN = app.globalData.token;
const SESSION_KEY = app.globalData.session_key;
// pages/pic/pic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picName: '',
    imgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  uploadPic() {
    let that = this;
    let timestamp = (new Date()).valueOf();
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: chooseResult => {
        wx.showLoading({
          title: '上传中。。。',
        })
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: timestamp + '.png',
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            console.log('上传成功', res)
            wx.hideLoading()
            wx.showToast({
              title: '上传图片成功',
            })
            if (res.fileID) {
              that.setData({
                picName: '图片如下',
                imgUrl: res.fileID
              })
            }

          },
        })
      },
    })
  },
  //处理图片
  dealPic() {
    const tempFilePaths = this.data.imgUrl;
    wx.uploadFile({
      url: 'http://.com/upload', //仅为示例，非真实的接口地址
      filePath: tempFilePaths,
      name: 'file',
      formData: {
        'token': TOKEN,
        'session_key': SESSION_KEY
      },
      success(res) {
       console.log(res);
        
        //do something
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})