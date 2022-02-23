import { isValidKey } from "./isValidKey";
const rules = {
  isNull: (str: string, key: string) => {
    if (str == "") {
      return false;
    } else {
      return true;
    }
  },
  mobilePhone: (str: string) => {
    const re = /^1\d{10}$/;
    return re.test(str);
  },
  email: (str: string) => {
    const re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    return re.test(str);
  },
  confirm: (pas: string, confirm: string) => {
    return pas == confirm;
  },
};
const errorWords = {
  isNull: "不能为空",
  mobilePhone: "手机号填写有误",
  email: "邮箱填写有误",
  confirm: "两次密码填写不一致",
};
const keyWords = {
  username: "用户名",
  password: "密码",
  code: "验证码",
  email: "邮箱",
};
const checkValid = (type: "mobilePhone" | "email" | "confirm" | "isNull") => {
  return (str: string, ...args: any) => {
    return new Promise((resolve, reject) => {
      if (!rules[type](str, args)) {
        const error = isValidKey(args, keyWords)
          ? keyWords[args] + errorWords[type]
          : errorWords[type];
        reject(error);
      }
      resolve("success");
    });
  };
};
export default checkValid;
