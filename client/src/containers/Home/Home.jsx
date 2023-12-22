import React, { Fragment, useEffect, lazy } from "react";
import { Outlet } from "react-router-dom";

const Header = lazy(() => import("../../components/Header/Header"));

const Home = () => {

  
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
};

export default Home;
