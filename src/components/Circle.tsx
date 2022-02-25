import React from "react";
import "./Circle.css";
import { Position } from "./types";

export default function Circle(props: {
  id: string;
  position: Position;
  isBeingMoved: boolean;
  onChangePosition: (newPosition: Position) => void;
}) {
  const { id, position, isBeingMoved, onChangePosition } = props;

  return (
    <div
      id={id}
      className={`Circle ${isBeingMoved ? "dragging" : ""}`}
      style={{
        transform: `translate(${position.x - 75}px,${position.y - 75}px)`,
      }}
    >
      <div>
        <label>
          X
          <input
            type="number"
            value={Math.floor(position.x)}
            onChange={(event) => {
              onChangePosition({
                x: parseInt(event.target.value),
                y: position.y,
              });
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Y
          <input
            type="number"
            value={Math.floor(position.y)}
            onChange={(event) => {
              onChangePosition({
                x: position.x,
                y: parseInt(event.target.value),
              });
            }}
          />
        </label>
      </div>
    </div>
  );
}
