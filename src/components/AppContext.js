import React, { createContext, useContext, useState } from "react";
import modifyReceiptData from "../mock/ModifyReceiptData";
import orderModuleData from "../mock/OrderModuleData";
import modifyGeneralData from "../mock/ModifyGeneralData";
import cancelReceiptData from "../mock/CancelReceiptData";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export function dfs(data, parentId, result = []) {
  // 根据 parentId 过滤子节点并按照 seq 排序
  const children = data
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => a.seq - b.seq); // 使用 seq 进行排序

  // 设置 isFirst 和 isEnd 属性
  if (children.length === 1) {
    children[0].isFirst = true;
    children[0].isEnd = true;
  } else {
    children.forEach((child, index) => {
      child.isFirst = index === 0;
      child.isEnd = index === children.length - 1;
    });
  }

  for (const child of children) {
    // 先假设每个节点是叶子节点
    child.isLeaf = true;

    result.push(child);
    dfs(data, child.id, result);

    // 如果该节点有子节点，更新 isLeaf 标识
    if (data.some((item) => item.parentId === child.id)) {
      child.isLeaf = false;
    }
  }

  return result;
}

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeItemKey, setActiveItemKey] = useState(null);
  const [seq, setSeq] = useState("");
  const [id, setId] = useState("");
  const [parentId, setParentId] = useState("0");
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [sourceParticipant, setSourceParticipant] = useState("");
  const [targetParticipant, setTargetParticipant] = useState("");
  const [activeAccordionKeys, setActiveAccordionKeys] = useState([]);

  const generateUniqueRandomId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result;
    do {
      result = "";
      for (let i = 0; i < 8; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
    } while (data.some((item) => item.id === result));

    return result;
  };

  const flattenJSON = (nestedData, parentId = "0") => {
    let flatData = [];
    let currentSeq = 1; // 每一层都从1开始编号

    nestedData.forEach((item) => {
      const { children, ...rest } = item;
      rest.parentId = parentId;
      rest.seq = currentSeq++;

      flatData.push(rest);

      if (children && children.length > 0) {
        flatData = [...flatData, ...flattenJSON(children, item.id)];
      }
    });

    return flatData;
  };

  const loadOrderModuleData = () => {
    loadData(orderModuleData);
  };

  const loadDefaultData = () => {
    loadData(cancelReceiptData);
  };

  const loadModifyGeneralData = () => {
    loadData(modifyGeneralData);
  };

  const loadData = (sourceData) => {
    const flatData = flattenJSON(sourceData, "0");
    setData(flatData);
  };

  const updateSeq = (data) => {
    // 创建一个映射，用于存储每个 parentId 下的子节点
    const parentMap = {};
    data.forEach((item) => {
      if (!parentMap[item.parentId]) {
        parentMap[item.parentId] = [];
      }
      parentMap[item.parentId].push(item);
    });

    // 对每一个 parentId 下的子节点重新编号，从1开始
    Object.keys(parentMap).forEach((parentId) => {
      let seq = 1;
      parentMap[parentId].forEach((child) => {
        child.seq = seq++;
      });
    });
  };

  // 更新 selectedItem 的 seq 值
  const updateSelectedItemSeq = (newData, selectedItemId, setSeq) => {
    const updatedSelectedItem = newData.find(
      (item) => item.id === selectedItemId
    );
    if (updatedSelectedItem) {
      setSeq(updatedSelectedItem.seq);
    }
  };

  const handleMoveUp = () => {
    if (!selectedItem) return;

    // 找到与 selectedItem 具有相同 parentId 的所有项，并按 seq 排序
    const sameParentNodes = data
      .filter((item) => item.parentId === selectedItem.parentId)
      .sort((a, b) => a.seq - b.seq);

    const targetIndex = sameParentNodes.findIndex(
      (item) => item.id === selectedItem.id
    );

    if (targetIndex <= 0) return; // 已经在顶部，不能再向上移动

    // 交换 seq
    [sameParentNodes[targetIndex].seq, sameParentNodes[targetIndex - 1].seq] = [
      sameParentNodes[targetIndex - 1].seq,
      sameParentNodes[targetIndex].seq
    ];

    // 更新 data 数组
    const newData = [...data];
    setData(newData);

    // 使用辅助函数来更新 selectedItem 的 seq 值
    updateSelectedItemSeq(newData, selectedItem.id, setSeq);
  };

  const handleMoveDown = () => {
    if (!selectedItem) return;

    // 找到与 selectedItem 具有相同 parentId 的所有项，并按 seq 排序
    const sameParentNodes = data
      .filter((item) => item.parentId === selectedItem.parentId)
      .sort((a, b) => a.seq - b.seq);

    const targetIndex = sameParentNodes.findIndex(
      (item) => item.id === selectedItem.id
    );

    // 如果已经是最后一个，则不能再下移
    if (targetIndex >= sameParentNodes.length - 1) return;

    // 交换 seq
    [sameParentNodes[targetIndex].seq, sameParentNodes[targetIndex + 1].seq] = [
      sameParentNodes[targetIndex + 1].seq,
      sameParentNodes[targetIndex].seq
    ];

    // 更新 data 数组
    const newData = [...data];
    setData(newData);

    // 使用辅助函数来更新 selectedItem 的 seq 值
    updateSelectedItemSeq(newData, selectedItem.id, setSeq);
  };

  const handleAddChild = () => {
    const newId = generateUniqueRandomId();
    const newParentId = selectedItem ? selectedItem.id : "0"; // 默认为根节点

    const newItem = {
      seq: 0, // 占位符，将被 updateSeq 更新
      id: newId,
      name,
      parentId: newParentId,
      domain,
      sourceParticipant,
      targetParticipant
    };

    const newData = [...data, newItem];
    updateSeq(newData);
    setData(newData);
  };

  const handleAddSibling = () => {
    const newId = generateUniqueRandomId();
    const newParentId = selectedItem ? selectedItem.parentId : "0"; // 默认为根节点

    const newItem = {
      id: newId,
      name,
      parentId: newParentId,
      domain,
      sourceParticipant,
      targetParticipant
    };

    let newData;
    if (selectedItem) {
      // 找到选中节点的索引，并在其之后插入新节点
      const selectedIndex = data.findIndex(
        (item) => item.id === selectedItem.id
      );
      newData = [
        ...data.slice(0, selectedIndex + 1),
        newItem,
        ...data.slice(selectedIndex + 1)
      ];
    } else {
      // 如果没有选中节点，则添加到根节点 "0" 的最后
      newData = [...data, newItem];
    }

    updateSeq(newData);
    setData(newData);
  };

  const handleModify = () => {
    const index = data.findIndex(
      (item) => item.id === (selectedItem && selectedItem.id)
    );
    if (index > -1) {
      const newData = [...data];
      const updatedItem = {
        id,
        name,
        parentId,
        domain,
        sourceParticipant,
        targetParticipant
      };
      newData[index] = updatedItem;

      // 现在我们有了包含最新 parentId 的 newData，可以安全地调用 updateSeq
      updateSeq(newData);
      setData(newData);
      setSelectedItem(null);
    }
  };

  const handleDelete = () => {
    if (selectedItem) {
      const newData = data.filter((item) => item.id !== selectedItem.id);
      updateSeq(newData);
      setData(newData);
      setSelectedItem(null);

      console.debug("after deleted:", JSON.stringify(newData));
    }
  };

  const handleExport = () => {
    const nest = nestJSON(data);
    console.info("nest:", JSON.stringify(nest));
  };

  const handleDrop = (newParentId, droppedItemId) => {
    // 找到被拖放的节点
    const droppedItem = data.find((item) => item.id === droppedItemId);
    if (!droppedItem) return;

    // 更新被拖放节点的 parentId
    droppedItem.parentId = newParentId;

    // 创建一个新的数据数组，包含更新后的节点
    const updatedData = data.map((item) => {
      if (item.id === droppedItemId) {
        return droppedItem;
      }
      return item;
    });

    // 更新整个树结构的 seq
    updateSeq(updatedData);

    // 最后，更新组件状态
    setData(updatedData);
  };

  const nestJSON = (flatData, parentId = "0") => {
    const nestedData = [];

    for (let i = 0; i < flatData.length; i++) {
      const item = flatData[i];

      if (item.parentId === parentId) {
        // 仅保留 seq, id, name, domain, sourceParticipant 和 targetParticipant 字段
        const {
          seq,
          id,
          name,
          domain,
          sourceParticipant,
          targetParticipant
        } = item;

        // 创建一个新对象，仅包含所需字段
        const newItem = {
          seq,
          id,
          name,
          domain,
          sourceParticipant,
          targetParticipant
        };

        // 查找子节点并递归
        const children = nestJSON(flatData, item.id);
        if (children.length > 0) {
          newItem.children = children;
        }

        nestedData.push(newItem);
      }
    }

    return nestedData;
  };

  const toggleAccordionKey = (key) => {
    setActiveAccordionKeys((prevKeys) =>
      prevKeys.includes(key)
        ? prevKeys.filter((k) => k !== key)
        : [...prevKeys, key]
    );
  };

  const value = {
    data,
    setData,
    selectedItem,
    setSelectedItem,
    activeItemKey,
    setActiveItemKey,
    seq,
    setSeq,
    id,
    setId,
    parentId,
    setParentId,
    name,
    setName,
    domain,
    setDomain,
    sourceParticipant,
    setSourceParticipant,
    targetParticipant,
    setTargetParticipant,
    loadOrderModuleData,
    loadDefaultData,
    loadModifyGeneralData,
    handleMoveUp,
    handleMoveDown,
    handleAddChild,
    handleAddSibling,
    handleModify,
    handleDelete,
    handleExport,
    handleDrop,
    activeAccordionKeys,
    toggleAccordionKey
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
