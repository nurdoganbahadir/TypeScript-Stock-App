import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import useStockRequests from "../services/useStockRequests";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Loading from "../components/Loading";
import { NoDataMessage } from "../components/Messages";
import BrandCard from "../components/Brands/BrandCard";
import BrandModal from "../components/Brands/BrandModal";

interface BrandInfo {
  _id: string | number;
  name: string;
  image: string;
}

type OpenModal = (brand: BrandInfo | null) => void;

const Brands = () => {
  const { getStock } = useStockRequests();
  const { brands, loading } = useSelector((state: RootState) => state.stock);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<BrandInfo | null>(null);

  const handleOpen: OpenModal = (brand = null) => {
    setData(brand);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setData(null);
  };

  useEffect(() => {
    getStock("brands");
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
          <Typography variant="h4">BRANDS</Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#00695c" }}
            onClick={() => handleOpen(null)}
          >
            <AddCircleOutlineIcon />
          </Button>
        </Box>
        <BrandModal
          open={open}
          handleClose={handleClose}
          data={data}
          setData={setData}
        />
        {loading ? (
          <Loading />
        ) : brands.length > 0 ? (
          <Grid container spacing={1}>
            {brands.map((brand: BrandInfo) => (
              <BrandCard
                key={brand._id}
                brand={brand}
                handleOpen={handleOpen}
              />
            ))}
          </Grid>
        ) : (
          <NoDataMessage />
        )}
      </Container>
    </>
  );
};

export default Brands;
