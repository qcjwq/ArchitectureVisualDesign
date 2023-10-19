import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Nav, Card, Accordion } from "react-bootstrap";
import { useAppContext } from "./AppContext";

const ItemType = "NAV_ITEM";

function NavItem({ item, level }) {
  const {
    data,
    handleDrop,
    setSelectedItem,
    activeItemKey,
    setActiveItemKey,
    activeAccordionKeys,
    toggleAccordionKey
  } = useAppContext();

  const [, refDrag] = useDrag({
    type: ItemType,
    item: { id: item.id }
  });

  const [, refDrop] = useDrop({
    accept: ItemType,
    drop: (droppedItem, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop || droppedItem.id === item.id) {
        return;
      }
      handleDrop(item.id, droppedItem.id);
    }
  });

  const hasChildren = data.some((child) => child.parentId === item.id);
  const isActive = activeItemKey === item.id;
  const itemStyle = {
    marginLeft: `${level * 5}px`,
    fontWeight: isActive ? "bold" : "normal",
    color: "#333",
    backgroundColor: isActive ? "#e9ecef" : "transparent",
    padding: "1px",
    lineHeight: "1.3"
  };

  return (
    <div ref={(node) => refDrag(refDrop(node))}>
      {hasChildren ? (
        <Card style={{ border: "none" }}>
          <Card.Header
            onClick={() => toggleAccordionKey(item.id.toString())}
            style={itemStyle}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(item);
                setActiveItemKey(item.id);
              }}
              style={{ display: "inline" }}
            >
              {item.name}
            </div>
            <span style={{ float: "right" }}>
              {activeAccordionKeys && activeAccordionKeys.includes(item.id)
                ? "-"
                : "+"}
            </span>
          </Card.Header>
          <Accordion.Collapse
            in={activeAccordionKeys && activeAccordionKeys.includes(item.id)}
          >
            <Card.Body style={{ padding: "5px" }}>
              {data
                .filter((child) => child.parentId === item.id)
                .sort((a, b) => a.seq - b.seq)
                .map((child) => (
                  <NavItem key={child.id} item={child} level={level + 1} />
                ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ) : (
        <Nav.Link
          onClick={() => {
            setSelectedItem(item);
            setActiveItemKey(item.id);
          }}
          style={itemStyle}
        >
          {item.name}
        </Nav.Link>
      )}
    </div>
  );
}

export default NavItem;
