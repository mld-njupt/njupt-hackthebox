import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Descriptions,
  Drawer,
  Input,
  Notification,
  Table,
  Tabs,
  Typography,
} from "@arco-design/web-react";
import { useFetch } from "../../utils/customHooks";
import { registerConfigInterface } from "../../utils/interfaces";
import { useFocus } from "../../utils/customHooks";
import checkValid from "../../utils/checkValid";
import ParticleWave from "../../utils/canvasInit";
import debounce from "../../utils/debounce";
import { getCaptcha, registerApi } from "../../api/user";
import "./Register.scss";
import ReactMarkdown from "react-markdown";
import { submitFlag } from "../../api/competition";
import timeConvert from "../../utils/timeConvert";
const words = {
  logo: "0xGame & X1cT34m.com",
  title: "注册",
  email: "邮箱",
  account: "用户名",
  password: "密码",
  confirmPassword: "确认密码",
  verificationCode: "验证码",
  register: "注册",
  challenge: "萌新签到题，必做～",
};
const Register = () => {
  const navigate = useNavigate();
  const [usernameRef, usernameFocus] = useFocus<HTMLInputElement>();
  const [passwordRef, passwordFocus] = useFocus<HTMLInputElement>();
  const [emailRef, emailFocus] = useFocus<HTMLInputElement>();
  const [codeRef, codeFocus] = useFocus<HTMLInputElement>();
  const [confirmRef, confirmFocus] = useFocus<HTMLInputElement>();
  const [siderVisible, setSiderVisible] = useState<boolean>(false);
  const [flag, setFlag] = useState<string>("");
  const [questionDetail, setQuestionDetail] = useState<any>({});
  const [singleChallengeSolvedInfo, setSingleChallengeSolvedInfo] = useState<
    any[]
  >([]);
  const [registerConfig, setRegisterConfig] = useState<registerConfigInterface>(
    {
      username: "",
      password: "",
      confirm: "",
      email: "",
      code: "",
    }
  );
  const [[codeData], getCodeData] = useFetch(getCaptcha());
  const [[registerData], register] = useFetch(
    registerApi(
      registerConfig.username,
      registerConfig.password,
      registerConfig.email,
      codeData && codeData.data.id,
      registerConfig.code
    )
  );
  const handleInput = (configType: string) => {
    return (e: any) => {
      setRegisterConfig({ ...registerConfig, [configType]: e.target.value });
    };
  };
  const handleSubmit = async () => {
    try {
      await checkValid("isNull")(registerConfig.username, "username");
      await checkValid("isNull")(registerConfig.password, "password");
      await checkValid("isNull")(registerConfig.email, "email");
      await checkValid("isNull")(registerConfig.code, "code");
      await checkValid("email")(registerConfig.email);
      await checkValid("confirm")(
        registerConfig.password,
        registerConfig.confirm
      );
    } catch (error: any) {
      Notification.error({ title: "Error", content: error });
      return;
    }
    register();
  };
  const changeCode = () => {
    getCodeData();
  };
  useEffect(() => {
    let pw = new ParticleWave();
    pw.run();
    getCodeData();
  }, []);
  useEffect(() => {
    if (registerData && registerData.code === 200) {
      Notification.success({ title: "Success", content: "注册成功" });
      navigate("/login");
    } else {
      registerData &&
        Notification.error({ title: "Error", content: registerData.msg });
      getCodeData();
    }
  }, [registerData]);
  return (
    <div className="register-wrap">
      <canvas></canvas>
      <span className="register-logo">{words.logo}</span>
      <div className="register-input-wrap">
        <div className="register-register">
          <div className="register-title-wrap">
            <div className="register-title">{words.title}</div>
            <div
              className="register-button"
              onClick={() => {
                setSiderVisible(true);
              }}
            >
              {words.challenge}
            </div>
          </div>
          <div className="register-input">
            <span className={emailFocus ? "input-focus" : ""}>
              {words.email}
            </span>
            <input
              ref={emailRef}
              onChange={debounce(handleInput("email"), 500)}
              type="text"
            />
          </div>
          <div className="register-input">
            <span className={usernameFocus ? "input-focus" : ""}>
              {words.account}
            </span>
            <input
              ref={usernameRef}
              onChange={debounce(handleInput("username"), 500)}
              type="text"
            />
          </div>
          <div className="register-input">
            <span className={passwordFocus ? "input-focus" : ""}>
              {words.password}
            </span>
            <input
              ref={passwordRef}
              onChange={debounce(handleInput("password"), 500)}
              type="password"
            />
          </div>
          <div className="register-input">
            <span className={confirmFocus ? "input-focus" : ""}>
              {words.confirmPassword}
            </span>
            <input
              ref={confirmRef}
              onChange={debounce(handleInput("confirm"), 500)}
              type="password"
            />
          </div>
          <div className="register-input">
            <span
              className={codeFocus ? "input-focus" : ""}
              style={{ display: "block" }}
            >
              {words.verificationCode}
            </span>
            <input
              className="code-input"
              ref={codeRef}
              onChange={debounce(handleInput("code"), 500)}
              type="text"
            />
            <img
              onClick={changeCode}
              className="verification-code-img"
              src={codeData ? `data:image/gif;base64,${codeData.data.b64}` : ""}
              alt=""
              style={{
                background: "white",
                cursor: "pointer",
                width: "100px",
                height: "33px",
                float: "right",
              }}
            />
          </div>
          <div className="register-submit" onClick={handleSubmit}>
            {words.register}
          </div>
        </div>
      </div>
      <Drawer
        className="drawer"
        width={700}
        title={<span>{questionDetail?.name}</span>}
        visible={siderVisible}
        footer={null}
        onOk={() => {
          setSiderVisible(false);
        }}
        onCancel={() => {
          setSiderVisible(false);
          setQuestionDetail({});
          setSingleChallengeSolvedInfo([]);
        }}
      >
        <Tabs defaultActiveTab="1">
          <Tabs.TabPane key="1" title="详情">
            <Descriptions
              column={1}
              title="题目信息"
              data={
                questionDetail && [
                  {
                    key: 1,
                    label: "题目ID",
                    value: questionDetail?.id,
                  },
                  {
                    key: 2,
                    label: "题目名称",
                    value: questionDetail?.name,
                  },
                  {
                    key: 3,
                    label: "分数",
                    value: questionDetail?.score,
                  },
                  {
                    key: 4,
                    label: "简介",
                    value: (
                      <ReactMarkdown>
                        {questionDetail?.description}
                      </ReactMarkdown>
                    ),
                  },
                  {
                    key: 5,
                    label: "附件",
                    value: questionDetail?.attachment,
                  },
                  {
                    key: 6,
                    label: "分类",
                    value: questionDetail?.category,
                  },
                  {
                    key: 7,
                    label: "标签",
                    value: questionDetail?.tags,
                  },
                  {
                    key: 8,
                    label: "hints",
                    value: questionDetail?.hints,
                  },
                  {
                    key: 9,
                    label: "已解决人数",
                    value: questionDetail?.solver_count,
                  },
                  {
                    key: 10,
                    label: "状态",
                    value: questionDetail?.is_solved ? "已解决" : "未解决",
                  },
                ]
              }
              style={{ margin: 20 }}
              labelStyle={{ paddingRight: 20 }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane key="2" title="提交flag">
            <Descriptions
              column={1}
              title="提交flag"
              data={[]}
              style={{ margin: "20px 20px 5px 20px" }}
              labelStyle={{ paddingRight: 20 }}
            />
            <Input
              style={{ margin: "0px 20px 0px 20px", width: 350 }}
              allowClear
              placeholder="Please enter your flag here"
              onChange={(e) => {
                // console.log(e);
                setFlag(e);
              }}
            />
            <Button
              style={{ marginLeft: 12 }}
              onClick={() => {
                if (flag !== "") {
                  console.log(flag);
                  submitFlag(questionDetail.id, flag).then((res) => {
                    console.log(res);
                    if (res?.data?.code === 4010) {
                      Notification.warning({
                        title: res?.data?.msg,
                        content: res?.data?.data ? res?.data?.data : "",
                      });
                    } else if (res?.data?.code === 4000) {
                      Notification.error({
                        title: res?.data?.msg,
                        content: res?.data?.data ? res?.data?.data : "",
                      });
                    } else if (res?.data?.code === 200) {
                      Notification.success({
                        title: res?.data?.msg,
                        content: res?.data?.data ? res?.data?.data : "",
                      });
                    }
                  });
                }
              }}
            >
              Submit
            </Button>
          </Tabs.TabPane>
          <Tabs.TabPane key="3" title="提交记录">
            <Typography.Paragraph>
              <Table
                border={false}
                className="tabs"
                columns={[
                  {
                    title: "ID",
                    dataIndex: "id",
                  },
                  { title: "用户名", dataIndex: "username" },
                  {
                    title: "提交时间",
                    dataIndex: "submitted_at",
                    render: (record) => {
                      console.log(record);
                      return timeConvert(parseInt(record));
                    },
                  },
                  { title: "分数", dataIndex: "score" },
                ]}
                data={singleChallengeSolvedInfo}
                pagination={true}
              />
            </Typography.Paragraph>
          </Tabs.TabPane>
        </Tabs>
      </Drawer>
    </div>
  );
};
export default Register;
