import {QuestionnaireRequest} from "../../network/questionnaire";
import {Questionnaire} from "../../models/questionnaireModel";
import {MessageBox} from "../../utils/messageBox";

const app = getApp();

Page({
  data: {
    basicInfo: {
      title: '问卷标题',
      subTitle: '请回答下面的几个问题 非常感谢',
      questionnaireId: null
    },
    problems: [],
    actionSheetVisible: false,
    appProblemOperation: [
      {
        name: '单选题',
        icon: 'success',
      },
      {
        name: '多选题',
        icon: 'createtask'
      },
      {
        name: '填空题',
        icon: 'barrage'
      },
      {
        name: '下拉题',
        icon: 'unfold'
      },
      {
        name: '评价题',
        icon: 'collection'
      },
    ],
    qid: null
  },

  onLoad(query) {
    // 隐藏小房子
    wx.hideHomeButton();

    // 如果是编辑模式
    if (query.qid !== 'new') {
      this.setData({
        qid: query.qid
      });
    } else {
      this.createQuestionnaire();
    }
  },

  createQuestionnaire() {
    QuestionnaireRequest.createQuestionnaire(app.globalData.token)
      .then(res => {
        this.setData({
          'basicInfo.questionnaireId': res.data.questionnaireId
        })
      })
      .catch(err => {
        //TODO:处理错误
        console.log(err);
      })
  },

  onShow() {
    if (this.qid) this.getBasicInfo(this.data.qid);
  },

  getBasicInfo(qid) {
    QuestionnaireRequest.getQuesionnaire(qid, app.globalData.token)
      .then(res => {
        let q = new Questionnaire(res.data);
        this.setData({
          basicInfo: q.basicInfo,
          problems: q.problems
        });
      }).catch(err => {
      //TODO:处理错误
      console.log(err);
    })
  },

  // 添加一个问题

  readyAppendProblem() {
    this.setData({
      actionSheetVisible: true
    });
  },
  handleClickItem(event) {
    let problemTypeArr = ["SINGLE_SELECT", "MULTIPLY_SELECT", "BLANK_FILL", "DROP_DOWN", "SCORE"];
    let type = problemTypeArr[event.detail.index];
    this.appendOneProblem(type).then(() => {
      MessageBox.handleSuccess({
        message: "添加问题成功~"
      });
    })
  },

  async appendOneProblem(problemType) {
    let problemTypeChineseNameMap = {
      "SINGLE_SELECT": "单选题",
      "MULTIPLY_SELECT": "多选题",
      "BLANK_FILL": "填空题",
      "DROP_DOWN": "下拉题",
      "SCORE": "评价题"
    };

    let dataToPush = {
      //制造唯一id
      type: problemType,
      title: `点我为这道${problemTypeChineseNameMap[problemType]}创建一个标题`,
      options: [],
      targetQuestionnaireId: this.data.basicInfo.questionnaireId,
      isRequire: false,
      problemId: null
    };

    let qid;
    try {
      qid = await QuestionnaireRequest.appendOneProblem(dataToPush, app.globalData.token);
    } catch (e) {
      MessageBox.handleError({
        message: "抱歉 添加题目失败"
      });
      return
    }
    dataToPush.problemId = qid['problemId'];
    let t = this.data.problems;
    t.push(dataToPush);
    this.setData({
      problems: t,
      actionSheetVisible: false
    });
  },

  actionSheetCancel() {
    this.setData({
      actionSheetVisible: false
    });
  },
});