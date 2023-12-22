import React from "react";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/icons/user";

const Header = () => {

  return (
    <header className="border-b-2 border-gray-300 p-5">
      <nav className="container m-auto flex items-center justify-between">
        <h1>
          <Link to="/" className="text-3xl text-blue-900 font-bold">
            Logo
          </Link>
        </h1>
        <ul className="flex items-center justify-between gap-10">
          <li>
            <Link to="/accueil/articles">Articles</Link>
          </li>
          <li>
            <Link to="/accueil/users">Users</Link>
          </li>
          <li
            className="text-red-500 cursor-pointer"
            title="Disconnect"
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
