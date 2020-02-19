import request from './network.js';

export function dealOldPic(imgUrl, sticker, upload_time, token) {
  return request({
    url: '/api/dealPic',
    method: 'post',
    header:{
      token
    },
    data: {
      imgUrl,
      sticker,
      upload_time
    },
  })
}