export interface Position {
  x: number;
  y: number;
}

export interface Draggable {
  id: string;
  position: Position;
}

export type DraggableMap = {
  [key: string]: Draggable;
};

export interface Pair<T> {
  first: T;
  second: T;
}
