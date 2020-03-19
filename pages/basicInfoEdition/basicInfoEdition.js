import {QuestionnaireRequest} from "../../network/questionnaire";
import {MessageBox} from "../../utils/messageBox";

const app = getApp();

Page({
  data: {
    title: "",
    subTitle: "",
    questionnaireId: null
  },

  onLoad(options) {
    this.setData({
      title: options.title,
      subTitle: options.subTitle,
      questionnaireId: options.qid
    });
  },


  editQuestionnaireBasicInfo() {
    let dataMap = {
      title: this.data.title,
      subTitle: this.data.subTitle,
      questionnaireId: this.data.questionnaireId
    };
    QuestionnaireRequest.editQuesitonnaire(dataMap, app.globalData.token)
      .then(() => {
        wx.navigateBack();
      })
      .catch(() => {
        MessageBox.handleError({
          message: "抱歉 编辑失败"
        });
      })
  },

  subTitleChange(event) {
    this.setData({
      subTitle: event.detail.detail.value
    });
  },

  titleChange(event) {
    this.setData({
      title: event.detail.detail.value
    });
  }

});