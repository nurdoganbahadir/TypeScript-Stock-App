import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import useStockRequests from "../services/useStockRequests";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Loading from "../components/Loading";
import { NoDataMessage } from "../components/Messages";
import FirmCard from "../components/Firms/FirmCard";

interface FirmInfo {
  _id: string | number;
  name: string;
  phone: string;
  address: string;
  image: string;
}

type OpenModal = (firm: FirmInfo | null) => void;

const Firms = () => {
  const { getStock } = useStockRequests();
  const { firms, loading } = useSelector((state: RootState) => state.stock);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<FirmInfo | null>(null);

  const handleOpen: OpenModal = (firm = null) => {
    setData(firm);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setData(null);
  };

  useEffect(() => {
    getStock("firms");
  }, []);

  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            my: "1.5rem",
          }}
        >
          <Typography variant="h4">FIRMS</Typography>
          <Button variant="contained">
            <AddCircleOutlineIcon />
          </Button>
        </Box>
        {loading ? (
          <Loading />
        ) : firms.length > 0 ? (
          <Grid container spacing={1}>
            {firms.map((firm: FirmInfo) => (
              <FirmCard key={firm._id} firm={firm} handleOpen={handleOpen} />
            ))}
          </Grid>
        ) : (
          <NoDataMessage />
        )}
      </Container>
    </>
  );
};

export default Firms;
