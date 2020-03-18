Component({
  properties: {
    current: String
  },
  methods: {
    handleChange(event) {
      let key = event.detail.key;
      wx.navigateTo({
        url: `/pages/${key}/${key}`
      });
    }
  }
});
