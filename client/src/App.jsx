import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading/Loading.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";

const Login = lazy(() => import("./containers/Login/Login.jsx"));
const Home = lazy(() => import("./containers/Home/Home.jsx"));
const Article = lazy(() => import("./containers/Home/Article/Article.jsx"));
const Users = lazy(() => import("./containers/Home/Users/Users.jsx"));

function App() {
  const { isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Erreur d'authentification : {error.message}</div>;
  }

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {!isAuthenticated ? (
            <Route>
              <Route path="/" element={<Login />} />
              <Route path="/*" element={<Login />} />
            </Route>
          ) : (
            <Route path="/" element={<Home />}>
              <Route index element={<Article />} />
              <Route path="/articles" element={<Article />} />
              <Route path="/users" element={<Users />} />
            </Route>
          )}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
