class ProblemModel {
  constructor(json) {
    this.isRequire = json['isRequire'];
    this.options = json['options'];
    this.problemId = json['problemId'];
    this.targetQuestionnaireId = json['targetQuestionnaireId'];
    this.title = json['title'];
    this.type = json['type'];
  }
}

export {
  ProblemModel
}