import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { useAppContext, dfs } from "../AppContext";

function SequenceDiagram() {
  const { data } = useAppContext();
  const containerRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      try {
        // 对数据进行深度优先遍历
        const sortedData = dfs(data, "0"); // 假设根节点的 parentId 是 "0"

        mermaid.initialize({ startOnLoad: true });
        const sequenceHeader = "sequenceDiagram";
        const mermaidData = sortedData
          .filter((item) => item.sourceParticipant && item.targetParticipant)
          .map((item) => {
            return `${item.sourceParticipant}->>${item.targetParticipant}: ${item.name}`;
          })
          .filter(Boolean)
          .join("\n");

        const mermaidConfig = sequenceHeader + "\n" + mermaidData;
        console.info("mermaidConfig", mermaidConfig);

        mermaid.render("fixedId", mermaidConfig, (svgCode) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svgCode;
          }
        });
      } catch (e) {
        console.error("Mermaid rendering failed:", e);
      }
    }
  }, [data]);

  return <div ref={containerRef} id="sequenceDiagramContainer"></div>;
}

export default SequenceDiagram;
