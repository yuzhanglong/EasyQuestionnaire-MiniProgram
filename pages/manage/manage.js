import {QuestionnaireRequest} from "../../network/questionnaire";
import {MessageBox} from "../../utils/messageBox";
import {ResponseModel} from "../../models/ResponseModel";


const app = getApp();

Page({
  data: {
    questionnaires: [],
    activeQuestionnaire: {},
    actionSheetVisible: false,
    confirmSpreadVisiable: false,
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

  reLaunchManagePage() {
    wx.reLaunch({
      url: '/pages/manage/manage'
    });
  },

  // 某个问卷标签被单击 弹出操作框
  itemClick(event) {
    let targetIndex = event.currentTarget.dataset.index;
    let operation = 'questionnaireOperation[0].name';
    let newq = this.data.questionnaires[targetIndex];
    this.setData({
      actionSheetVisible: true,
      activeQuestionnaire: newq,
      [operation]: newq.condition ? "取消发布" : "发布"
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
    this.setData({
      confirmSpreadVisiable: true
    });
  },

  // 编辑基本信息
  gotoEditBasicInfo() {
    wx.navigateTo({
      url: `/pages/basicEdition/basicEdition?qid=${this.data.activeQuestionnaire.questionnaireId}`
    })
  },

  // 问卷题目编辑
  gotoEditProblems() {
    wx.navigateTo({
      url: `/pages/questionnaire/questionnaire?qid=${this.data.activeQuestionnaire.questionnaireId}`
    })
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
        this.reLaunchManagePage();
      })
      .catch(res => {
        let response = new ResponseModel(res.data);
        MessageBox.handleSuccess({
          message: response.information
        });
      });
  },


  // 发布确认
  confirmSpread() {
    let data = {
      "questionnaireId": this.data.activeQuestionnaire.questionnaireId,
      "condition": !this.data.activeQuestionnaire.condition
    };
    QuestionnaireRequest.editQuesitonnaire(data, app.globalData.token)
      .then(() => {
        MessageBox.handleSuccess({
          message: "问卷发布成功~"
        });
        this.reLaunchManagePage();
      })
      .catch(res => {
        let response = new ResponseModel(res.data);
        MessageBox.handleSuccess({
          message: response.information
        });
      });
    this.setData({
      confirmSpreadVisiable: false
    });
  },

  cancalSpread() {
    this.setData({
      confirmSpreadVisiable: false
    });
  },
  menuButtonClick() {
    wx.navigateTo({
      url: "/pages/questionnaire/questionnaire?type=new"
    })
  }
});