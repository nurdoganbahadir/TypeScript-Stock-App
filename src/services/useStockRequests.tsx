import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { fetchFail, fetchStart, getStockSuccess } from "../features/stockSlice";

// path parametresinin türünü belirli değerlerle kısıtlayabilirsiniz
const useStockRequests = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();

  const getStock = async (path: "firms" | "products" | "brands") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.get(path);
      dispatch(getStockSuccess({ path, data: data.data })); // Dinamik path'i burada kullan
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  return { getStock };
};

export default useStockRequests;
