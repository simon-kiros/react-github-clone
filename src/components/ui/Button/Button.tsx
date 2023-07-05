import React from "react";

import "./Button.scss";
import { ReactComponent as Bell } from "src/assets/icons/bell.svg";
import { ReactComponent as Fork } from "src/assets/icons/code-fork.svg";
import { ReactComponent as Star } from "src/assets/icons/star.svg";
import { NumFormatter } from "src/util/Util";

type PropTypes = { type: string; text: string; count?: number };

export function Button({ type, text, count }: PropTypes) {
  let Icon: any;
  if (type === "notification") Icon = Bell;
  else if (type === "fork") Icon = Fork;
  else if (type === "star") Icon = Star;
  return (
    <a href="#" className="border  rounded px-2 py-1 me-2 fs-7">
      <Icon height="14" className="icon-muted me-2 opacity-75" />
      <span>{text}</span>
      {count && (
        <span className="ms-2 text-bold fs-8">{NumFormatter(count)}</span>
      )}
    </a>
  );
}
