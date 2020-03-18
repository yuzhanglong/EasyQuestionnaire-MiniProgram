class TimeHelper {
  static GMTtoDate(time) {
    let date = new Date(time);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  static GMTtoTime(time) {
    let date = new Date(time);
    console.log(`${date.getHours()}:${date.getMinutes() + 1}:${date.getSeconds()}`);
    return `${date.getHours()}:${date.getMinutes() + 1}:${date.getSeconds()}`
  }
}

export {
  TimeHelper
}