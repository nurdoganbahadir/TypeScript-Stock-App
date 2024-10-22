import { useDispatch } from "react-redux";
import useAxios from "./useAxios";

const useStockRequests = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();

  const getStock = async (path: string) => {
    try {
      const { data } = await axiosToken.get(path);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { getStock };
};
export default useStockRequests;
