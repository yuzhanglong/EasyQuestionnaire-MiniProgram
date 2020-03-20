import request from "./requests";


class CompleteRequest {
  static getCondition(qid) {
    return request({
      method: 'get',
      url: 'completes/get_condition/' + qid
    })
  }

  static checkSecretKey(qid, key) {
    return request({
      method: 'post',
      url: 'completes/check_key/' + qid,
      data: {
        secretKey: key !== null ? key : "key"
      }
    })
  }

  static submitComplete(data, qid) {
    let myDate = new Date();
    return request({
      method: 'post',
      url: 'completes/submit_data/' + qid,
      data: {
        completeData: data,
        submitTime: myDate.getTime()
      }
    })
  }
}

export {
  CompleteRequest
}




