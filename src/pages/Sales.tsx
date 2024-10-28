import { useEffect, useState } from "react";
import useStockRequests from "../services/useStockRequests";
import { Box, Button, Container, Typography } from "@mui/material";
import { NoDataMessage } from "../components/Messages";
import { useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { RootState } from "../app/store";
import Loading from "../components/Loading";
import SaleModal from "../components/Sales/SaleModal";
import SaleTable from "../components/Sales/SaleTable";

// PurchaseData arayüzünü buraya ekleyin
interface SalesData {
  _id: string;
  brandId: { name: string; _id: string }; // { name: string } şeklinde tanımlayın
  productId: { name: string; _id: string }; // { name: string } şeklinde tanımlayın
  quantity: string | number;
  price: string | number;
  createdAt?: string; // Eğer bu özellik kullanılacaksa ekleyin
  amount?: string | number; // Eğer bu özellik kullanılacaksa ekleyin
}

const Sales = () => {
  const { getStock } = useStockRequests();
  const { loading, sales } = useSelector((state: RootState) => state.stock);
  const [open, setOpen] = useState(false);

  const initialState: SalesData = {
    _id: "",
    brandId: { name: "", _id: "" }, // brandId nesne olarak tanımlandı
    productId: { name: "", _id: "" }, // productId nesne olarak tanımlandı
    quantity: "",
    price: "",
    amount: "",
  };

  const [data, setData] = useState<SalesData>(initialState);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setData(initialState);
  };

  useEffect(() => {
    getStock("products");
    getStock("brands");
    getStock("sales");
  }, []);

  return (
    <>
      <Container sx={{ minHeight: "79.4vh" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            my: "1.5rem",
          }}
        >
          <Typography variant="h4">SALES</Typography>
          <Button onClick={handleOpen} variant="contained" sx={{ mb: 2 }}>
            <AddCircleOutlineIcon />
          </Button>
        </Box>
        {loading && <Loading />}
        {!loading && !sales?.length && <NoDataMessage />}
        {!loading && sales?.length > 0 && (
          <SaleTable setData={setData} handleOpen={handleOpen} />
        )}

        <SaleModal
          open={open}
          handleClose={handleClose}
          data={data}
          setData={setData}
        />
      </Container>
    </>
  );
};

export default Sales;
