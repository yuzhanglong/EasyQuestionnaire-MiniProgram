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
        resolution: [0],
        type: problems[i].type
      });
    }
    this.setData({
      problemResults: res
    })
  },

  formDataChange(event) {
    console.log(event);
    // 目标问题下标
    let problemIndex = event.currentTarget.dataset.problemindex;

    // 目标问题类型下标
    let problemType = event.currentTarget.dataset.problemtype;

    // 表单  单选题或多选题 || 评价题 || 填空题
    let newForm = event.detail.value || event.detail.index || event.detail.detail.value;

    // 取出目标问题
    let targetProblem = this.data.problemResults[problemIndex];

    // 开始更新表单
    if (problemType === "SINGLE_SELECT") {
      targetProblem.resolution[0] = newForm
    }
    if (problemType === "MULTIPLY_SELECT") {
      targetProblem.resolution = newForm
    }
    if (problemType === "SCORE") {
      targetProblem.resolution[0] = newForm
    }
    if (problemType === "BLANK_FILL") {
      targetProblem.resolution[0] = newForm
    }

    let p = 'problemResults[' + problemIndex + ']';
    this.setData({
      [p]: targetProblem
    })
  },

  saveCompleteForm() {
    if (!this.checkIsComplete()) {
      MessageBox.handleWarning({
        message: "请完成所有必填项 O(∩_∩)O"
      });
      return
    }

    if (this.checkIsSubmit() && this.basicInfo.equipmentControl) {
      MessageBox.handleWarning({
        message: "每个用户只能填写一次 请不要重复填写"
      });
      return
    }

    CompleteRequest.submitComplete(this.data.problemResults, this.data.qid)
      .then(() => {
        wx.redirectTo({
          url: "/pages/success/success"
        })

      })
      .catch(() => {
        MessageBox.handleError({
          message: "抱歉 提交失败"
        });
      })
  },


  checkIsComplete() {
    for (let i = 0; i < this.data.problems.length; i++) {
      if (this.data.problems[i].isRequire && !this.problemResults[i].resolution.length) {
        return false;
      }
    }
    return true;
  },

  checkIsSubmit() {
    let data = wx.getStorageSync(this.data.qid);
    return !!(data && data.length);
  },

  setIsSubmit() {
    wx.setStorageSync(this.data.qid, this.data.qid);
  },
});