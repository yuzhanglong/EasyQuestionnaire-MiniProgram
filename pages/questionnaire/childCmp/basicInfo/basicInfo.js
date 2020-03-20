Component({
  properties: {
    title: String,
    subTitle: String,
    questionnaireId: Number,
    showEditionButtion: Boolean
  },
  data: {},
  methods: {
    gotoEditQuestionnaireBasicInfo() {
      let qid = this.properties.questionnaireId;
      let subTitle = this.properties.subTitle;
      let title = this.properties.title;
      wx.navigateTo({
        url: `/pages/basicInfoEdition/basicInfoEdition?qid=${qid}&title=${title}&subTitle=${subTitle}`
      });
    }
  }
});
