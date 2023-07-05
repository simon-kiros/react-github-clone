import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";
import { ReactComponent as Bookmark } from "src/assets/icons/book-bookmark.svg";
import { Badge } from "../ui/Badge/Badge";
import { Button } from "src/components";

type PropTypes = {
  owner?: string;
  name?: string;
  fork?: number;
  star?: number;
  type?: string;
};

export function RepositoryHeader({ owner, name, fork, star, type }: PropTypes) {
  const profileUrl = "/profile/" + owner + "/" + type;

  return (
    <div className="repository-header border rounded mt-3 p-4">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Bookmark height="16" className="icon-muted mb-1 opacity-75" />
          <a
            href={profileUrl}
            className="fs-6 hover-undeline ms-2 text-primary"
          >
            {owner} /
          </a>

          <Link
            to={"/repository/" + owner + "/" + name + "/tree"}
            className="fs-6 hover-undeline ms-2 text-primary text-bold"
          >
            {name}
          </Link>
          <span className="ms-3 mb-2">
            <Badge type="secondary">Public</Badge>
          </span>
        </div>
        <div>
          <Button type="notification" text="Notifications" />
          <Button type="fork" text="Fork" count={fork} />
          <Button type="star" text="Star" count={star} />
        </div>
      </div>
    </div>
  );
}
