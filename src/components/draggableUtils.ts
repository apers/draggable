import React from "react";
import { Draggable, DraggableMap, Pair, Position } from "./types";

export function getDraggingItemFromEvent(
  event: React.MouseEvent<HTMLDivElement>,
  content: DraggableMap
): Draggable | null {
  const target = event.target;

  if (target instanceof HTMLDivElement) {
    return content[target.id];
  } else {
    return null;
  }
}

export function updateItemPosition(
  id: string,
  draggingItemPosition: Position,
  content: DraggableMap
): DraggableMap {
  content[id].position = draggingItemPosition;
  return content;
}

export function getItemPermutationList(
  content: DraggableMap
): Pair<Draggable>[] {
  const draggable = Object.values(content);
  const result: Pair<Draggable>[] = [];

  for (let startIndex = 0; startIndex < draggable.length; startIndex++) {
    for (let current = startIndex + 1; current < draggable.length; current++) {
      result.push({
        first: draggable[startIndex],
        second: draggable[current],
      });
    }
  }

  return result;
}

export function getAngleBetweenPoints(a: Position, b: Position): number {
  const deltaX = a.x - b.x;
  const deltaY = a.y - b.y;
  return Math.atan2(deltaY, deltaX);
}

export function getMiddlePoint(a: Position, b: Position): Position {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}

export function getDistanceBetweenPoints(a: Position, b: Position): number {
  return Math.floor(Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)));
}

export function getCoordinateFromDistance(
  pos: Position,
  distance: number,
  angle: number
): Position {
  return {
    x: pos.x + distance * Math.cos(angle),
    y: pos.y + distance * Math.sin(angle),
  };
}
