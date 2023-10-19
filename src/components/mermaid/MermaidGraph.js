import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { useAppContext, dfs } from "../AppContext";

function MermaidGraph() {
  const { data } = useAppContext(); // 从应用上下文获取数据
  const containerRef = useRef(null); // 使用ref来操作DOM元素

  useEffect(() => {
    if (data && data.length > 0) {
      try {
        // 对数据进行深度优先遍历
        const sortedData = dfs(data, "0"); // 假设根节点的 parentId 是 "0"

        mermaid.initialize({ startOnLoad: true });
        const graphDefinition = "graph LR;";
        const mermaidData = sortedData
          .map((item) => {
            if (item.parentId && item.parentId !== "0") {
              return `${item.parentId} --> ${item.id}["${item.name}"]`;
            }
            return `${item.id}["${item.name}"]`;
          })
          .filter(Boolean)
          .join("\n");

        const mermaidConfig = graphDefinition + "\n" + mermaidData;
        console.info("mermaidConfig", mermaidConfig);

        mermaid.render("mermaidGraph", mermaidConfig, (svgCode) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svgCode;
          }
        });
      } catch (e) {
        console.error("Mermaid rendering failed:", e);
      }
    }
  }, [data]);

  return <div ref={containerRef} id="mermaidGraphContainer"></div>;
}

export default MermaidGraph;
