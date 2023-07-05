import React, { useState } from "react";

import { ReactComponent as Chevron } from "src/assets/icons/chevron-down.svg";
import { ReactComponent as Link } from "src/assets/icons/up-right-from-square.svg";
import "./NavDropdown.scss";

type PropTypes = {
  name: string;
  options: Array<any>;
};

export function NavDropdown({ name, options }: PropTypes) {
  const [hover, setHover] = useState<boolean>(false);
  const lastIndex = options.length - 1;

  const hoverHandler = (val: boolean) => {
    setHover(val);
  };

  const blurHandler = () => {
    setHover(false);
  };

  return (
    <div
      className="nav-dropdown"
      onMouseEnter={() => hoverHandler(true)}
      onMouseLeave={blurHandler}
    >
      <a href="#" className="dropdown-name">
        {name}
        <Chevron className={hover ? "hovered icon-chevron" : "icon-chevron"} />
      </a>
      <div className={hover ? "show menu-dropdown" : "hide menu-dropdown"}>
        {options.map((items: any, index: number) => {
          return (
            <React.Fragment key={index + "x"}>
              {typeof items.description === "string" ? (
                <a href="#" style={{ display: "flex", gap: "13px" }}>
                  {items.icon && items.icon}
                  <ul
                    className={lastIndex == index ? "p-0" : "border-bottom p-0"}
                  >
                    <li className="menu-header mt-2">{items.header}</li>
                    <li className="menu-description">{items.description}</li>
                  </ul>
                </a>
              ) : (
                <ul
                  className={lastIndex == index ? "p-0" : "border-bottom p-0"}
                >
                  <li className="menu-header mt-3" key={items.key + "a"}>
                    {items.header}
                  </li>
                  {items.description.map((item: any, index: number) => (
                    <a href="#" key={index + "y"}>
                      <li className="menu-description" key={index + "a"}>
                        {item.name}
                        {item.external && <Link className="icon-link" />}
                      </li>
                    </a>
                  ))}
                </ul>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
