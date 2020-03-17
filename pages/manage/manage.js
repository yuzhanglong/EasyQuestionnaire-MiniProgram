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
        name: '数据分析'
      },
      {
        name: '编辑'
      },
      {
        name: '重命名'
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
  itemClick(e) {
    console.log(e.currentTarget.dataset.qid);
    let targetIndex = e.currentTarget.dataset.index;
    this.setData({
      actionSheetVisible: true,
      activeQuestionnaire: this.data.questionnaires[targetIndex]
    });
    wx.hideTabBar({
      animation: false
    });
  },

  handleClickItem() {

  },

  actionSheetCancel() {
    wx.showTabBar({
      animation: false
    });
    this.setData({
      actionSheetVisible: false
    });
  }
});