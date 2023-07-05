import React from "react";

import "./Header.scss";
import { Badge } from "src/components";
import { ReactComponent as Users } from "src/assets/icons/user-group.svg";
import { ReactComponent as Location } from "src/assets/icons/location-dot.svg";
import { ReactComponent as Link } from "src/assets/icons/link.svg";
import { ReactComponent as Twitter } from "src/assets/icons/twitter.svg";
import { NumFormatter } from "src/util/Util";

type PropTypes = {
  owner: string;
  description: string;
  avatar: string;
  location: string;
  websiteUrl: string;
  twitterUsername: string;
  followers: number;
  isVerified: boolean;
  languages: [];
};

export function ProfileHeader({
  owner,
  description,
  avatar,
  location,
  websiteUrl,
  twitterUsername,
  followers,
  isVerified,
  languages,
}: PropTypes) {
  return (
    <div className="profile border rounded mt-3 p-4">
      <div className="d-flex">
        <div
          className="border d-flex justify-content-center align-items-center"
          style={{
            borderRadius: "50%",
            backgroundColor: "white",
            height: "140px",
            width: "140px",
            minWidth: "140px",
          }}
        >
          <img src={avatar} className="avatar border" />
        </div>

        <div className="ms-4">
          <h1>{owner}</h1>
          <p>{description}</p>
          <div className="mt-2">
            <ul className="d-flex" style={{ gap: "20px" }}>
              <li>
                {followers && (
                  <a href="#" className="fs-7 followers">
                    <Users height="11" className=" icon" />
                    <span className="count text-bold ms-1">
                      {NumFormatter(followers)}
                    </span>
                    <span className="ms-1">Followers</span>
                  </a>
                )}
              </li>
              <li>
                {twitterUsername && (
                  <div>
                    <Twitter height="11" className="icon" />
                    <a href="#" className="hover-undeline fs-7 ms-1">
                      @{twitterUsername}
                    </a>
                  </div>
                )}
              </li>
              <li>
                {location && (
                  <a href="#" className="fs-7 ">
                    <Location height="11" className="icon" />
                    <span className="text-black ms-1">{location}</span>
                  </a>
                )}
              </li>
              <li>
                {websiteUrl && (
                  <div>
                    <Link height="11" className="icon" />
                    <a href="#" className="hover-undeline fs-7 ms-1">
                      {websiteUrl}
                    </a>
                  </div>
                )}
              </li>
              <li>
                {isVerified && (
                  <div className="text-success">
                    <Badge type="success">Verified</Badge>
                  </div>
                )}
              </li>
            </ul>
          </div>

          <div className="mt-3">
            <div className="d-flex" style={{ gap: "15px" }}>
              {languages.map((name: any, i: number) => (
                <Badge
                  type="primary"
                  className={i === 0 ? "selected" : ""}
                  key={i}
                >
                  {name?.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
