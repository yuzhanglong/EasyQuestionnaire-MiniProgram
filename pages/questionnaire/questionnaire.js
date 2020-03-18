import {QuestionnaireRequest} from "../../network/questionnaire";

Page({
  data: {
    basicInfo: {
      title: '问卷标题',
      subTitle: '请回答下面的几个问题 非常感谢'
    },
    problems: []
  },

  onLoad(query) {
    // 隐藏小房子
    wx.hideHomeButton();

    console.log(query.qid);
    // 如果是新建模式
    if (query.qid === 'new') {

    }
  },

  getBasicInfo() {
    QuestionnaireRequest.getQuesionnaireCondition()
  },
});