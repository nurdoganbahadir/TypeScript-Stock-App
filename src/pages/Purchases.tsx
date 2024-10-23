import { useEffect, useState } from "react";
import useStockRequests from "../services/useStockRequests";
import { Box, Button, Typography } from "@mui/material";
import { NoDataMessage } from "../components/Messages";
import { useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { RootState } from "../app/store";
import PurchaseModal from "../components/Purchases/PurchaseModal";
import PurchaseTable from "../components/Purchases/PurchaseTable";

// PurchaseData arayüzünü buraya ekleyin
interface PurchaseData {
  _id: string;
  brandId: string; // veya { name: string; } şeklinde olabilir
  firmId: string; // veya { name: string; } şeklinde olabilir
  productId: string; // veya { name: string; } şeklinde olabilir
  quantity: string | number;
  price: string | number;
  createdAt?: string; // Eğer bu özellik kullanılacaksa ekleyin
  amount?: string | number; // Eğer bu özellik kullanılacaksa ekleyin
}

const Purchases = () => {
  const { getStock } = useStockRequests();
  const { loading, purchases } = useSelector((state: RootState) => state.stock);
  console.log(purchases);
  const [open, setOpen] = useState(false);

  const initialState: PurchaseData = {
    _id: "",
    brandId: "",
    firmId: "",
    productId: "",
    quantity: "",
    price: "",
  };

  const [data, setData] = useState<PurchaseData>(initialState);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setData(initialState);
  };

  useEffect(() => {
    getStock("products");
    getStock("purchases");
    getStock("brands");
    getStock("firms");
  }, []);

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", my: "1.5rem" }}
      >
        <Typography variant="h4">PURCHASES</Typography>
        <Button onClick={handleOpen} variant="contained" sx={{ mb: 2 }}>
          <AddCircleOutlineIcon />
        </Button>
      </Box>

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
    </>
  );
};

export default Purchases;
