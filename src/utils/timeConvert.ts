function timeConvert(timestamp: number) {
  //num:0 YYYY-MM-DD  num:1  YYYY-MM-DD hh:mm:ss // timestamp:时间戳
  //将时间戳转换成正常时间格式
  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var date = new Date(timestamp * 1000);
  var YY = date.getFullYear() + "-";
  var MM =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var DD = date.getDate() + "   ";
  var hh = date.getHours() + ":";
  var mm =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return YY + MM + DD + hh + mm + ss;
}
export default timeConvert;
