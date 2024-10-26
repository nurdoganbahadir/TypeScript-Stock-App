import { useEffect, useState } from "react";
import useStockRequests from "../services/useStockRequests";
import { Box, Button, Container, Typography } from "@mui/material";
import { NoDataMessage } from "../components/Messages";
import { useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { RootState } from "../app/store";
import PurchaseModal from "../components/Purchases/PurchaseModal";
import PurchaseTable from "../components/Purchases/PurchaseTable";
import Loading from "../components/Loading";

interface ProductsData {
  _id: string;
  brandId: { name: string; _id: string }; 
  firmId: { name: string; _id: string }; 
  productId: { name: string; _id: string }; 
  quantity: string | number;
  price: string | number;
  createdAt?: string; 
  amount?: string | number; 
}

const Products = () => {
  const { getStock } = useStockRequests();
  const { loading, purchases } = useSelector((state: RootState) => state.stock);
  const [open, setOpen] = useState(false);
  console.log(purchases);
  const initialState: ProductsData = {
    _id: "",
    brandId: { name: "", _id: "" }, // brandId nesne olarak tanımlandı
    firmId: { name: "", _id: "" }, // firmId nesne olarak tanımlandı
    productId: { name: "", _id: "" }, // productId nesne olarak tanımlandı
    quantity: "",
    price: "",
  };

  const [data, setData] = useState<ProductsData>(initialState);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setData(initialState);
  };

  useEffect(() => {
    getStock("products");
    getStock("brands");
    getStock("firms");
    getStock("purchases");
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
          <Typography variant="h4">PRODUCTS</Typography>
          <Button onClick={handleOpen} variant="contained" sx={{ mb: 2 }}>
            <AddCircleOutlineIcon />
          </Button>
        </Box>
        {loading && <Loading />}
        {!loading && !purchases?.length && <NoDataMessage />}
        {!loading && purchases?.length > 0 && (
          <PurchaseTable setData={setData} handleOpen={handleOpen} />
        )}

        <PurchaseModal
          open={open}
          handleClose={handleClose}
          data={data}
          setData={setData}
        />
      </Container>
    </>
  );
};

export default Products;
