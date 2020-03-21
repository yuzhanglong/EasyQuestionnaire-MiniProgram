import request from "./requests";
import {base64} from "../utils/base64";

class AnalysisRequest {
  static getAnalysisData(qid, token) {
    return request({
      method: 'get',
      url: 'analysis/' + qid,
      header: {
        "authorization": "Basic " + base64.encode(`${token}:`)
      }
    })
  }
}

export {
  AnalysisRequest
}