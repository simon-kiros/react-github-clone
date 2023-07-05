import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Routes, Route } from "react-router-dom";

import "./Repository.scss";
import { RepositoryHeader } from "src/components";
import { GET_REPO_INFO } from "src/graphql/queries";
import { Navigation } from "src/components";
import Code from "./Code/Code";
import Issues from "./Issues/Issues";
import Pulls from "./Pulls/Pulls";
import Projects from "./Projects/Projects";
import Security from "./Projects/Security";
import Insights from "./Projects/Insights";
import Actions from "./Projects/Actions";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { startLoading, stopLoading } from "src/redux/loadingBarSlice";

import { ReactComponent as CodeSimple } from "src/assets/icons/code-simple.svg";
import { ReactComponent as Scrubber } from "src/assets/icons/scrubber.svg";
import { ReactComponent as Pull } from "src/assets/icons/code-pull-request.svg";
import { ReactComponent as Table } from "src/assets/icons/table-layout.svg";
import { ReactComponent as Shield } from "src/assets/icons/shield-check.svg";
import { ReactComponent as Chart } from "src/assets/icons/chart-line.svg";
import { ReactComponent as Caret } from "src/assets/icons/circle-caret-right.svg";

function Repository() {
  const { owner, name, ...rest } = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, data } = useQuery(GET_REPO_INFO, {
    variables: {
      owner,
      name,
    },
  });

  useEffect(() => {
    if (loading) dispatch(startLoading());
    else dispatch(stopLoading());
  }, [loading]);

  if (loading) return <></>;
  if (error) return <p>Please refresh the page ... {error?.message}</p>;

  const menus = [
    {
      name: "Code",
      Icon: CodeSimple,
      url: "/repository/" + owner + "/" + name + "/tree",
      type: ["tree", "blob"],
    },
    {
      name: "Issues",
      Icon: Scrubber,
      url: "/repository/" + owner + "/" + name + "/issues",
      type: ["issues"],
    },
    {
      name: "Pull Requests",
      Icon: Pull,
      url: "/repository/" + owner + "/" + name + "/pulls",
      type: ["pulls"],
    },
    {
      name: "Actions",
      Icon: Caret,
      url: "/repository/" + owner + "/" + name + "/actions",
      type: ["actions"],
    },
    {
      name: "Projects",
      Icon: Table,
      url: "/repository/" + owner + "/" + name + "/projects",
      type: ["projects"],
    },
    {
      name: "Security",
      Icon: Shield,
      url: "/repository/" + owner + "/" + name + "/security",
      type: ["security"],
    },
    {
      name: "Insights",
      Icon: Chart,
      url: "/repository/" + owner + "/" + name + "/insights",
      type: ["insights"],
    },
  ];

  return (
    <div>
      <RepositoryHeader
        owner={owner}
        name={name}
        star={data?.repository.stargazerCount}
        fork={data?.repository.forkCount}
        type={data?.repository.owner.__typename.toLowerCase()}
      />

      <div
        className="row mt-4"
        style={{ marginRight: "4.5rem", marginLeft: "4.5rem" }}
      >
        <div className="col-3 ps-0 ">
          <Routes>
            <Route path="/:type/*" element={<Navigation menus={menus} />} />
          </Routes>
        </div>
        <div className="col-9 px-0">
          <Routes>
            <Route
              path="/:type/*"
              element={
                <Code
                  repository={
                    data.repository.defaultBranchRef.target.history.nodes[0]
                  }
                  branch={data?.repository.defaultBranchRef.name}
                />
              }
            />
            <Route path="/issues" element={<Issues />} />
            <Route path="/pulls" element={<Pulls />} />
            <Route path="/actions" element={<Actions />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/security" element={<Security />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Repository;
