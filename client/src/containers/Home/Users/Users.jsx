import React, { Fragment, useEffect } from "react";
import { getAllUsers } from "../../../redux/actions/users/actionFetchAllUsers";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";

const Users = () => {
  const { allUsers, currentUser } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <Fragment>
      <div className="container m-auto mt-5 mb-5">
        <h2 className="text-2xl text-center text-blue-900 font-bold">
          Liste des utilisateurs
        </h2>
        {allUsers.isLoading ? (
          <Loading />
        ) : (
          <table className="mt-5 table-fixed w-full">
            <thead>
              <tr>
                <th className="text-left">Lastname</th>
                <th className="text-left">Firstname</th>
                <th className="text-left">Email</th>
                <th className="text-left">Created add</th>
                <th className="text-left"></th>
              </tr>
            </thead>
            <tbody>
              {allUsers.data?.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.lastname}</td>
                    <td>{item.firstname}</td>
                    <td>{item.email}</td>
                    <td>{item.created_at}</td>
                    <td>
                      <Link className="text-blue-600" to="#">
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </Fragment>
  );
};

export default Users;
