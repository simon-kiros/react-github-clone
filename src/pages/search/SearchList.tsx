import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import RepoItem from "src/pages/profile/RepoItem";
import { SEARCH_REPOS } from "src/graphql/queries";
import { Pagination } from "src/components";
import { useAppDispatch } from "src/redux/hooks";
import { stopLoading } from "src/redux/loadingBarSlice";

type PropTypes = {
  query?: string;
  handleSpin: (value: boolean) => void;
};

function SearchList({ query, handleSpin }: PropTypes) {
  const dispatch = useAppDispatch();

  const { loading, error, data } = useQuery(SEARCH_REPOS, {
    variables: {
      query: "topic:" + query,
    },
  });

  useEffect(() => {
    if (!loading) {
      dispatch(stopLoading());
      handleSpin(false);
    } else handleSpin(true);
  }, [loading]);

  if (loading) return <></>;
  if (error) return <p> Please refresh the page ... {error.message}</p>;
  console.dir(data);
  return (
    <>
      <span
        className="fs-7 position-absolute"
        style={{ marginTop: "-50px", marginLeft: "330px" }}
      >
        {data?.search.repositoryCount.toLocaleString()} repository results
      </span>
      {data?.search.edges.length ? (
        <>
          {data?.search.edges.map((repo: any, i: number) => (
            <RepoItem
              ind={repo.node.id}
              key={repo.node.id}
              nameWithOwner={repo.node.nameWithOwner}
              description={repo.node.description}
              primaryLanguage={repo.node.primaryLanguage?.name}
              star={repo.node.stargazers.totalCount}
              fork={repo.node.forkCount}
              pull={repo.node.pullRequests.totalCount}
              issue={repo.node.issues.totalCount}
              type={repo.node.owner.__typename}
              updatedAt={repo.node.updatedAt}
            />
          ))}
          <Pagination />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default SearchList;
