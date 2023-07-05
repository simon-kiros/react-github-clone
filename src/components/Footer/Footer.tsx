import React from "react";

import "./Footer.scss";
import { ReactComponent as GithubLogo } from "src/assets/github.svg";

const menus = [
  "Terms",
  "Privacy",
  "Security",
  "Status",
  "Docs",
  "Contact GitHub",
  "Pricing",
  "API",
  "Training",
  "Blog",
  "About",
];
export function Footer() {
  return (
    <div className="footer">
      <div className="border-top h-100">
        <ul className="d-flex list-unstyled align-items-center h-100">
          <li>
            <span className="text-gray fs-8 me-4">
              <GithubLogo
                className="logo me-2"
                width={22}
                style={{ opacity: 0.6 }}
              />
              © 2023 GitHub, Inc.
            </span>
          </li>
          {menus.map((name, i) => (
            <li key={i}>
              <a href="#" className="text-primary hover-undeline fs-8 me-4">
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
