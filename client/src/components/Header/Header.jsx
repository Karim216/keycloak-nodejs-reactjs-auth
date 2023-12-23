import React from "react";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/icons/user";
import { useKeycloak } from '@react-keycloak/web';
import keycloak from "../../keycloak.jsx"


const Header = () => {

  return (
    <header className="border-b-2 border-gray-300 p-5">
      <nav className="container m-auto flex items-center justify-between">
        <h1>
          <Link to="/home" className="text-3xl text-blue-900 font-bold">
            Logo
          </Link>
        </h1>
        <ul className="flex items-center justify-between gap-10">
          <li>
            <Link to="/home/articles">Articles</Link>
          </li>
          <li>
            <Link to="/home/users">Users</Link>
          </li>
          <li
            className="text-red-500 cursor-pointer"
            title="Disconnect"
            onClick={() => { keycloak.logout({ redirectUri: 'http://localhost:5173/' }) }}
          >
            Disconnect
          </li>
        </ul>
        <div className="text-blue-700 font-bold flex items-center gap-2" title="firstname"><div><UserIcon color="#1d4ed8" /></div>email</div>
      </nav>
    </header>
  );
};

export default Header;
