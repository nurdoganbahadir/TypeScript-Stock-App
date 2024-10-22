import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}
type LoginFn = (user: LoginData) => Promise<void>;

const useApiRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login: LoginFn = async (user) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        user
      );
      dispatch(loginSuccess(data));
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return { login };
};

export default useApiRequests;
