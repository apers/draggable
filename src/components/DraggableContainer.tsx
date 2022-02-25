import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Draggable, DraggableMap, Position } from "./types";
import { v4 as uuidv4 } from "uuid";
import Circle from "./Circle";
import {
  getDraggingItemFromEvent,
  getItemPermutationList,
  updateItemPosition,
} from "./draggableUtils";
import Ruler from "./Ruler";
import "./DraggableContainer.css";

export default function DraggableContainer(props: {
  initialContent: DraggableMap;
}) {
  const { initialContent } = props;

  const [content, setContent] = useState<DraggableMap>(initialContent);
  const [movingItem, setMovingItem] = useState<Draggable | null>(null);

  const [movingItemInitialPosition, setMovingItemInitialPosition] =
    useState<Position>({
      x: 0,
      y: 0,
    });

  const [startDragPosition, setStartDragPosition] = useState({
    x: 0,
    y: 0,
  });

  const addItem = useCallback(() => {
    const newId = uuidv4();
    setContent({
      [newId]: {
        id: newId,
        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
      },
      ...content,
    });
  }, [content, setContent]);

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (movingItem) {
        let relativeX = event.pageX - startDragPosition.x;
        let relativeY = event.pageY - startDragPosition.y;

        setContent({
          ...updateItemPosition(
            movingItem.id,
            {
              x: movingItemInitialPosition.x + relativeX,
              y: movingItemInitialPosition.y + relativeY,
            },
            content
          ),
        });
      }
    },
    [movingItem, content]
  );

  // Attach event listener to window to always capture mousemove
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove]);

  const itemPermutations = useMemo(() => {
    return getItemPermutationList(content);
  }, [content]);

  return (
    <>
      <div
        className="DraggableContainer"
        onMouseDown={(event) => {
          const draggingItem = getDraggingItemFromEvent(event, content);
          if (draggingItem) {
            setMovingItem(draggingItem);

            setStartDragPosition({
              x: event.pageX,
              y: event.pageY,
            });

            setMovingItemInitialPosition(draggingItem.position);
          }
        }}
        onMouseUp={() => {
          if (movingItem) {
            setMovingItem(null);
          }
        }}
      >
        <button id="add-item" onClick={addItem}>
          Add Item
        </button>
        {itemPermutations.map((itemPair) => (
          <Ruler
            key={itemPair.first.id + itemPair.second.id}
            pair={itemPair}
            onChangeDistance={(itemId, newPosition) => {
              setContent({
                ...updateItemPosition(itemId, newPosition, content),
              });
            }}
          />
        ))}
        {Object.values(content).map((item) => (
          <Circle
            id={item.id}
            key={item.id}
            position={item.position}
            isBeingMoved={movingItem?.id === item.id}
            onChangePosition={(newPosition: Position) => {
              setContent({
                ...updateItemPosition(item.id, newPosition, content),
              });
            }}
          />
        ))}
      </div>
    </>
  );
}
