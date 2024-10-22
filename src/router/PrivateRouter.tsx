import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../app/store";

const PrivateRouter = () => {
  const { username } = useSelector((state: RootState) => state.auth);
  console.log(username);
  return username ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
