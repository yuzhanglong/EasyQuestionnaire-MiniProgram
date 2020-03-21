// pages/profile/profile.js

const app = getApp();


Page({
  data: {
    userInfo: {}
  },

  onLoad: function () {
    // 隐藏小房子
    wx.hideHomeButton();

    // 拉取个人信息
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },

});