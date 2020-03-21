import {AnalysisRequest} from "../../network/analysis";


const app = getApp();

// 处理填空题的页面
Page({
  data: {
    resolution: {},
    tableColumnForBlankFill: [
      {
        name: "title",
        data: "序号",
        width: 400,
        default: "这个选项没有内容"
      },
      {
        name: "resolution",
        data: "填空内容",
        width: 300,
        default: "这个人啥都没填"
      }
    ],
    publishedResolution: []
  },
  onLoad: function (options) {
    console.log(options);
    let pid = options.pid;
    AnalysisRequest.getProblemAnalysisData(pid, app.globalData.token).then(res => {
      let publishedResolution = [];
      let detailResolution = res.data.problemResolution.resolution;
      let counter = 1;
      for (let i = 0; i < detailResolution.length; i++) {
        if (!detailResolution[i]) continue;
        publishedResolution.push({
          title: counter,
          resolution: detailResolution[i]
        });
        counter++;
      }
      this.setData({
        resolution: res.data.problemResolution,
        publishedResolution: publishedResolution
      })
    })
  }
});