import React from "react";
import { Outlet } from "react-router-dom";

import Navigation from "../navigation/navigation.component";
import "./page-layout.styles.scss";

const PageLayout = () => {
  return (
    <div className="page-layout">
      <div className="page-layout-outer-container">
        <div className="page-layout-inner-container">
          <Navigation />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default PageLayout;