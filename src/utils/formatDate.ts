function formDate(value: string) {
  let date =
    value.length === 10
      ? new Date(parseInt(value) * 1000)
      : new Date(parseInt(value));
  let year = date.getFullYear().toString(),
    month = (date.getMonth() + 1).toString(),
    day = date.getDate().toString();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  let time = year + "-" + month + "-" + day;
  return time;
}
export default formDate;
