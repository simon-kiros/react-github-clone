import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";

import "./Navigation.scss";

export function Navigation({ menus }: { menus: any }) {
  const { owner, name, type } = useParams();
  const page = type !== undefined ? type : name;
  let classes;

  return (
    <div className="sticky">
      <ul className="profile-tab navigation2">
        {menus.map((menu: any, i: number) => {
          if (menu.type)
            classes = menu.type.indexOf(page) !== -1 ? "selected p-2" : "p-2";
          else if (menu.default) classes = "selected p-2";
          else classes = "p-2";
          return (
            <li className={classes} key={i}>
              <Link to={menu.url} className="fs-7">
                <menu.Icon height="13" className="icon icon-muted me-2" />
                {menu.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
