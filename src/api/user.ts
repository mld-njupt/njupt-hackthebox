import { fetchInterface } from "../utils/interfaces"
//注册
const registerApi=(username: string,password: string,email: string,captchaid: string,solution: string):fetchInterface=>{
    return{
        url:"/v1/register",
        body:{
            username,
            password,
            email,
            captchaid,
            solution
        },
        method:"post"
    }
}
//获取注册时的验证码
const getCaptcha=():fetchInterface=>{
    return {
        url:"/v1/captcha",
        method:"get"
    }
}
export {registerApi,getCaptcha}