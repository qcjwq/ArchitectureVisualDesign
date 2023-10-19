const modifyReceiptData = [
  {
    id: "1",
    name: "申请提前离店",
    sourceParticipant: "订单",
    targetParticipant: "修改单据",
    children: [
      {
        id: "11",
        name: "创建单据",
        sourceParticipant: "修改单据",
        targetParticipant: "修改单据"
      },
      {
        id: "12",
        name: "创建商单",
        sourceParticipant: "修改单据",
        targetParticipant: "资源单服务"
      },
      {
        id: "13",
        name: "提交商单",
        sourceParticipant: "修改单据",
        targetParticipant: "资源单服务",
        children: [
          {
            id: "14",
            name: "订单提交消息",
            sourceParticipant: "资源单服务",
            targetParticipant: "QMQ"
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "商户处理",
    sourceParticipant: "订单",
    targetParticipant: "确认单据",
    children: [
      {
        id: "21",
        name: "创建确认单据",
        sourceParticipant: "QMQ",
        targetParticipant: "确认单据"
      },
      {
        id: "22",
        name: "关联修改单据",
        sourceParticipant: "确认单据",
        targetParticipant: "修改单据"
      },
      {
        id: "23",
        name: "发单",
        sourceParticipant: "确认单据",
        targetParticipant: "EBK商户"
      },
      {
        id: "24",
        name: "发单回调",
        sourceParticipant: "确认单据",
        targetParticipant: "修改单据"
      },
      {
        id: "25",
        name: "商户回传",
        sourceParticipant: "EBK商户",
        targetParticipant: "确认单据"
      },
      {
        id: "26",
        name: "发单回传",
        sourceParticipant: "确认单据",
        targetParticipant: "修改单据"
      }
    ]
  },
  {
    id: "3",
    name: "订单修改",
    sourceParticipant: "订单",
    targetParticipant: "修改单据",
    children: [
      {
        id: "31",
        name: "客商换绑",
        sourceParticipant: "修改单据",
        targetParticipant: "资源单服务"
      },
      {
        id: "32",
        name: "取消原商单",
        sourceParticipant: "修改单据",
        targetParticipant: "资源单服务"
      }
    ]
  }
];

export default modifyReceiptData;
