import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useStockRequests from "../../services/useStockRequests";
import { Grid, Typography } from "@mui/material";
import React from "react";

interface FirmInfo {
  name: string;
  phone: string;
  address: string;
  image: string;
  _id: string | number;
}

interface FirmCardProps {
  firm: FirmInfo;
  handleOpen: (firm: FirmInfo | null) => void;
}

const FirmCard: React.FC<FirmCardProps> = ({ firm, handleOpen }) => {
  return (
    <Grid item xs={6} md={4} xl={3}>
      <Card>
        <CardHeader
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            height: { xs: "100px", sm: "150px" },
          }}
          title={firm.name}
          subheader={firm.address}
          titleTypographyProps={{
            sx: {
              fontSize: { xs: "1rem", sm: "1.5rem" },
              fontWeight: "bold",
            },
          }}
          subheaderTypographyProps={{
            sx: {
              fontSize: { xs: "0.9rem", sm: "1.2rem" },
            },
          }}
        />

        <CardMedia
          component="img"
          image={firm.image}
          alt={firm.name}
          sx={{
            height: "150px",
            objectFit: "contain",
          }}
        />
        <Typography
          sx={{
            textAlign: "center",
            textDecoration: "underline",
          }}
        >
          {firm.phone}
        </Typography>
        <CardActions
          disableSpacing
          sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}
        >
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => handleOpen(firm)}>
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default FirmCard;
