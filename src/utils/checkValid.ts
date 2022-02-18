const rules = {
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
  mobilePhone: "手机号填写有误",
  email: "邮箱填写有误",
  confirm: "两次密码填写不一致",
};
const checkValid = (type: "mobilePhone" | "email" | "confirm") => {
  return (str: string, ...args: any) => {
    return new Promise((resolve, reject) => {
      if (!rules[type](str, args)) {
        return reject(errorWords[type]);
      }
      resolve("success");
    });
  };
};
export default checkValid;
