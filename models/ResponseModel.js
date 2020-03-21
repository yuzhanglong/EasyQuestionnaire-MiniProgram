class ResponseModel {
  constructor(json) {
    if ('errorCode' in json) {
      this.errorCode = json['errorCode'];
    }
    if (json['information'] !== undefined) {
      this.information = json['information'];
    }
  }
}

export {
  ResponseModel
}