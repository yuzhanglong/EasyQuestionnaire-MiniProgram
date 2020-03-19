import {QuestionnaireRequest} from "../../network/questionnaire";
import {ProblemModel} from "../../models/problemModel";

const app = getApp();


Page({
  data: {
    problem: {},
    confirmDeleteVisiable: false,
    confirmDeleteAction: [
      {
        name: '取消'
      },
      {
        name: '删除',
        color: '#ed3f14',
        loading: false
      }
    ]
  },
  onLoad: function (options) {
    QuestionnaireRequest.getOneProblem(options.pid, app.globalData.token)
      .then(res => {
        let p = new ProblemModel(res.data);
        this.setData({
          problem: p
        })
      })
      .catch(err => {
        //TODO 错误处理
      })
  },
  titleChange(event) {
    this.setData({
      ['problem.title']: event.detail.detail.value
    });
  },
  addOneOption() {
    let p = this.data.problem;
    p.options.push({
      title: "请为这个选项添加一个标题",
      optionId: new Date().getTime()
    });
    this.setData({
      problem: p
    })
  },
  isRequireChange() {
    this.setData({
      ['problem.isRequire']: !this.data.problem.isRequire
    })
  },


  deleteProblem() {
    this.setData({
      confirmDeleteVisiable: true
    });


  },
  handleClick(event) {
    this.setData({
      confirmDeleteVisiable: false
    });
    let res = event.detail.index;
    if (res) {
      this.gotoDeleteProblem();
    }
  },

  gotoDeleteProblem() {
    let pid = this.data.problem.problemId;
    console.log(this.data.problem);
    console.log(pid);
    QuestionnaireRequest.deleteOneProblem(pid, app.globalData.token)
      .then(() => {
        wx.navigateBack();
      })
      .catch(err => {
        console.log(err);
      })
  },

  saveProblemEdition() {
    QuestionnaireRequest.editOneProblem(this.data.problem, app.globalData.token)
      .then(() => {
        wx.navigateBack();
      })
      .catch(err => {
        console.log(err);
      })
  }
});