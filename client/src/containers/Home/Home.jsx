import React, { Fragment, useEffect, lazy } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/users/actionFetchUser";
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";

const Header = lazy(() => import("../../components/Header/Header"));

const Home = () => {
  const { currentUser } = useSelector((state) => state)
  const dispatch = useDispatch();
  const { user, logout, getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const idTokenClaims = await getIdTokenClaims();
        const idToken = idTokenClaims.__raw;
  
        console.log(accessToken)
        console.log(user.email)
        localStorage.setItem("accessToken", accessToken)
        dispatch(getUser(user.email))
      } catch (error) {
        console.error("Erreur lors de la récupération du token:", error);
      }
    };
    fetchAccessToken();

  }, [])
  
  return (
    <Fragment>
      <Header
        data={currentUser.data}
        disconnect={() => logout()}
      />
      <Outlet />
    </Fragment>
  );
};

export default Home;
