import {
  dealOldPic
} from '../../service/pic.js';

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
    imgUrl: '',
    imgType: {
      '1': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/1.png",
      '2': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/2.png",
      '3': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/3.jpg",
      '4': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/4.png",
      '5': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/5.png",
      '6': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/6.png",
      '7': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/7.png",
      '8': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/8.jpg",
      '9': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/9.jpg",
      '10': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/10.jpg",
      '11': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/11.png",
      '12': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/12.jpg",
      '13': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/13.jpg",
      '14': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/14.jpg",
      '15': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/15.jpg",
      '16': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/16.jpg",
      '17': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/17.jpg",
      '18': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/18.png",
      '19': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/19.png",
      '20': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/20.jpg",
      '21': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/21.jpg",
      '22': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/22.png",
      '23': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/23.png",
      '24': "https://cdn.ai.qq.com/aiplat/ai/upload/doc/facesticker/24.png",
    },
    currentTargetImgType: 1,
    upload_time: '' //上传图片的时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(TOKEN);
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
        wx.uploadFile({
          url: 'http://blog.cn/api/pic', //仅为示例，非真实的接口地址
          filePath: chooseResult.tempFilePaths[0],
          name: 'file',
          header: {
            'token': TOKEN
          },
          success(res) {
            const code = JSON.parse(res.data).code;
            if (code == 1002) {
              wx.showToast({
                title: '请重新登录',
                image: '/asset/pic/err.png',
                duration: 2000
              })
            } else {
              const msg = JSON.parse(res.data).data['msg'];
              const imgUrl = JSON.parse(res.data).data['pic_img'];
              const upload_time = JSON.parse(res.data).data['upload_time'];
              if (msg == 'ok') {
                wx.hideLoading()
                wx.showToast({
                  title: '上传图片成功',
                })
                if (imgUrl) {
                  that.setData({
                    imgUrl,
                    upload_time
                  })
                }
              } else {
                wx.hideLoading()
                wx.showToast({
                  title: '上传图片失败',
                  image: '/asset/pic/err.png',
                  duration: 2000
                })
              }
            }
          }
        })
        // 将图片上传至云存储空间
        // wx.cloud.uploadFile({
        //   // 指定上传到的云路径
        //   cloudPath: timestamp + '.png',
        //   // 指定要上传的文件的小程序临时文件路径
        //   filePath: chooseResult.tempFilePaths[0],
        //   // 成功回调
        //   success: res => {
        //     console.log('上传成功', res)
        //     wx.hideLoading()
        //     wx.showToast({
        //       title: '上传图片成功',
        //     })
        //     if (res.fileID) {
        //       that.setData({
        //         picName: '图片如下',
        //         imgUrl: res.fileID
        //       })
        //     }

        //   },
        // })
      },
    })
  },
  //处理图片
  dealPic() {
    const imgUrl = this.data.imgUrl;
    if (!imgUrl) {
      wx.showToast({
        title: '请先上传图片',
        image: '/asset/pic/err.png',
        duration: 2000
      })
    } else {
      const sticker = this.data.currentTargetImgType;
      const upload_time = this.data.upload_time;
      const token = TOKEN;

      dealOldPic(imgUrl, sticker, upload_time, token).then(res => {
        console.log(res);
        const msg = res.data.data.msg;
        const image = res.data.data.image;
        if (msg != 'ok') {
          wx.showToast({
            title: '图片找不到匹配头像',
            image: '/asset/pic/err.png',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '处理成功,长按图片保存',
          });
          this.setData({
            imgUrl: image
          })
        }
      })
    }
  },
  handleTarget(event) {
    const currentTargetImgType = event.currentTarget.dataset.id;
    this.setData({
      currentTargetImgType
    })
    console.log();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})