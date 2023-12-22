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

export const getUser = (email) => {
  const apiUrl = "http://localhost:8082";
  // const apiUrl = process.env.REACT_APP_API_BASE_URL;
  return async (dispatch) => {
    dispatch(fetchCurrentUserLoading());
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      params: {
        email: email
      }
    };
  
    try {
      const response = await axios.get(`${apiUrl}/users/me/infos`, config);
      dispatch(fetchCurrentUserSuccess(response.data));
      // console.log(response)
      return Promise.resolve(response.data);
    } catch (error) {
      // console.log(error.response)
      dispatch(fetchCurrentUserError(error));
      return Promise.reject(error);
    }
  };
};
