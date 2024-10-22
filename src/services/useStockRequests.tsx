import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { getStockSuccess } from "../features/stockSlice";

// path parametresinin türünü belirli değerlerle kısıtlayabilirsiniz
const useStockRequests = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();

  const getStock = async (path: "firms" | "products" | "brands") => {
    try {
      const { data } = await axiosToken.get(path);
      dispatch(getStockSuccess({ path, data: data.data })); // Dinamik path'i burada kullan
    } catch (error) {
      console.log(error);
    }
  };

  return { getStock };
};

export default useStockRequests;
