const imgUrls = [
  "https://www.hackthebox.com/storage/avatars/e4bc1f843595a4f4654f328790237298.png",
  "https://www.hackthebox.com/storage/avatars/f8445315f0798f09cded09782fedfe7b.png",
  "https://www.hackthebox.com/storage/avatars/4843587d9c628dd253c9393b893f85f0.png",
  "https://www.hackthebox.com/storage/avatars/cc4bc3ae63abccfc2989495c07b8c1f5.png",
  "https://www.hackthebox.com/storage/avatars/a54ea53eb4a14f387bc9e2bda422976a.png",
  "https://www.hackthebox.com/storage/avatars/e02601e7f4cb3dce6f3744254dcc4f7d.png",
  "https://www.hackthebox.com/storage/avatars/564e4e21837a37a1024833573960c973.png",
  "https://www.hackthebox.com/storage/avatars/45237a657d91efd7e6ee103f8bb3142a.png",
];
const handleTableData = (preData: any) => {
  console.log(preData)
  // return preData.fields.map((value: any, index: number) => {
  //   return {
  //     rank: {
  //       rank: index + 1,
  //       state: "keep",
  //     },
  //     player: {
  //       name: value.username,
  //       imgUrl: imgUrls[index % 8],
  //       status: "GURU",
  //     },
  //     points: value.score,
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
  //   };
  // });
};
export default handleTableData;
