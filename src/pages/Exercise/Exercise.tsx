import React, { useEffect, useState } from "react";
import {
  Button,
  Descriptions,
  Input,
  Table,
  Tabs,
  Typography,
  Notification,
} from "@arco-design/web-react";
import ReactMarkdown from "react-markdown";
import timeConvert from "../../utils/timeConvert";
import { getSolvedByCid, submitFlag } from "../../api/competition";
import "./Exercise.scss";
function Exercise() {
  const [questionDetail, setQuestionDetail] = useState<any>({});
  const [singleChallengeSolvedInfo, setSingleChallengeSolvedInfo] = useState<
    any[]
  >([]);
  useEffect(() => {
    getSolvedByCid(1).then((res) => {
      setSingleChallengeSolvedInfo(
        res?.data?.data === null ? [] : res?.data?.data
      );
    });
  }, []);
  const [flag, setFlag] = useState<string>("");
  return (
    <div className="exercise-wrap">
      <div className="exercise-header">
        <div className="header-left">
          <div className="exercise-image"></div>
          <div className="exercise-name">mldnjupt</div>
        </div>
        <div className="header-right">
          <div className="points-wrap">
            <div className="points-icon"></div>
            <div className="points">882</div>
          </div>
        </div>
      </div>
      <div className="exercise-content">
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
      </div>
    </div>
  );
}

export default Exercise;
