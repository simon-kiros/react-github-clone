import React, { useEffect, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

import "./Navbar.scss";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { loadingBarSelector } from "src/redux/loadingBarSlice";
import { ReactComponent as GithubLogo } from "src/assets/github.svg";
import { ReactComponent as Diagram } from "src/assets/icons/diagram-nested.svg";
import { ReactComponent as Cube } from "src/assets/icons/cube.svg";
import { ReactComponent as Shield } from "src/assets/icons/shield-check.svg";
import { ReactComponent as Computer } from "src/assets/icons/computer-classic.svg";
import { ReactComponent as Message } from "src/assets/icons/message-code.svg";
import { ReactComponent as Scrubber } from "src/assets/icons/scrubber.svg";
import { ReactComponent as Messages } from "src/assets/icons/messages.svg";
import { NavDropdown, SearchBar } from "src/components";

const productMenu = [
  {
    header: "Actions",
    description: "Automate any workflow",
    icon: <Diagram className="icon-menu" />,
  },
  {
    header: "Packages",
    description: "Host and manage packages",
    icon: <Cube className="icon-menu" />,
  },
  {
    header: "Security",
    description: "Find and fix vulnerabilities",
    icon: <Shield className="icon-menu" />,
  },
  {
    header: "Codespaces",
    description: "Instant dev environments",
    icon: <Computer className="icon-menu" />,
  },
  {
    header: "Code review",
    description: "Manage code changes",
    icon: <Message className="icon-menu" />,
  },
  {
    header: "Issues",
    description: "Plan and track work",
    icon: <Scrubber className="icon-menu" />,
  },
  {
    header: "Discussions",
    description: "Collaborate outside of code",
    icon: <Messages className="icon-menu" />,
  },
];

const solutionsMenu = [
  {
    header: "For",
    description: [
      { name: "Enterprise", link: "/#", external: true },
      { name: "Teams", link: "/#" },
      { name: "Startups", link: "/#" },
      { name: "Education", link: "/#", external: true },
    ],
  },
  {
    header: "By Solution",
    description: [
      { name: "CI/CD & Automation", link: "/#" },
      { name: "DevOps", link: "/#", external: true },
      { name: "DevSecOps", link: "/#", external: true },
    ],
  },
  {
    header: "Case Studies",
    description: [
      { name: "Customer Stories", link: "/#" },
      { name: "Resources ", link: "/#", external: true },
    ],
  },
];

const openSourceMenu = [
  {
    header: "GitHub Sponsors",
    description: "Fund open source developers",
    link: "/#",
  },
  {
    header: "The ReadME Project",
    description: "GitHub community articles",
    link: "/#",
  },
  {
    header: "Repositories",
    description: [
      { name: "Topics", link: "/#" },
      { name: "Trending", link: "/#" },
      { name: "Collections", link: "/#" },
    ],
  },
];

export function Navbar() {
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const loadingBar = useAppSelector(loadingBarSelector);

  useEffect(() => {
    if (!loadingBarRef.current) return;
    if (loadingBar.loading) loadingBarRef.current.continuousStart();
    else loadingBarRef.current.complete();
  }, [loadingBar]);

  return (
    <>
      <LoadingBar color="#0969da" height={3} ref={loadingBarRef} />

      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid px-4">
          <a className="navbar-brand" href="#">
            <GithubLogo className="icon-logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <div className="nav-link">
                  <NavDropdown name="Product" options={productMenu} />
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link">
                  <NavDropdown name="Solutions" options={solutionsMenu} />
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link">
                  <NavDropdown name="Open Source" options={openSourceMenu} />
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link title" href="#">
                  Pricing
                </a>
              </li>
            </ul>

            <SearchBar />
            <a className="nav-link title mx-3" href="#">
              Sign in
            </a>

            <a
              className="nav-link title mx-3 border rounded px-2 py-1"
              href="#"
            >
              Sign up
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
