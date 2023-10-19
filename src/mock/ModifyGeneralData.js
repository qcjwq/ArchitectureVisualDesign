const modifyGeneralData = [
  {
    id: "1",
    name: "Upstream",
    sourceParticipant: "",
    targetParticipant: "",
    children: [
      {
        id: "1.1",
        name: "修改单据（商单号）",
        sourceParticipant: "商单",
        targetParticipant: "修改单据"
      },
      {
        id: "1.2",
        name: "创建单据（修改项）",
        sourceParticipant: "商单",
        targetParticipant: "修改单据"
      }
    ]
  },
  {
    id: "2",
    name: "Application",
    sourceParticipant: "",
    targetParticipant: "",
    children: [
      {
        id: "2.1",
        name: "创建单据",
        sourceParticipant: "修改单据",
        targetParticipant: "单据"
      }
    ]
  },
  {
    id: "3",
    name: "Domain",
    sourceParticipant: "",
    targetParticipant: "",
    children: [
      {
        id: "3.1",
        name: "问询",
        sourceParticipant: "单据",
        targetParticipant: "领域服务"
      },
      {
        id: "3.2",
        name: "计费",
        sourceParticipant: "单据",
        targetParticipant: "领域服务"
      },
      {
        id: "3.3",
        name: "生成修改项",
        sourceParticipant: "单据",
        targetParticipant: "修改项"
      },
      {
        id: "3.4",
        name: "生成操作单",
        sourceParticipant: "单据",
        targetParticipant: "操作单"
      },
      {
        id: "3.5",
        name: "保存单据",
        sourceParticipant: "单据",
        targetParticipant: "操作单"
      },
      {
        id: "3.6",
        name: "变更为修改中",
        sourceParticipant: "单据",
        targetParticipant: "操作单"
      },
      {
        id: "3.7",
        name: "抛超时延迟消息",
        sourceParticipant: "单据",
        targetParticipant: "超时QMQ"
      }
    ]
  },
  {
    id: "4",
    name: "Infrastructure",
    sourceParticipant: "",
    targetParticipant: "",
    children: [
      {
        id: "4.1",
        name: "计费API",
        sourceParticipant: "",
        targetParticipant: ""
      },
      {
        id: "4.2",
        name: "单据Repo",
        sourceParticipant: "",
        targetParticipant: ""
      },
      {
        id: "4.3",
        name: "订单状态机API",
        sourceParticipant: "",
        targetParticipant: ""
      },
      {
        id: "4.4",
        name: "超时QMQ",
        sourceParticipant: "",
        targetParticipant: ""
      },
      {
        id: "4.5",
        name: "支付API",
        sourceParticipant: "",
        targetParticipant: ""
      },
      {
        id: "4.6",
        name: "商单API",
        sourceParticipant: "",
        targetParticipant: ""
      },
      {
        id: "4.7",
        name: "投诉单据API",
        sourceParticipant: "",
        targetParticipant: ""
      }
    ]
  }
];
export default modifyGeneralData;
