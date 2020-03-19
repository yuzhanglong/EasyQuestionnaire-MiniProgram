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


  static deleteQuestionnaire(qid, token) {
    return request({
      method: 'post',
      url: 'questionnaires/delete',
      headers: {
        showLoading: true,
        showLoadingType: 0,
      },
      data: {
        "questionnaireId": qid
      },
      header: {
        "authorization": "Basic " + base64.encode(`${token}:`)
      }
    })
  }

  static getQuesionnaireCondition(qid, token) {
    return request({
      method: 'get',
      url: 'questionnaires/get_condition/' + qid,
      header: {
        "authorization": "Basic " + base64.encode(`${token}:`)
      }
    })
  }

  static editQuesitonnaire(data, token) {
    return request({
      method: 'post',
      url: 'questionnaires/edit',
      data: data,
      header: {
        "authorization": "Basic " + base64.encode(`${token}:`)
      }
    })
  }

  static getQuesionnaire(qid, token) {
    return request({
      method: 'get',
      url: 'questionnaires/get_questionnaire/' + qid,
      header: {
        "authorization": "Basic " + base64.encode(`${token}:`)
      }
    })
  }

  static appendOneProblem(problemData, token) {
    return request({
      method: 'post',
      url: 'questionnaires/append_one_problem',
      data: problemData,
      header: {
        "authorization": "Basic " + base64.encode(`${token}:`)
      }
    })
  }

  static getOneProblem(pid, token) {
    return request({
      method: 'get',
      url: 'questionnaires/get_problem/' + pid,
      header: {
        "authorization": "Basic " + base64.encode(`${token}:`)
      }
    })
  }

  //删除一道题目
  static deleteOneProblem(pid, token) {
    return request({
      method: 'post',
      url: 'questionnaires/delete_one_problem',
      data: {
        problemId: pid
      },
      header: {
        "authorization": "Basic " + base64.encode(`${token}:`)
      }
    })
  }

  static editOneProblem(problemInfo, token) {
    return request({
      method: 'post',
      url: 'questionnaires/edit_one_problem',
      data: problemInfo,
      header: {
        "authorization": "Basic " + base64.encode(`${token}:`)
      }
    })
  }


}

export {
  QuestionnaireRequest
}