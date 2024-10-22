import { useEffect } from "react";
import useStockRequests from "../services/useStockRequests";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Firms = () => {
  const { getStock } = useStockRequests();
  const { firms } = useSelector((state: RootState) => state.stock);
  console.log(firms);

  useEffect(() => {
    getStock("firms");
  }, []);

  return <div>Firms</div>;
};

export default Firms;
