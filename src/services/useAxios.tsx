import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const useAxios = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const axiosToken = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/`,
    headers: { Authorization: `Token ${token}` },
  });
  return { axiosToken };
};

export default useAxios;
