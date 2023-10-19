import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import NavItem from "./NavItem";
import { useAppContext } from "./AppContext";

function NavComponent() {
  const { data, setData, setSelectedItem } = useAppContext();
  const [activeAccordionKeys, setActiveAccordionKeys] = useState([]);
  const [activeItemKey, setActiveItemKey] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // 默认展开第一层级的所有节点
  useEffect(() => {
    if (isFirstLoad) {
      const firstLevelKeys = data
        .filter((item) => item.parentId === "0")
        .map((item) => item.id);
      setActiveAccordionKeys(firstLevelKeys);

      // 设置为非首次加载
      setIsFirstLoad(false);
    }
  }, [data, isFirstLoad]);

  const toggleAccordionKey = (key) => {
    if (activeAccordionKeys.includes(key)) {
      setActiveAccordionKeys((prevKeys) => prevKeys.filter((k) => k !== key));
    } else {
      setActiveAccordionKeys((prevKeys) => [...prevKeys, key]);
    }
  };

  const renderNavItems = (items, parentId = "0", level = 0) => {
    return items
      .filter((item) => item.parentId === parentId)
      .sort((a, b) => a.seq - b.seq)
      .map((item) => {
        return (
          <NavItem
            key={item.id}
            item={item}
            level={level}
            data={data}
            setData={setData}
            activeItemKey={activeItemKey}
            setActiveItemKey={setActiveItemKey}
            setSelectedItem={setSelectedItem}
            activeAccordionKeys={activeAccordionKeys}
            toggleAccordionKey={toggleAccordionKey}
            renderNavItems={renderNavItems}
          />
        );
      });
  };

  return (
    <Nav variant="pills" className="flex-column compact-nav">
      {renderNavItems(data)}
    </Nav>
  );
}

export default NavComponent;
