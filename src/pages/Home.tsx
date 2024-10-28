import { useEffect } from "react";
import useStockRequests from "../services/useStockRequests";
import KPICards from "../components/Home/KPICards";
import Charts from "../components/Home/Charts";
import { Container } from "@mui/material";

const Home = () => {
  const { getStock } = useStockRequests();

  useEffect(() => {
    getStock("purchases");
    getStock("sales");
  }, []);

  return (
    <Container sx={{my:"2rem",minHeight:"78.6vh"}}>
      <KPICards />
      <Charts />
    </Container>
  );
};

export default Home;
