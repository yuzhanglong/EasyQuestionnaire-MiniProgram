import {CompleteRequest} from "../../network/complete";
import {MessageBox} from "../../utils/messageBox";


Page({
  data: {
    showCheckSecretInput: true,
    showCompleteForm: false,
    topInfo: "loading~",
    qid: null,
    currentSecretKey: "",
    questionnaireData: {},
    problems: [],
    basicInfo: {},
    problemResults: []
  },
  onLoad(options) {
    CompleteRequest.getCondition(options.qid)
      .then(res => {
        let isSecret = res.data.isSecret;
        let condition = res.data.condition;
        this.setData({
          showCheckSecretInput: isSecret,
          showCompleteForm: !isSecret,
          topInfo: this.checkTopInfo(condition, isSecret),
          qid: options.qid
        });
        if (condition && !isSecret) {
          this.checkSecretKey();
        }
      })
  },

  checkTopInfo(condition, isSecret) {
    if (!condition) return "这个问卷已经过期啦~";
    if (isSecret) return "这个问卷被加密了 O(∩_∩)O";
    return ""
  },

  checkSecretKey() {
    let key = this.data.currentSecretKey || "key";
    if (!key || key === "") {
      console.log("输入不得为空");
    }
    CompleteRequest.checkSecretKey(this.data.qid, key)
      .then(res => {
        this.setData({
          topInfo: "标题与描述",
          showCheckSecretInput: false,
          showCompleteForm: true,
          problems: res.data.problems,
          basicInfo: res.data.basicInfo
        });
        this.initResolution(res.data.problems);
      })
      .catch(() => {
        MessageBox.handleError({
          message: "抱歉，密码不正确",
          duration: 1
        })
      })
  },

  secretKeyInputChange(event) {
    let data = event.detail.detail.value;
    this.setData({
      currentSecretKey: data
    })
  },

  // 初始化提交环境
  initResolution(problems) {
    let res = [];
    for (let i = 0; i < problems.length; i++) {
      res.push({
        targetProblemId: problems[i].problemId,
        resolution: [],
        type: problems[i].type
      });
    }
    this.setData({
      problemResults: res
    })
  },

  radioChange(e){
    console.log(e);
  }
});