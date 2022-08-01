import * as React from "react";
import { FC } from "react";

export interface Props {
  onClick?: () => void;
  x: number;
  o: number;
}

export const Square: FC<Props> = (props) => {
  return (
    <div className="square" {...props}>
      {props.x ? "x" : props.o ? "o" : ""}
    </div>
  );
};
