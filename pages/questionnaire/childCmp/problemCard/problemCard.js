Component({
  properties: {
    problem: Object,
    number: Number,
    onlyShowTitle: Boolean
  },
  data: {},
  methods: {
    gotoEditPrblem() {
      let pid = this.properties.problem.problemId;
      wx.navigateTo({
        url: `/pages/problemEdition/problemEdition?pid=${pid}`
      });
    }
  },
  options: {
    multipleSlots: true
  },
});
