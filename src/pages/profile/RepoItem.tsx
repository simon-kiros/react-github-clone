import React from "react";

import "./Profile.scss";
import { Badge, Label } from "src/components";
import { ReactComponent as Bookmark } from "src/assets/icons/book-bookmark.svg";
import { ReactComponent as Star } from "src/assets/icons/circle-star.svg";
import ReactTimeAgo from "react-time-ago";

type PropTypes = {
  stared?: boolean;
  description: string;
  type: string;
  primaryLanguage?: string;
  star?: number;
  fork?: number;
  issue?: number;
  pull?: number;
  nameWithOwner: string;
  updatedAt: string;
  ind?: string;
};
function RepoItem({
  stared,
  description,
  type,
  primaryLanguage,
  star,
  fork,
  issue,
  pull,
  nameWithOwner,
  updatedAt,
  ind,
}: PropTypes) {
  const Icon = stared ? Star : Bookmark;
  const profileLink =
    "/profile/" + nameWithOwner?.split("/")[0] + "/" + type?.toLowerCase();
  const RepoLink =
    "/repository/" +
    nameWithOwner?.split("/")[0] +
    "/" +
    nameWithOwner?.split("/")[1] +
    "/tree";

  return (
    <div className="repository-item d-flex rounded mb-2" key={ind + "a"}>
      <div>
        <div className="me-2">
          <Icon height="15" className="icon-muted" />
        </div>
      </div>
      <div>
        <div className="">
          <a href={profileLink} className="text-primary hover-undeline">
            {nameWithOwner?.split("/")[0]} <span className="me-1">/</span>
          </a>
          <a href={RepoLink} className="text-primary hover-undeline me-3 ">
            {nameWithOwner?.split("/")[1]}
          </a>
          <Badge type="secondary">Public</Badge>
        </div>
        <div className="d-flex">
          <p className="fs-7 text-muted">
            {description} {type}
          </p>
        </div>
        <div>
          <ul
            className="list-unstyled d-flex align-items-center mt-2"
            key={ind}
          >
            <li>
              <Label type="color">{primaryLanguage}</Label>
            </li>
            <li>
              <Label type="star">{star?.toLocaleString()}</Label>
            </li>
            <li>
              <Label type="license">license</Label>
            </li>
            <li>
              <Label type="fork">{fork?.toLocaleString()}</Label>
            </li>
            <li>
              <Label type="issue">{issue?.toLocaleString()}</Label>
            </li>
            <li>
              <Label type="pull">{pull?.toLocaleString()}</Label>
            </li>

            <li>
              <span className="fs-8 text-muted">
                Updated{" "}
                <ReactTimeAgo date={new Date(updatedAt)} locale="en-US" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RepoItem;
