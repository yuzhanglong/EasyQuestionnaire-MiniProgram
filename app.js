//app.js
import {UserRequest} from "./network/user";

const TOKEN = 'token';

App({
  globalData: {
    userInfo: null,
    token: ''
  },
  onLaunch: function () {
    const token = wx.getStorageSync(TOKEN);
    if (token) {
      this.checkToken(token);
    } else {
      this.weChatLogin();
    }
  },

  checkToken(token) {
    UserRequest.checkToken(token)
      .then(() => {
        this.globalData.token = token;
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(token);
        }
      })
      .catch(() => {
        // 重新登录
        this.weChatLogin();
      })
  },

  weChatLogin() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        UserRequest.userLogin('testNickName', res.code)
          .then(res => {
            this.globalData.token = res.data.token;
            wx.setStorageSync(TOKEN, this.globalData.token);
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res.data.token);
            }
          }).catch(err => {
          //TODO:网络错误处理
          console.log(err);
        });
      }
    });
  }
});