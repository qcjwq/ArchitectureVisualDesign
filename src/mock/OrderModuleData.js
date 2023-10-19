const orderModuleData = [
  {
    id: "1",
    name: "订单核心系统模块",
    sourceParticipant: "订单",
    targetParticipant: "核心业务",
    children: [
      {
        id: "1.1",
        name: "核心业务模块",
        children: [
          {
            id: "1.1.1",
            name: "新订处理模块",
            children: [
              {
                id: "1.1.1-1",
                name: "确认单据"
              }
            ]
          },
          {
            id: "1.1.2",
            name: "修改处理模块",
            children: [
              {
                id: "1.1.2-1",
                name: "修改单据"
              }
            ]
          },
          {
            id: "1.1.3",
            name: "取消处理模块",
            children: [
              {
                id: "1.1.3-1",
                name: "取消单据"
              }
            ]
          },
          {
            id: "1.1.4",
            name: "缺陷场景处理模块",
            children: [
              {
                id: "1.1.4-1",
                name: "满房·变价单据"
              }
            ]
          }
        ]
      },
      {
        id: "1.2",
        name: "基础功能",
        children: [
          {
            id: "1.2.1",
            name: "商户处理",
            children: [
              {
                id: "1.2.1-1",
                name: "发单模块"
              },
              {
                id: "1.2.1-2",
                name: "派单·选货"
              }
            ]
          },
          {
            id: "1.2.2",
            name: "基础功能",
            children: [
              {
                id: "1.2.2-1",
                name: "事件·分配"
              },
              {
                id: "1.2.2-2",
                name: "进线·外呼"
              },
              {
                id: "1.2.2-3",
                name: "投诉单据"
              }
            ]
          },
          {
            id: "1.2.3",
            name: "费用处理",
            children: [
              {
                id: "1.2.3-1",
                name: "支付网关"
              },
              {
                id: "1.2.3-2",
                name: "费用计算"
              },
              {
                id: "1.2.3-3",
                name: "发票单据"
              },
              {
                id: "1.2.3-4",
                name: "审核·结算处理"
              }
            ]
          }
        ]
      },
      {
        id: "1.3",
        name: "增值处理模块",
        children: [
          {
            id: "1.3.1",
            name: "会员权益"
          },
          {
            id: "1.3.2",
            name: "促销·优惠券"
          },
          {
            id: "1.3.3",
            name: "保险"
          },
          {
            id: "1.3.4",
            name: "X产品"
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "订单周边系统模块",
    children: [
      {
        id: "2.1",
        name: "咨询协调模块",
        children: [
          {
            id: "2.1-1",
            name: "应急处理单据"
          },
          {
            id: "2.1-2",
            name: "共性处理单据"
          },
          {
            id: "2.1-3",
            name: "客户咨询单据"
          },
          {
            id: "2.1-4",
            name: "商户咨询单据"
          }
        ]
      },
      {
        id: "2.2",
        name: "通知处理模块"
      },
      {
        id: "2.3",
        name: "积分返现处理模块"
      },
      {
        id: "2.4",
        name: "预控模块"
      }
    ]
  }
];
export default orderModuleData;
