import React, { useEffect } from "react";

import "./Pagination.scss";

export function Pagination() {
  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-center pt-3">
        <li className="page-item disabled">
          <a className="page-link" href="#" aria-disabled="true">
            Previous
          </a>
        </li>
        <li className="page-item active">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item " aria-current="page">
          <a className="page-link" href="#">
            2
          </a>
        </li>

        <li className="page-item">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
