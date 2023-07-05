import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import "./Search.scss";
import { useAppDispatch } from "src/redux/hooks";
import { startLoading } from "src/redux/loadingBarSlice";
import { Navigation } from "src/components";
import SearchList from "./SearchList";
import { ReactComponent as Spinner } from "src/assets/icons/spinner-third.svg";
import { ReactComponent as Bookmark } from "src/assets/icons/book-bookmark.svg";
import { ReactComponent as Table } from "src/assets/icons/table-layout.svg";
import { ReactComponent as Cube } from "src/assets/icons/cube.svg";
import { ReactComponent as User } from "src/assets/icons/user.svg";

function SearchRepo() {
  const dispatch = useAppDispatch();
  const { name } = useParams();
  const location = useLocation();
  const [value, setValue] = useState(name);
  const [query, setQuery] = useState(value);
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    const qr = location.pathname.split("/")[2];
    setValue(qr);
    setQuery(qr);
  }, [location]);

  function handleSubmit(e: any) {
    setValue(e.target.value);
    if (e.key === "Enter" && e.target.value !== "") {
      setQuery(e.target.value);
      dispatch(startLoading());
    }
  }

  function handleSpin(value: boolean) {
    setSpin(value);
  }

  const menus = [
    {
      name: "Repositories",
      Icon: Bookmark,
      url: "/search/" + name,
      default: true,
    },
    {
      name: "Projects",
      Icon: Table,
      path: "/search/" + name + "#",
    },
    {
      name: "Packages",
      Icon: Cube,
      url: "/search/" + name + "#",
    },
    {
      name: "People",
      Icon: User,
      url: "/search/" + name + "#",
    },
  ];

  return (
    <div className="search">
      <div className="mt-4 row">
        <div className="col-3"></div>
        <div className="col-9 ps-1">
          <div className="d-flex align-items-center">
            <input
              type="text"
              className={"form-control fs-7"}
              style={{ width: "300px" }}
              onKeyDown={handleSubmit}
              onChange={handleSubmit}
              value={value}
            />
            {spin && <Spinner className="icon-spinner" height="15" />}
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-3 ps-0 ">
          <Navigation menus={menus} />
        </div>
        <div className="col-9 ps-0 ">
          <SearchList query={query} handleSpin={handleSpin} />
        </div>
      </div>
    </div>
  );
}

export default SearchRepo;
