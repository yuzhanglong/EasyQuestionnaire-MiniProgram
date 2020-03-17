import request from "./requests";
import {base64} from "../utils/base64";


class QuestionnaireRequest {
  static getUserQuestionnaireInfo(token) {
    return request({
      url: "questionnaires/get_all_questionnaire",
      method: "get",
      data: null,
      header: {
        "authorization": "Basic " + base64.encode(`${token}:`)
      }
    });
  }
}

export {
  QuestionnaireRequest
}