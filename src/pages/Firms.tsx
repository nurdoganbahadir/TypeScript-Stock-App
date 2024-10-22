import { useEffect } from "react";
import useStockRequests from "../services/useStockRequests";

const Firms = () => {
  const { getStock } = useStockRequests();

  useEffect(() => {
    getStock("firms");
  }, []);

  return <div>Firms</div>;
};

export default Firms;
