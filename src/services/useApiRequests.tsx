import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

type LoginFn = (user: LoginData) => Promise<void>;
type RegisterFn = (user: RegisterData) => Promise<void>;

const useApiRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);
  console.log(token);

  const login: LoginFn = async (user) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        user
      );
      dispatch(loginSuccess(data));
      navigate("/home");
      toastSuccessNotify("Login işlemi başarılı.");
    } catch (error) {
      console.log(error);
      toastErrorNotify(
        "Login işlemi başarısız oldu. Lütfen bilgilerinizi kontrol edip yeniden deneyiniz."
      );
    }
  };

  const register: RegisterFn = async (user) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/`,
        user
      );
      dispatch(registerSuccess(data));
      navigate("/home");
      toastSuccessNotify("Başarıyla kayıt olundu.");
    } catch (error) {
      console.log(error);
      toastErrorNotify("Lütfen bilgilerinizi kontrol edip yeniden deneyiniz.");
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios(
        `${process.env.REACT_APP_BASE_URL}/auth/logout/`,
        { headers: { Authorization: `Token ${token}` } }
      );
      dispatch(logoutSuccess(data));
      navigate("/");
      toastSuccessNotify("Çıkış yaptınız.");
    } catch (error) {
      console.log(error);
    }
  };

  return { login, register, logout };
};

export default useApiRequests;
