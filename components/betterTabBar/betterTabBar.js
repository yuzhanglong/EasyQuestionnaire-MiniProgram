Component({
  properties: {
    current: String
  },
  methods: {
    handleChange(event) {
      let key = event.detail.key;
      console.log(key);
      let url = null;
      key === 'questionnaire' ? url = '/pages/questionnaire/questionnaire?qid=new' : `/pages/${key}/${key}`;
      wx.navigateTo({
        url: url
      });
    }
  }
});
