import {
  FETCH_ALL_USERS_LOADING,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_ERROR,
} from "../../constants";
import axios from "axios";
import keycloak from "../../../keycloak";

const fetchAllUsersLoading = () => {
  return {
    type: FETCH_ALL_USERS_LOADING,
  };
};

const fetchAllUsersSuccess = (data) => {
  return {
    type: FETCH_ALL_USERS_SUCCESS,
    payload: data,
  };
};

const fetchAllUsersError = (error) => {
  return {
    type: FETCH_ALL_USERS_ERROR,
    payload: error,
  };
};

export const getAllUsers = () => {
  console.log(keycloak)
  const apiUrl = "http://localhost:8082"
  return async (dispatch) => {
    dispatch(fetchAllUsersLoading());
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };
    try {
      const response = await axios.get(
        `${apiUrl}/users`,
        config
      );
      dispatch(fetchAllUsersSuccess(response.data));
    } catch (error) {
      dispatch(fetchAllUsersError(error));
    }
  };
};
