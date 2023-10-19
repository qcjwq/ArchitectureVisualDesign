import React, { useEffect } from "react";
import mermaid from "mermaid";
import { useAppContext, dfs } from "../AppContext";

function generateMermaidConfig(data, parentId, level = 0, rootChildren = []) {
  let mermaidData = "";
  // 过滤出所有parentId等于当前parentId的子节点
  const children = data.filter((item) => item.parentId === parentId);

  let prevChildId = null; // 用于保存前一个处理过的子节点的ID

  // 如果这是根级别的调用，收集所有parentId=0的节点
  if (parentId === "0") {
    rootChildren = children.map((child) => child.id);
  }

  // 遍历每一个子节点
  children.forEach((child, index) => {
    const childId = child.id; // 获取节点ID
    const childName = child.name || ""; // 获取节点名称

    // 判断是否为subgraph（子图）
    if (!child.isLeaf) {
      mermaidData += `subgraph ${childId}["${childName}"]\n`;
      mermaidData += "direction LR\n"; // 设置子图的方向为从左到右
      // 递归调用以处理子节点
      mermaidData += generateMermaidConfig(
        data,
        child.id,
        level + 1,
        rootChildren
      );
      mermaidData += "end\n";
    } else {
      // 如果是叶子节点，则直接添加
      mermaidData += `${childId}["${childName}"]\n`;
    }

    // 如果存在前一个处理过的节点
    if (prevChildId) {
      const prevChild = data.find((item) => item.id === prevChildId);
      const prevEndNode = prevChild.isLeaf
        ? prevChildId
        : data.find((item) => item.parentId === prevChildId && item.isEnd).id;
      const currentStartNode = child.isLeaf
        ? childId
        : data.find((item) => item.parentId === childId && item.isFirst).id;
      mermaidData += `${prevEndNode} --> ${currentStartNode}\n`;
    }

    // 如果当前节点是叶子节点或者是子图的结束节点，则更新prevChildId
    if (child.isLeaf || child.isEnd) {
      prevChildId = child.id;
    }
  });

  // 如果这是根级别的调用，添加虚线以连接所有parentId=0的节点
  if (parentId === "0" && rootChildren.length > 1) {
    mermaidData += `${rootChildren.join(" -.-> ")}\n`;
  }

  return mermaidData;
}

function MermaidFlowChat() {
  const { data } = useAppContext();

  useEffect(() => {
    if (data && data.length > 0) {
      try {
        const sortedData = dfs(data, "0");
        console.info("sortedData:", JSON.stringify(sortedData));

        mermaid.initialize({ startOnLoad: true });
        const graphDefinition = "graph TD;\n";
        const mermaidConfig =
          graphDefinition + generateMermaidConfig(sortedData, "0", 0);

        console.info("mermaidConfig", mermaidConfig);
        mermaid.render("flowchart", mermaidConfig, (svgCode) => {
          document.getElementById("flowChatContainer").innerHTML = svgCode;
        });
      } catch (e) {
        console.error("Mermaid rendering failed:", e);
      }
    }
  }, [data]);

  return <div id="flowChatContainer"></div>;
}

export default MermaidFlowChat;
