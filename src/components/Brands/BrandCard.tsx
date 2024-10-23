import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Grid } from "@mui/material";
import React from "react";
import useStockRequests from "../../services/useStockRequests";

interface BrandInfo {
  name: string;
  image: string;
  _id: string | number;
}

interface BrandCardProps {
  brand: BrandInfo;
  handleOpen: (brand: BrandInfo | null) => void;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand, handleOpen }) => {
  const { deleteStock } = useStockRequests();
  return (
    <Grid item xs={6} md={4} xl={3}>
      <Card
        sx={{
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "#00695c",
        }}
      >
        <CardHeader
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            height: { xs: "100px", sm: "160px" },
          }}
          title={brand.name}
          titleTypographyProps={{
            sx: {
              fontSize: { xs: "1rem", sm: "1.5rem" },
              fontWeight: "bold",
            },
          }}
        />

        <CardMedia
          component="img"
          image={brand.image}
          alt={brand.name}
          sx={{
            height: "150px",
            objectFit: "contain",
          }}
        />
        <CardActions
          disableSpacing
          sx={{
            height: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            backgroundColor: "#00695c",
          }}
        >
          <IconButton
            aria-label="delete"
            onClick={() => deleteStock("brands", brand._id)}
          >
            <DeleteIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => handleOpen(brand)}>
            <EditIcon sx={{ color: "white" }} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BrandCard;
