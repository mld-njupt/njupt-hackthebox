import { Table } from "@arco-design/web-react";
import handleTableData from "../../utils/handleTableData";
import {
  IconCaretUp,
  IconCaretDown,
  IconMinus,
} from "@arco-design/web-react/icon";
import "./UDTable.scss";
import { useEffect } from "react";

const IconUp = <IconCaretUp style={{ color: "#9fef00" }}></IconCaretUp>;
const IconDown = <IconCaretDown style={{ color: "red" }}></IconCaretDown>;
const IConH = <IconMinus style={{ color: "#525c70" }}></IconMinus>;
const columns = [
  {
    title: "RANK",
    dataIndex: "rank",
    render: (col: any, record: any, index: any) => (
      <div className="rank-wrap">
        {record.rank.state === "up"
          ? IconUp
          : record.rank.state === "down"
          ? IconDown
          : IConH}
        <div className="rank">{record.rank.rank}</div>
      </div>
    ),
  },
  {
    title: "PLAYER",
    dataIndex: "player",
    render: (col: any, record: any, index: any) => (
      <div className="player-wrap">
        <div
          className="img-wrap"
          style={{ backgroundImage: `url(${record.player.imgUrl})` }}
        ></div>
        <div className="msg-wrap">
          <div className="name">{record.player.name}</div>
          <div className="status">{record.player.status}</div>
        </div>
      </div>
    ),
  },
  {
    title: "PONITS",
    dataIndex: "points",
  },
  {
    title: "USERS",
    dataIndex: "users",
    render: (col: any, record: any, index: any) => (
      <div className="users-wrap">
        <div className="points">{record.users.points}</div>
        <div
          className="img"
          style={{
            backgroundImage:
              "url(https://app.hackthebox.com/images/icons/ic-machines/ic-userblood.svg)",
          }}
        ></div>
        <div className="red-points">{record.users.redPoints}</div>
      </div>
    ),
  },
  {
    title: "SYSTEMS",
    dataIndex: "systems",

    render: (col: any, record: any, index: any) => (
      <div className="systems-wrap">
        <div className="points">{record.systems.points}</div>
        <div
          className="img"
          style={{
            backgroundImage:
              "url(https://app.hackthebox.com/images/icons/ic-machines/ic-rootblood.svg)",
          }}
        ></div>
        <div className="red-points">{record.systems.redPoints}</div>
      </div>
    ),
  },
  {
    title: "CHALLENGES",
    dataIndex: "challenges",
  },
  {
    title: "PORTRESSES",
    dataIndex: "portresses",
  },
  {
    title: "ENDGAMES",
    dataIndex: "endgames",
  },
];

// const data = [
// {
//   rank: {
//     rank: 1,
//     state: "up",
//   },
//   player: {
//     name: "xct",
//     imgUrl:
//       "https://www.hackthebox.com/storage/avatars/e02601e7f4cb3dce6f3744254dcc4f7d.png",
//     status: "GURU",
//   },
//   points: 2098,
//   users: {
//     points: 201,
//     redPoints: 9,
//   },
//   systems: {
//     points: 201,
//     redPoints: 10,
//   },
//   challenges: 218,
//   portresses: 40,
//   endgames: 14,
// },
//   {
//     rank: {
//       rank: 2,
//       state: "down",
//     },
//     player: {
//       name: "mld",
//       imgUrl:
//         "https://www.hackthebox.com/storage/avatars/564e4e21837a37a1024833573960c973.png",
//       status: "GURU",
//     },
//     points: 2074,
//     users: {
//       points: 201,
//       redPoints: 9,
//     },
//     systems: {
//       points: 201,
//       redPoints: 10,
//     },
//     challenges: 218,
//     portresses: 40,
//     endgames: 14,
//   },
//   {
//     rank: {
//       rank: 3,
//       state: "keep",
//     },
//     player: {
//       name: "rax",
//       imgUrl:
//         "https://www.hackthebox.com/storage/avatars/45237a657d91efd7e6ee103f8bb3142a.png",
//       status: "GURU",
//     },
//     points: 2034,
//     users: {
//       points: 190,
//       redPoints: 9,
//     },
//     systems: {
//       points: 201,
//       redPoints: 10,
//     },
//     challenges: 180,
//     portresses: 30,
//     endgames: 12,
//   },
// ];

const UDTable = (props: any) => {
  const { data } = props;

  const newData = handleTableData(data.data);
  console.log(newData);
  return (
    <div className="table-wrap">
      <Table
        border={false}
        stripe
        columns={columns}
        data={newData}
        pagination={false}
      ></Table>
    </div>
  );
};
export default UDTable;
