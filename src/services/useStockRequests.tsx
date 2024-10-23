import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { fetchFail, fetchStart, getStockSuccess } from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";

// path parametresinin türünü belirli değerlerle kısıtlayabilirsiniz

interface PageProps {
  _id?: string | number;
  name?: string;
  phone?: string;
  address?: string;
  image?: string;
  brandId?: string;
  firmId?: string;
  productId?: string;
  quantity?: string;
  price?: string;
}
interface StockProps {
  values: PageProps;
  path: "firms" | "products" | "brands" | "purchases";
}

const useStockRequests = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();

  const getStock = async (path: StockProps["path"]) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.get(path);
      dispatch(getStockSuccess({ path, data: data.data })); // Dinamik path'i burada kullan
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  const postStock = async (path: StockProps["path"], values: PageProps) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post(path, values);
      getStock(path);
      toastSuccessNotify("The splicing was successful.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Insertion failed.");
    }
  };
  const deleteStock = async (path: StockProps["path"], id: string | number) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`${path}/${id}`);
      getStock(path);
      toastSuccessNotify("The deletion was successful.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("The deletion failed.");
    }
  };

  const updateStock = async (
    path: StockProps["path"],
    data: PageProps & { _id: string | number }
  ) => {
    dispatch(fetchStart());
    try {
      await axiosToken.put(`${path}/${data._id}`, data);
      getStock(path);
      toastSuccessNotify("The information has been successfully updated.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("The update of the information failed.");
    }
  };

  return { getStock, postStock, deleteStock, updateStock };
};

export default useStockRequests;
