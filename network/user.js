import request from "./requests";
import {USER_TYPE} from "./config";
import {base64} from "../utils/base64";

class UserRequest {

  static userLogin(userName, secretCode) {
    return request({
      url: "users/login",
      method: "post",
      data: {
        "userName": userName,
        "secret": secretCode,
        "type": USER_TYPE
      },
      header: {}
    });
  }


  static checkToken(token) {
    return request({
      url: "users/token",
      method: "get",
      data: null,
      header: {
        "authorization": "Basic " + base64.encode(`${token}:`)
      }
    });
  }
}


export {
  UserRequest
}