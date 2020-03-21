import {AnalysisRequest} from "../../network/analysis";

const app = getApp();


Page({
  data: {
    basicInfo: null,
    resolutions: [],
    tableColumn: [
      {
        name: "title",
        data: "选项",
        width: 400,
        default: "这个选项没有内容"
      },
      {
        name: "resolution",
        data: "选择此项的人数",
        width: 300,
        default: 0
      }
    ],
    tableColumnForScore: [
      {
        name: "title",
        data: "等级(1 - 5)",
        width: 400,
        default: "这个选项没有内容"
      },
      {
        name: "resolution",
        data: "倾向该等级的人数",
        width: 300,
        default: 0
      }
    ]
  },
  onLoad(options) {
    let qid = options.qid;
    AnalysisRequest.getAnalysisData(qid, app.globalData.token)
      .then(res => {
        console.log(res);
        this.setData({
          basicInfo: res.data.basicInfo,
          resolutions: res.data.data
        })
      })
      .catch(err => {
        //TODO: 错误处理
      })
  }
});