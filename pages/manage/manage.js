import {QuestionnaireRequest} from "../../network/questionnaire";

const app = getApp();

Page({
  data: {
    questionnaires: [],
    activeQuestionnaire: {},
    actionSheetVisible: false,
    questionnaireOperation: [
      {
        name: '发布'
      },
      {
        name: '编辑基本信息'
      },
      {
        name: '编辑题目'
      },
      {
        name: '数据分析'
      },
      {
        name: '删除'
      },
    ]

  },
  onLoad: function () {
    app.userInfoReadyCallback = token => {
      QuestionnaireRequest.getUserQuestionnaireInfo(token)
        .then(res => {
          this.setData({
            questionnaires: res.data.questionnaires
          });
        })
    }
  },
  // 某个问卷标签被单击 弹出操作框
  itemClick(event) {
    console.log(event.currentTarget.dataset.qid);
    let targetIndex = event.currentTarget.dataset.index;
    this.setData({
      actionSheetVisible: true,
      activeQuestionnaire: this.data.questionnaires[targetIndex]
    });
  },

  handleClickItem(event) {
    let type = event.detail.index;
    switch (type) {
      // 发布
      case 0:
        this.gotoSpread();
        break;
      case 1:
        this.gotoEditBasicInfo();
        break;
      case 2:
        this.gotoEditProblems();
        break;
      case 3:
        this.gotoAnalysis();
        break;
      case 4:
        this.gotoDelete();
        break;
    }
  },


  actionSheetCancel() {
    this.setData({
      actionSheetVisible: false
    });
  },

  // 发布问卷
  gotoSpread() {
    console.log('fabu');
  },

  // 编辑基本信息
  gotoEditBasicInfo() {
    console.log('bianjibasic');
  },

  // 问卷题目编辑
  gotoEditProblems() {
    console.log('bianjitimu');
  },

  // 数据分析
  gotoAnalysis() {
    console.log('shujufenxi');
  },

  // 删除
  gotoDelete() {
    console.log('sc');
  },
});