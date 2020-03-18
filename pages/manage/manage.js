import {QuestionnaireRequest} from "../../network/questionnaire";
import {MessageBox} from "../../utils/messageBox";
import {ResponseModel} from "../../models/ResponseModel";


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
  onShow() {
    if (!app.globalData.isLogin) {
      app.userInfoReadyCallback = token => {
        this.getUserQuestionnaireInfo(token);
        app.globalData.isLogin = !app.globalData.isLogin;
      };
    } else {
      this.getUserQuestionnaireInfo(app.globalData.token);
    }
  },

  getUserQuestionnaireInfo(token) {
    QuestionnaireRequest.getUserQuestionnaireInfo(token)
      .then(res => {
        this.setData({
          questionnaires: res.data.questionnaires
        });
      })
  },

  menuButtonClick() {
    wx.reLaunch({
      url: '/pages/manage/manage'
    });
  },

  // 某个问卷标签被单击 弹出操作框
  itemClick(event) {
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
    this.setData({
      actionSheetVisible: false,
    });
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
    wx.navigateTo({
      url: `/pages/basicEdition/basicEdition?qid=${this.data.activeQuestionnaire.questionnaireId}`
    })
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
    let qid = this.data.activeQuestionnaire.questionnaireId;
    let token = app.globalData.token;
    QuestionnaireRequest.deleteQuestionnaire(qid, token)
      .then(res => {
        let response = new ResponseModel(res.data);
        MessageBox.handleSuccess({
          message: response.information
        });
        wx.reLaunch({
          url: '/pages/manage/manage'
        });
      })
      .catch(res => {
        let response = new ResponseModel(res.data);
        MessageBox.handleSuccess({
          message: response.information
        });
      });
  },
});