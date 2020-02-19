import {
  baseUrl
} from './config.js';

export default function(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + options.url,
      data: options.data || {},
      header: options.header || {},
      method: options.method || 'get',
      success: resolve,
      fail: reject
    })
  })
}