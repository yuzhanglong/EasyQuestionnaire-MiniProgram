class ResponseModel {
  constructor(json) {
    if (json['errorCode']) {
      this.errorCode = json['errorCode'];
    }
    if (json['information']) {
      this.information = json['information'];
    }
  }
}

export {
  ResponseModel
}