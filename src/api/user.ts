import { fetchInterface } from "../utils/interfaces"
//注册
const register=()=>{

}
//获取注册时的验证码
const getCaptcha=():fetchInterface=>{
    return {
        url:"/v1/captcha",
        method:"get"
    }
}
export {register,getCaptcha}