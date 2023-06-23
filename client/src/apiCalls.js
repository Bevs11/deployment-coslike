import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
  const URL = "https://coslike-backend.onrender.com";
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await axios.post(
      `${URL}/api/v1/auth/login`,
      userCredentials
    );
    dispatch({ type: "LOGIN_SUCCESSFUL", payload: response.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILED", payload: error });
  }
};
