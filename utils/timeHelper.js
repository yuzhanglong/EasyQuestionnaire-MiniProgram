class TimeHelper {
  static GMTtoDate(time) {
    let date = new Date(time);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  static GMTtoTime(time) {
    let date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }
}

export {
  TimeHelper
}