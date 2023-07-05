import React from "react";
import ReactMarkdown from "react-markdown";

import { ReactComponent as LisUl } from "src/assets/icons/list-ul.svg";

function Readme({ text }: { text: any }) {
  return (
    <div className="readme border rounded mt-4">
      <div className="sticky-readme d-flex border-bottom align-items-center px-3 py-3 bg-primary">
        <LisUl height="15" className="icon me-2" />
        <a href="#" className="hover-undeline fs-7">
          README.md
        </a>
      </div>
      <div className="px-3 py-3 overflow-scroll">
        <ReactMarkdown children={text} />
      </div>
    </div>
  );
}

export default Readme;
