import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Highlight from "react-highlight";

import { GET_SOURCE_CODE } from "src/graphql/queries";
import "highlight.js/styles/github.css";

function SourceCode({ branch }: { branch: string }) {
  let { owner, name, type, ...rest } = useParams();
  const target = useRef<HTMLDivElement>(null);
  const [lineNumber, setLineNumber] = useState<React.ReactElement>(<></>);
  const [lines, setLines] = useState(0);
  const path = branch + ":" + rest["*"];
  const extension = rest["*"]?.split(".")
    ? rest["*"]?.split(".")[rest["*"]?.split(".").length - 1]
    : "";

  const { loading, error, data } = useQuery(GET_SOURCE_CODE, {
    variables: {
      owner,
      name,
      branch: path,
    },
  });

  useEffect(() => {
    const element = target?.current;
    if (!element) return;
    const observer = new ResizeObserver((entries: any) => {
      let lines = document
        .getElementsByTagName("pre")[0]
        ?.innerHTML.split("\n");
      if (lines.length) {
        setLineNumber(
          <>
            {Array.from({ length: lines.length - 1 }).map((a, i) => (
              <>
                {i + 1} <br />
              </>
            ))}
          </>
        );
        setLines(lines.length - 1);
      }
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [data]);

  if (loading) return <p>...</p>;
  if (error) return <p> Please refresh the page ... {error.message}</p>;

  return (
    <div className="border rounded">
      <div
        className="sticky-readme d-flex border-bottom align-items-center px-3 py-2 bg-primary"
        style={{ zIndex: 2 }}
      >
        <label className="fs-7 bg-white border rounded py-1 px-2">CODE</label>
        <label className="fs-8 opacity-75 ms-3">{lines} lines</label>
        <label className="fs-8 opacity-75 ms-4">
          {(data.repository.object.byteSize / 1000).toFixed(1)} KB
        </label>
      </div>

      <div className="d-flex">
        <div
          className="d-flex flex-column line-number opacity-75"
          style={{
            padding: "0.96rem",
            fontSize: "14px",
          }}
        >
          {extension !== "md" ? lineNumber : ""}
        </div>
        <div
          className="flex-grow-1 source-code"
          ref={target}
          style={{ width: "90%" }}
        >
          <Highlight
            className={
              extension ? extension[Number(extension?.length) - 1] : ""
            }
          >
            {data.repository.object.text}
          </Highlight>
        </div>
      </div>
    </div>
  );
}

export default SourceCode;
