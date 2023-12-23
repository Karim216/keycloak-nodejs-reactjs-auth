import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading/Loading.jsx";
import { useKeycloak } from "@react-keycloak/web";
import "./App.css";
// import keycloak from "./keycloak.jsx";

const Login = lazy(() => import("./containers/Login/Login.jsx"));
const Home = lazy(() => import("./containers/Home/Home.jsx"));
const Article = lazy(() => import("./containers/Home/Article/Article.jsx"));
const Users = lazy(() => import("./containers/Home/Users/Users.jsx"));

function App() {
  // if(!keycloak.didInitialize){
  //   return <Loading />
  // }

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />}>
            <Route index element={<Article />} />
            <Route path="/home/articles" element={<Article />} />
            <Route path="/home/users" element={<Users />} />
          </Route>
          {/* )} */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
