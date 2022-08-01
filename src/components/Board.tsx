import * as React from "react";
import { FC } from "react";

export interface Props {
  children: React.ReactNode;
}

export const Board: FC<Props> = (props) => {
  return <div className="board">{props.children}</div>;
};
