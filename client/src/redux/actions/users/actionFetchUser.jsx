import {
  FETCH_CURRENT_USER_LOADING,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_ERROR,
} from "../../constants";
import axios from "axios";

const fetchCurrentUserLoading = () => {
  return {
    type: FETCH_CURRENT_USER_LOADING,
  };
};

const fetchCurrentUserSuccess = (data) => {
  return {
    type: FETCH_CURRENT_USER_SUCCESS,
    payload: data,
  };
};

const fetchCurrentUserError = (error) => {
  return {
    type: FETCH_CURRENT_USER_ERROR,
    payload: error,
  };
};

export const getUser = () => {
  const apiUrl = "http://localhost:8082";
  return async (dispatch) => {
    dispatch(fetchCurrentUserLoading());
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      }
    };
    try {
      const response = await axios.get(`${apiUrl}/users/me/infos`, config);
      dispatch(fetchCurrentUserSuccess(response.data));
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch(fetchCurrentUserError(error));
      return Promise.reject(error);
    }
  };
};
