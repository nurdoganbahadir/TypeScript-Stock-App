import { useEffect, useState } from "react";
import useStockRequests from "../services/useStockRequests";
import { Box, Button, Container, Typography } from "@mui/material";
import { NoDataMessage } from "../components/Messages";
import { useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { RootState } from "../app/store";
import Loading from "../components/Loading";
import ProductTable from "../components/Products/ProductTable";
import ProductModal from "../components/Products/ProductModal";

interface ProductsData {
  _id: string;
  brandId: { name: string; _id: string };
  categoryId: { name: string; _id: string };
  quantity?: string;
  name: string;
}

const Products = () => {
  const { getStock } = useStockRequests();
  const { loading, products } = useSelector((state: RootState) => state.stock);
  const [open, setOpen] = useState(false);


  const initialState: ProductsData = {
    _id: "",
    brandId: { name: "", _id: "" }, // brandId nesne olarak tanımlandı
    categoryId: { name: "", _id: "" },
    quantity: "",
    name: "",
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
    getStock("categories");
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
        {!loading && !products?.length && <NoDataMessage />}
        {!loading && products?.length > 0 && (
          <ProductTable setData={setData} handleOpen={handleOpen} />
        )}

        <ProductModal
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
