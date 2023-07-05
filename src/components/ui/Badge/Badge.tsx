import React, { useEffect } from "react";

import "./Badge.scss";

type PropType = {
  type: "primary" | "secondary" | "success";
  className?: string;
  children: any;
};
export function Badge({ type, className, children }: PropType) {
  const classes = `badge ${type} ${className}`;

  return (
    <>
      <span className={classes}>{children}</span>
    </>
  );
}
