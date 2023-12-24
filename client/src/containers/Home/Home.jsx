import React, { Fragment, useEffect, lazy } from "react";
import { Outlet } from "react-router-dom";
import keycloak from "../../keycloak.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/users/actionFetchUser.jsx";

const Header = lazy(() => import("../../components/Header/Header"));

const Home = () => {
  const { currentUser } = useSelector((state) => state);

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getUser())
  }, [])

  const handleDisconnected = () => {
      {keycloak.logout({ redirectUri: "http://localhost:5173" });}
      localStorage.removeItem("accessToken")
      localStorage.removeItem("auth")
  }

  return (
    <Fragment>
      <Header currentUser={currentUser.data} logout = {() => handleDisconnected()} />
      <Outlet />
    </Fragment>
  );
};

export default Home;
