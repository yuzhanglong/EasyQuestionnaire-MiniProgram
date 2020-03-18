import {TimeHelper} from "../utils/timeHelper";

class Questionnaire {
  constructor(json) {
    this.basicInfo = new QuestionnaireCondition(json['basicInfo']);
    this.problems = json['problems'];
  }
}


class QuestionnaireCondition {
  constructor(json) {
    this.condition = json['condition'];
    this.deadlineControl = json['deadlineControl'];
    this.equipmentControl = json['equipmentControl'];
    this.ipControl = json['ipControl'];
    this.isSecret = json['isSecret'];
    this.questionnaireId = json['questionnaireId'];
    this.renewTime = this.reformatDateTime(json['renewTime']);
    this.secretKey = json['secretKey'];
    this.subTitle = json['subTitle'];
    this.title = json['title'];
    this.wechatControl = json['wechatControl'];
    this.deadline = this.reformatDateTime(json['deadline']);
  }

  reformatDateTime(dateTime) {
    // 将gmt时间字符串转化成一个数组 下标0表示date 下标1 表示time 利于微信的picker处理
    let date = TimeHelper.GMTtoDate(dateTime);
    let time = TimeHelper.GMTtoTime(dateTime);
    return [date, time]
  }

}

export {
  QuestionnaireCondition,
  Questionnaire
}