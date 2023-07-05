import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Routes, Route } from "react-router-dom";

import Box from "./Box";
import SourceCode from "./SourceCode";
import { GET_REPO_ENTRIES } from "src/graphql/queries";
import Readme from "./Readme";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { startLoading, stopLoading } from "src/redux/loadingBarSlice";

type PropTypes = {
  branch: string;
  repository: any;
};

function Code({ repository, branch }: PropTypes) {
  const dispatch = useAppDispatch();
  const { owner, name, type, ...rest } = useParams();
  const { loading, error, data } = useQuery(GET_REPO_ENTRIES, {
    variables: {
      owner,
      name,
      branch: branch + ":" + rest["*"],
      readme: branch + ":README.md",
    },
  });

  useEffect(() => {
    if (loading) dispatch(startLoading());
    else dispatch(stopLoading());
  }, [loading]);

  if (loading) return <p>...</p>;
  if (error) return <p>Please refresh the page ... {error?.message}</p>;

  const entries =
    type === "tree"
      ? [...data.repository.object.entries].sort((a: any, b: any) =>
          b.type.localeCompare(a.type)
        )
      : [];

  return (
    <div>
      {type === "tree" ? (
        <Box
          entries={entries}
          username={repository.author.user.login}
          avatar={repository.author.avatarUrl}
          messageHeadline={repository.messageHeadline}
          committedDate={repository.committedDate}
        />
      ) : (
        <SourceCode branch={branch} />
      )}

      <Routes>
        <Route
          path="/"
          element={<Readme text={data?.repository.readme.text} />}
        />
      </Routes>
    </div>
  );
}

export default Code;
