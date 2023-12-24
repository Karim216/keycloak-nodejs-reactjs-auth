import React, { Fragment, useEffect, lazy, useState } from "react";
import { Outlet } from "react-router-dom";
import keycloak from "../../keycloak.jsx";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/actions/users/actionFetchUser.jsx";
import Loading from "../../components/Loading/Loading.jsx";


const Header = lazy(() => import("../../components/Header/Header"));

const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
};

export default Home;
