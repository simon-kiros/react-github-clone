import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import "./Profile.scss";
import { Pagination, ProfileHeader } from "src/components";
import RepoItem from "./RepoItem";
import { useAppDispatch } from "src/redux/hooks";
import { stopLoading } from "src/redux/loadingBarSlice";
import { GET_ORG_PROFILE, GET_USER_PROFILE } from "src/graphql/queries";
import { Navigation } from "src/components";
import { ReactComponent as Bookmark } from "src/assets/icons/book-bookmark.svg";
import { ReactComponent as Table } from "src/assets/icons/table-layout.svg";
import { ReactComponent as Cube } from "src/assets/icons/cube.svg";
import { ReactComponent as User } from "src/assets/icons/user.svg";

function Profile() {
  let { owner, type } = useParams();
  const dispatch = useAppDispatch();
  let repoType = type === "organization" ? GET_ORG_PROFILE : GET_USER_PROFILE;

  const { loading, error, data } = useQuery(repoType, {
    variables: {
      name: owner,
    },
  });

  useEffect(() => {
    if (!loading) dispatch(stopLoading());
  }, [loading]);

  if (loading) return <></>;
  if (error) return <p>Please refresh the page... {error.message}</p>;

  const menus = [
    {
      name: "Repositories",
      Icon: Bookmark,
      url: "/profile/" + owner + "/" + type,
      default: true,
    },
    {
      name: "Projects",
      Icon: Table,
      url: "/profile/" + owner + "/" + type + "#",
    },
    {
      name: "Packages",
      Icon: Cube,
      url: "/profile/" + owner + "/" + type + "#",
    },
    {
      name: "People",
      Icon: User,
      url: "/profile/" + owner + "/" + type + "#",
    },
  ];

  return (
    <div>
      <ProfileHeader
        owner={data.user.name}
        description={data.user.description}
        avatar={data.user.avatarUrl}
        location={data.user.location}
        websiteUrl={data.user.websiteUrl}
        languages={data.user.repositories.nodes[0].languages.nodes}
        isVerified={data.user.isVerified || false}
        followers={data.user?.followers?.totalCount || null}
        twitterUsername={data.user.twitterUsername}
      />
      <div
        className="row mt-4"
        style={{ marginRight: "4.5rem", marginLeft: "4.5rem" }}
      >
        <div className="col-3 ps-0 ">
          <Navigation menus={menus} />
        </div>
        <div className="col-9 px-0">
          <div className="mb-4">
            {data.user.repositories.nodes.map((a: any, i: number) => {
              if (i < 10) {
                return (
                  <React.Fragment key={i}>
                    <RepoItem
                      stared={i < 3 ? true : false}
                      description={a?.description}
                      nameWithOwner={a?.nameWithOwner}
                      type={a?.owner.__typename}
                      primaryLanguage={a?.primaryLanguage?.name}
                      star={a?.stargazers.totalCount}
                      fork={a?.forkCount}
                      updatedAt={a?.updatedAt}
                      issue={a?.issues?.totalCount}
                      pull={a?.pullRequests?.totalCount}
                    />
                  </React.Fragment>
                );
              }
            })}
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default Profile;
