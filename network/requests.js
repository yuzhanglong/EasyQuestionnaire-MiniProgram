import {BASE_URL} from "./config";

export default function request(option) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + '/' + option.url,
      method: option.method || 'get',
      data: option.data || {},
      success: result => {
        if (result.statusCode < 300) {
          resolve(result);
        } else {
          reject(result);
        }
      },
      fail: reject,
      header: option.header || {},
    });
  })
}