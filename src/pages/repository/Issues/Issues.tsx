import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ReactTimeAgo from "react-time-ago";

import { ReactComponent as Scrubber } from "src/assets/icons/scrubber.svg";
import { GET_REPO_ISSUES } from "src/graphql/queries";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { startLoading, stopLoading } from "src/redux/loadingBarSlice";

function Issues() {
  const dispatch = useAppDispatch();
  const { owner, name, ...rest } = useParams();
  const { loading, error, data } = useQuery(GET_REPO_ISSUES, {
    variables: {
      owner,
      name,
    },
  });

  useEffect(() => {
    if (loading) dispatch(startLoading());
    else dispatch(stopLoading());
  }, [loading]);

  if (loading) return <p>...</p>;
  if (error) return <p>Error occured... {error?.message}</p>;

  return (
    <div className="issues box border rounded">
      <ul>
        <li className=" d-flex fs-7 align-items-center border-bottom p-3 bg-primary">
          <Scrubber height="15" className="me-2" />
          <label className="fs-8">
            <span className="opacity-75 me-2">
              {data.repository.issues.totalCount}
            </span>
            Open
          </label>
        </li>
        {data?.repository.issues.edges.map((item: any, i: number) => (
          <li className=" border-bottom px-3 py-2" key={i}>
            <div className="fs-6 text-gray">
              <Scrubber height="15" className="me-2 icon-success" />
              <a href="#">{item?.node.title}</a>
            </div>
            <div>
              <span className="fs-8 text-muted ms-4 mt-1">
                #{item?.node?.number} opened{" "}
                <ReactTimeAgo
                  date={new Date(item?.node?.createdAt)}
                  locale="en-US"
                />{" "}
                by {item?.node?.author?.login}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Issues;
