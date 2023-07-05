import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

import "./Box.scss";
import { ReactComponent as Folder } from "src/assets/icons/folder-blank.svg";
import { ReactComponent as File } from "src/assets/icons/file.svg";

type propTypes = {
  entries?: any;
  avatar?: string;
  username?: string;
  messageHeadline?: string;
  committedDate: string;
};
function Box({
  entries,
  avatar,
  username,
  messageHeadline,
  committedDate,
}: propTypes) {
  let { owner, name, type, ...rest } = useParams();
  const location = useLocation();

  return (
    <div className="box border rounded">
      <ul>
        <li className="header d-flex fs-7 align-items-center border-bottom">
          <img
            src={avatar}
            className="border me-2 avatar"
            style={{ width: "25px", height: "25px", borderRadius: "50%" }}
          />
          <a href="#" className="text-black hover-undeline me-2">
            {username}
          </a>
          <a href="#" className="hover-undeline flex-grow-1 fs-7 opacity-75">
            {messageHeadline}
          </a>

          <a className=" undeline opacity-75 fs-7 ">
            <ReactTimeAgo date={new Date(committedDate)} locale="en-US" />
          </a>
        </li>
        {entries.map((entry: any, i: number) =>
          entry.type === "tree" ? (
            <li
              className="d-flex align-items-center border-bottom px-3 py-2"
              key={i}
            >
              <div className="flex-grow-1">
                <Folder
                  height="16"
                  className="icon me-3"
                  style={{ fill: "#54aeff" }}
                />

                <Link
                  to={location.pathname + "/" + entry.name}
                  className="hover-undeline fs-7"
                >
                  {entry.name}
                </Link>
              </div>
              <span className="text-muted fs-7">tree</span>
            </li>
          ) : (
            <li
              className="d-flex align-items-center border-bottom px-3 py-2"
              key={i}
            >
              <div className="flex-grow-1">
                <File height="16" className="icon icon-muted me-3" />

                <Link
                  to={
                    "/repository/" +
                    owner +
                    "/" +
                    name +
                    "/blob/" +
                    (rest["*"] ? rest["*"] + "/" : "") +
                    entry.name
                  }
                  className="hover-undeline fs-7"
                >
                  {entry.name}
                </Link>
              </div>
              <span className="text-muted fs-7">blob</span>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default Box;
