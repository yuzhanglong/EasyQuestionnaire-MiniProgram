Component({
  properties: {
    current: String
  },
  methods: {
    handleChange(event) {
      let key = event.detail.key;
      wx.reLaunch({
        url: `/pages/${key}/${key}`
      });
    }
  }
});
