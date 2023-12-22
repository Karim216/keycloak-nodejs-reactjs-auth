import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading/Loading.jsx";
import "./App.css";
import { httpClient } from './/HttpClient.jsx';
import Keycloak from 'keycloak-js';

const Login = lazy(() => import("./containers/Login/Login.jsx"));
const Home = lazy(() => import("./containers/Home/Home.jsx"));
const Article = lazy(() => import("./containers/Home/Article/Article.jsx"));
const Users = lazy(() => import("./containers/Home/Users/Users.jsx"));



/*
  Init Options
*/
let initOptions = {
  url: 'http://localhost:8080/',
  realm: 'myrealm',
  clientId: 'react-client',
}

let kc = new Keycloak(initOptions);

kc.init({
  onLoad: 'login-required', // Supported values: 'check-sso' , 'login-required'
  checkLoginIframe: true,
  pkceMethod: 'S256'
}).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    /* Remove below logs if you are using this on production */
    console.info("Authenticated");
    console.log('auth', auth)
    console.log('Keycloak', kc)
    console.log('Access Token', kc.token)

    /* http client will use this header in every request it sends */
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${kc.token}`;

    kc.onTokenExpired = () => {
      console.log('token expired')
    }
  }
}, () => {
  /* Notify the user if necessary */
  console.error("Authentication Failed");
});

function App() {
  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (error) {
  //   return <div>Erreur d'authentification : {error.message}</div>;
  // }

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Login login={() => { kc.login() }} />} />
          <Route path="/accueil" element={<Home />}>
            <Route index element={<Article />} />
            <Route path="/accueil/articles" element={<Article />} />
            <Route path="/accueil/users" element={<Users />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
