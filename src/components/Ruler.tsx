import React from "react";
import "./Ruler.css";
import { Draggable, Pair, Position } from "./types";
import {
  getAngleBetweenPoints,
  getCoordinateFromDistance,
  getDistanceBetweenPoints,
  getMiddlePoint,
} from "./draggableUtils";

const RULER_HEIGHT = 4;

export default function Ruler(props: {
  pair: Pair<Draggable>;
  onChangeDistance: (itemId: string, newPosition: Position) => void;
}) {
  const { pair, onChangeDistance } = props;

  const middlePoint = getMiddlePoint(pair.first.position, pair.second.position);

  const rotateRad = getAngleBetweenPoints(
    pair.first.position,
    pair.second.position
  );

  const distance = getDistanceBetweenPoints(
    pair.first.position,
    pair.second.position
  );

  const rotate = `${rotateRad}rad`;
  const translateX = `${middlePoint.x - distance / 2}px`;
  const translateY = `${middlePoint.y - RULER_HEIGHT}px`;

  return (
    <div
      className="Ruler"
      style={{
        width: `${distance}px`,
        transform: `translate(${translateX}, ${translateY}) rotate(${rotate})`,
      }}
    >
      <div className="input-container">
        <input
          type="number"
          value={distance}
          onChange={(event) => {
            console.log("event", event.target.value);
            const newDistance = parseInt(event.target.value);
            const newPos = getCoordinateFromDistance(
              pair.first.position,
              newDistance - distance,
              rotateRad
            );
            onChangeDistance(pair.first.id, newPos);
          }}
        />
      </div>
    </div>
  );
}
