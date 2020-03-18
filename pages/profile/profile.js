// pages/profile/profile.js

const app = getApp();


Page({
  data: {
    userInfo: {}
  },

  onLoad: function () {
    //TODO: 个人中心页面
    // 隐藏小房子
    wx.hideHomeButton();

    // 拉取个人信息
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },

});