import React, { useEffect, useState } from "react";

import "./Label.scss";
import { ReactComponent as Star } from "src/assets/icons/star.svg";
import { ReactComponent as Scale } from "src/assets/icons/scale-balanced.svg";
import { ReactComponent as Fork } from "src/assets/icons/code-fork.svg";
import { ReactComponent as Scrubber } from "src/assets/icons/scrubber.svg";
import { ReactComponent as Pull } from "src/assets/icons/code-pull-request.svg";

export function Label({ type, children }: { type: string; children: any }) {
  let Icon: any;
  const [color, setColor] = useState("");

  useEffect(() => {
    setColor(
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    );
  }, []);

  if (type === "color")
    Icon = <span className="color" style={{ backgroundColor: color }}></span>;
  else if (type === "star") Icon = Star;
  else if (type === "license") Icon = Scale;
  else if (type === "fork") Icon = Fork;
  else if (type === "issue") Icon = Scrubber;
  else if (type === "pull") Icon = Pull;

  return (
    <a className="icon-label fs-8 me-3 d-flex align-items-center">
      {type !== "color" ? <Icon height="11" /> : Icon}
      <span className="ms-1">{children}</span>
    </a>
  );
}
