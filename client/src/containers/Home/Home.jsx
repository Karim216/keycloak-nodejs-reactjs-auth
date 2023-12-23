import React, { Fragment, useEffect, lazy } from "react";
import { Outlet } from "react-router-dom";
import keycloak from "../../keycloak.jsx";


const Header = lazy(() => import("../../components/Header/Header"));

const Home = () => {

  useEffect(() => {
    console.log(keycloak)
  }, [])
  
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
};

export default Home;
