import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./SearchBar.scss";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { startLoading, stopLoading } from "src/redux/loadingBarSlice";

export function SearchBar() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();

  const handleEnterKey = (e: any) => {
    if (e.key === "Enter" && e.target.value !== "") {
      navigate("/search/" + e.target.value);
      // @ts-ignore (use this comment if typescript raises an error)
      inputRef.current.value = "";
      dispatch(startLoading());
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        className="search-bar focus"
        placeholder="Search"
        autoComplete="false"
        onKeyDown={handleEnterKey}
      />
    </>
  );
}
