//app.js
import {UserRequest} from "./network/user";

const TOKEN = 'token';

App({
  globalData: {
    userInfo: null,
    token: '',
    isLogin: false
  },
  onLaunch: function () {
    const token = wx.getStorageSync(TOKEN);
    if (token) {
      this.checkToken(token);
      this.getUserInfo();
    } else {
      this.weChatLogin();
    }
  },

  checkToken(token) {
    UserRequest.checkToken(token)
      .then(res => {
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

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.getUserInfo();
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              this.getUserInfo();
            }
          })
        }
      }
    })
  },

  getUserInfo() {
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        console.log(res);
        this.globalData.userInfo = res.userInfo
      }
    })
  }
});