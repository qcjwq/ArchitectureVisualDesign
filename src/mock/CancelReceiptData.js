const cancelReceiptData = [
  {
    seq: 1,
    id: "1",
    name: "申请取消",
    sourceParticipant: "订单",
    targetParticipant: "取消单据",
    children: [
      {
        seq: 1,
        id: "11",
        name: "给EBK发取消申请",
        sourceParticipant: "取消单据",
        targetParticipant: "EBK"
      },
      {
        seq: 2,
        id: "13",
        name: "EBK超时未回复",
        sourceParticipant: "发单模块",
        targetParticipant: "取消单据"
      },
      {
        seq: 3,
        id: "NzWFq2jd",
        name: "创事件307213198进人工",
        sourceParticipant: "事件系统",
        targetParticipant: "事件系统"
      },
      {
        seq: 4,
        id: "rohxsWYw",
        name: "EBK回传拒绝",
        sourceParticipant: "EBK",
        targetParticipant: "取消单据"
      },
      {
        seq: 5,
        id: "XMQKglGl",
        name: "取消单据结束",
        sourceParticipant: "取消单据",
        targetParticipant: "取消单据"
      },
      {
        seq: 6,
        id: "JxyNkRqj",
        name: "系统对客通知取消失败",
        sourceParticipant: "取消单据",
        targetParticipant: "客人"
      },
      {
        seq: 7,
        id: "EwWrn0Z1",
        name: "员工关闭事件307213198",
        sourceParticipant: "事件系统",
        targetParticipant: "事件系统"
      },
      {
        seq: 8,
        id: "kugP020Y",
        name: "取消单据结果是拒绝",
        sourceParticipant: "事件系统",
        targetParticipant: "取消单据"
      }
    ]
  },
  {
    seq: 2,
    id: "LwQuzASr",
    name: "客人再次选线取消",
    sourceParticipant: "订单",
    targetParticipant: "取消单据",
    children: [
      {
        seq: 1,
        id: "Zgz3HaMu",
        name: "员工创建事件307222667",
        sourceParticipant: "事件系统",
        targetParticipant: "事件系统"
      },
      {
        seq: 2,
        id: "jNYupJ6Y",
        name: "客人提供了相关证明",
        sourceParticipant: "取消单据",
        targetParticipant: "取消单据",
        children: [
          {
            seq: 2,
            id: "F4oum8Ir",
            name: "EBK回传拒绝",
            sourceParticipant: "EBK",
            targetParticipant: "取消单据"
          },
          {
            seq: 1,
            id: "EaE2X7BA",
            name: "在原取消单据上操作发单",
            sourceParticipant: "取消单据",
            targetParticipant: "发单模块"
          }
        ]
      },
      {
        seq: 3,
        id: "V92uihA2",
        name: "员工再次给酒店发单",
        sourceParticipant: "取消单据",
        targetParticipant: "发单模块",
        children: [
          {
            seq: 1,
            id: "aW9i2Lx8",
            name: "EBK同意免费取消",
            sourceParticipant: "EBK",
            targetParticipant: "取消单据"
          }
        ]
      },
      {
        seq: 4,
        id: "cAJFvbAC",
        name: "员工单据录入协商结果，免费取消，单据结束",
        sourceParticipant: "取消单据",
        targetParticipant: "取消单据"
      },
      {
        seq: 5,
        id: "oEfpiVRW",
        name: "回传状态不一致，系统转人工跟进",
        sourceParticipant: "发单模块",
        targetParticipant: "取消单据"
      },
      {
        seq: 6,
        id: "zFCybmZu",
        name: "事件单307213198重开",
        sourceParticipant: "取消单据",
        targetParticipant: "事件系统"
      }
    ]
  }
];

export default cancelReceiptData;
